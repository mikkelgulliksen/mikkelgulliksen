import { useState } from "react";

interface Props {
  youtubeId: string;
  title: string;
}

export default function YouTubeEmbed({ youtubeId, title }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  if (!isLoaded) {
    return (
      <div
        className="video-container cursor-pointer group"
        onClick={() => setIsLoaded(true)}
        role="button"
        aria-label={`Play: ${title}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsLoaded(true)}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
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
