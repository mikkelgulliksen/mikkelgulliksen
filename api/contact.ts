declare const process: {
  env: Record<string, string | undefined>;
};

const RESEND_API_URL = "https://api.resend.com/emails";
const CONTACT_RECIPIENT = "mikkel@mikkelgulliksen.no";
const MAX_BODY_BYTES = 24 * 1024;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 4096;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
}

class PayloadTooLargeError extends Error {}

// Best-effort per function instance; a durable shared limit would need external storage.
const rateLimitEntries = new Map<string, RateLimitEntry>();

function jsonResponse(status: number, body: Record<string, unknown>, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return (
      (originUrl.protocol === "https:" || originUrl.protocol === "http:") &&
      originUrl.origin === requestUrl.origin
    );
  } catch {
    return false;
  }
}

function checkRateLimit(request: Request, now = Date.now()) {
  for (const [ip, entry] of rateLimitEntries) {
    if (entry.resetAt <= now) rateLimitEntries.delete(ip);
  }

  const ip = request.headers.get("x-forwarded-for")?.trim() || "unknown";
  const entry = rateLimitEntries.get(ip);

  if (entry && entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  if (!entry && rateLimitEntries.size >= MAX_RATE_LIMIT_ENTRIES) {
    const oldestIp = rateLimitEntries.keys().next().value;
    if (oldestIp !== undefined) rateLimitEntries.delete(oldestIp);
  }

  rateLimitEntries.set(ip, {
    count: (entry?.count ?? 0) + 1,
    resetAt: entry?.resetAt ?? now + RATE_LIMIT_WINDOW_MS,
  });

  return { allowed: true, retryAfterSeconds: 0 };
}

async function readBoundedBody(request: Request) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

function isRecord(value: unknown): value is ContactPayload {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidEmail(email: string) {
  return (
    email.length <= MAX_EMAIL_LENGTH &&
    !/[\r\n]/.test(email) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return jsonResponse(403, { message: "This request could not be accepted." });
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return jsonResponse(415, { message: "Please submit the form using the website." });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse(413, { message: "Your message is too long. Please shorten it and try again." });
  }

  const limit = checkRateLimit(request);
  if (!limit.allowed) {
    return jsonResponse(
      429,
      { message: "Too many messages were sent. Please wait a little and try again." },
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(await readBoundedBody(request));
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return jsonResponse(413, { message: "Your message is too long. Please shorten it and try again." });
    }
    return jsonResponse(400, { message: "The form data was invalid. Please check it and try again." });
  }

  if (!isRecord(payload)) {
    return jsonResponse(400, { message: "The form data was invalid. Please check it and try again." });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return jsonResponse(400, { message: "The form data was invalid. Please check it and try again." });
  }

  if (
    (payload.name !== undefined && typeof payload.name !== "string") ||
    (payload.website !== undefined && typeof payload.website !== "string") ||
    typeof payload.email !== "string" ||
    typeof payload.message !== "string"
  ) {
    return jsonResponse(400, { message: "Please enter your email address and a message." });
  }

  const name = (typeof payload.name === "string" ? payload.name : "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (
    name.length > MAX_NAME_LENGTH ||
    !isValidEmail(email) ||
    message.length === 0 ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return jsonResponse(400, {
      message: "Please check that your name, email, and message are within the allowed length.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Contact form email delivery is not configured.");
    return jsonResponse(503, {
      message: `The contact form is temporarily unavailable. Please email ${CONTACT_RECIPIENT} directly.`,
    });
  }

  let resendResponse: Response;
  try {
    resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_RECIPIENT],
        reply_to: email,
        subject: "New portfolio enquiry",
        text: `${name ? `Name: ${name}\n` : ""}Email: ${email}\n\n${message}`,
      }),
    });
  } catch {
    console.error("Contact form email delivery request failed.");
    return jsonResponse(502, {
      message: `We could not send your message. Please try again or email ${CONTACT_RECIPIENT} directly.`,
    });
  }

  if (!resendResponse.ok) {
    console.error("Contact form email provider returned an error.", resendResponse.status);
    return jsonResponse(502, {
      message: `We could not send your message. Please try again or email ${CONTACT_RECIPIENT} directly.`,
    });
  }

  return jsonResponse(200, { message: "Thanks — your message has been sent." });
}
