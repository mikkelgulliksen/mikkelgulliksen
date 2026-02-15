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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-all duration-500" />
      {/* Play button — minimal white outline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 md:w-16 md:h-16 border border-white/50 rounded-full flex items-center justify-center group-hover:border-white group-hover:scale-105 transition-all duration-300 backdrop-blur-[2px]">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
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
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

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
          className="video-container cursor-pointer group bg-neutral-900"
          onClick={activate}
          role="button"
          aria-label={`Play: ${title}`}
          tabIndex={0}
          onKeyDown={keyHandler}
        >
          {/* Vimeo doesn't expose thumbnails easily; show a dark placeholder */}
          <div className="absolute inset-0 bg-neutral-800" />
          <PlayOverlay />
          {/* Title hint */}
          <div className="absolute bottom-4 left-4 text-white/60 text-xs tracking-wide uppercase pointer-events-none">
            {title}
          </div>
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
          className="video-container cursor-pointer group bg-neutral-900"
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
            <div className="absolute inset-0 bg-neutral-800" />
          )}
          <PlayOverlay />
          {!posterUrl && (
            <div className="absolute bottom-4 left-4 text-white/60 text-xs tracking-wide uppercase pointer-events-none">
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
