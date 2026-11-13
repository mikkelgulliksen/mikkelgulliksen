import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { POST } from "./contact.ts";

const originalApiKey = process.env.RESEND_API_KEY;
const originalFrom = process.env.RESEND_FROM_EMAIL;
const originalFetch = globalThis.fetch;
let resendCalls;
let resendPayload;

function restoreEnv(name, value) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

function makeRequest(
  payload,
  { ip = "198.51.100.10", origin = "https://mikkelgulliksen.no" } = {},
) {
  return new Request("https://mikkelgulliksen.no/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: origin,
      "X-Forwarded-For": ip,
    },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  });
}

function validPayload(overrides = {}) {
  return {
    name: "Alex Example",
    email: "alex@example.com",
    message: "I would like to discuss a production.",
    website: "",
    ...overrides,
  };
}

beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.RESEND_FROM_EMAIL = "Portfolio <contact@example.com>";
  resendCalls = 0;
  resendPayload = null;
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options.headers.Authorization, "Bearer re_test_key");
    resendCalls += 1;
    resendPayload = JSON.parse(options.body);
    return new Response(JSON.stringify({ id: "mock-email-id" }), { status: 200 });
  };
});

afterEach(() => {
  restoreEnv("RESEND_API_KEY", originalApiKey);
  restoreEnv("RESEND_FROM_EMAIL", originalFrom);
  globalThis.fetch = originalFetch;
});

test("sends to the fixed recipient and sets the visitor as Reply-To", async () => {
  const response = await POST(makeRequest(validPayload(), { ip: "198.51.100.11" }));

  assert.equal(response.status, 200);
  assert.equal(resendCalls, 1);
  assert.equal(resendPayload.to[0], "mikkel@mikkelgulliksen.no");
  assert.equal(resendPayload.reply_to, "alex@example.com");
  assert.match(resendPayload.text, /I would like to discuss a production\./);
});

test("rejects cross-origin requests without calling the email provider", async () => {
  const response = await POST(
    makeRequest(validPayload(), {
      ip: "198.51.100.12",
      origin: "https://attacker.example",
    }),
  );

  assert.equal(response.status, 403);
  assert.equal(resendCalls, 0);
});

test("rejects a filled honeypot without calling the email provider", async () => {
  const response = await POST(
    makeRequest(validPayload({ website: "spam.example" }), { ip: "198.51.100.13" }),
  );

  assert.equal(response.status, 400);
  assert.equal(resendCalls, 0);
});

test("rejects an invalid email address without calling the email provider", async () => {
  const response = await POST(
    makeRequest(validPayload({ email: "not-an-email" }), { ip: "198.51.100.17" }),
  );

  assert.equal(response.status, 400);
  assert.equal(resendCalls, 0);
});

test("rejects oversized request bodies", async () => {
  const response = await POST(
    makeRequest(JSON.stringify(validPayload({ message: "x".repeat(30000) })), {
      ip: "198.51.100.14",
    }),
  );

  assert.equal(response.status, 413);
  assert.equal(resendCalls, 0);
});

test("does not report success when the email provider fails", async () => {
  globalThis.fetch = async () => {
    resendCalls += 1;
    return new Response("provider error", { status: 500 });
  };

  const response = await POST(makeRequest(validPayload(), { ip: "198.51.100.18" }));

  assert.equal(response.status, 502);
  assert.equal(resendCalls, 1);
});

test("limits repeated requests from the same IP", async () => {
  const requests = Array.from({ length: 6 }, () =>
    POST(makeRequest(validPayload(), { ip: "198.51.100.15" })),
  );
  const responses = await Promise.all(requests);

  assert.deepEqual(
    responses.map((response) => response.status),
    [200, 200, 200, 200, 200, 429],
  );
  assert.equal(resendCalls, 5);
  assert.ok(Number(responses[5].headers.get("retry-after")) > 0);
});

test("reports missing delivery configuration without calling the provider", async () => {
  delete process.env.RESEND_API_KEY;

  const response = await POST(makeRequest(validPayload(), { ip: "198.51.100.16" }));

  assert.equal(response.status, 503);
  assert.equal(resendCalls, 0);
});
