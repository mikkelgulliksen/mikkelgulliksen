import { useState, useRef } from "react";

interface Props {
  youtubeId?: string;
  vimeoId?: string;
  mp4Url?: string;
  posterUrl?: string;
  title: string;
}

/** Play-button overlay shared between all video types */
function PlayOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-black/25 transition-all duration-500 group-hover:bg-black/10" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-white/15 text-white shadow-[0_10px_40px_rgba(0,0,0,0.32)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white group-hover:bg-white/25 md:h-[72px] md:w-[72px]">
          <svg
            className="ml-0.5 h-5 w-5 md:h-6 md:w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default function VideoEmbed({
  youtubeId,
  vimeoId,
  mp4Url,
  posterUrl,
  title,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activate = () => setIsLoaded(true);
  const keyHandler = (e: React.KeyboardEvent) =>
    e.key === "Enter" && activate();

  // ── YouTube ──
  if (youtubeId) {
    const thumbnailUrl = posterUrl || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    if (!isLoaded) {
      return (
        <div
          className="video-container cursor-pointer group"
          onClick={activate}
          role="button"
          aria-label={`Play: ${title}`}
          tabIndex={0}
          onKeyDown={keyHandler}
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(event) => {
              if (!posterUrl) {
                event.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
              }
            }}
          />
          <PlayOverlay />
        </div>
      );
    }

    return (
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // ── Vimeo ──
  if (vimeoId) {
    if (!isLoaded) {
      return (
        <div
          className="video-container cursor-pointer group bg-[var(--color-surface-card)]"
          onClick={activate}
          role="button"
          aria-label={`Play: ${title}`}
          tabIndex={0}
          onKeyDown={keyHandler}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-surface-card)]" />
          )}
          <PlayOverlay />
          {!posterUrl && (
            <div className="pointer-events-none absolute bottom-4 left-4 max-w-[80%] text-xs uppercase tracking-wide text-white/60">
              {title}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="video-container">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // ── MP4 ──
  if (mp4Url) {
    if (!isLoaded) {
      return (
        <div
          className="video-container cursor-pointer group bg-[var(--color-surface-card)]"
          onClick={() => {
            setIsLoaded(true);
            // Auto-play after next render
            setTimeout(() => videoRef.current?.play(), 50);
          }}
          role="button"
          aria-label={`Play: ${title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIsLoaded(true);
              setTimeout(() => videoRef.current?.play(), 50);
            }
          }}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-surface-card)]" />
          )}
          <PlayOverlay />
          {!posterUrl && (
            <div className="pointer-events-none absolute bottom-4 left-4 max-w-[80%] text-xs uppercase tracking-wide text-white/60">
              {title}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="video-container">
        <video
          ref={videoRef}
          src={mp4Url}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={posterUrl}
        />
      </div>
    );
  }

  // Fallback — nothing to render
  return null;
}
