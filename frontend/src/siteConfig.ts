// ============================================================
// 🎬 SITE CONFIG — Edit all content here!
// ============================================================
// Supports YouTube, Vimeo, and direct MP4 video URLs.
// Just fill in the relevant field: youtubeId, vimeoId, or mp4Url.
// ============================================================

export interface Project {
  /** YouTube video ID (optional) */
  youtubeId?: string;
  /** Vimeo video ID (optional) */
  vimeoId?: string;
  /** Direct MP4 URL (optional) */
  mp4Url?: string;
  /** Poster/thumbnail image for MP4 videos */
  posterUrl?: string;
  /** Project title */
  title: string;
  /** Your role */
  role: string;
  /** Year */
  year: string;
  /** Category label shown below thumbnail */
  category: "MUSIC VIDEO" | "COMMERCIAL" | "FILM" | "LIVE" | "OTHER" | "CONCERT MOVIE" | "PERFORMANCE VIDEO";
}

export interface SiteConfig {
  name: string;
  title: string;
  projects: Project[];
  /** YouTube ID for the featured reel at the top */
  featuredYoutubeId?: string;
  contact: {
    email: string;
    phone?: string;
  };
  socials: {
    instagram?: string;
    linkedin?: string;
    imdb?: string;
    vimeo?: string;
  };
}

/** Helper to get a unique key for a project */
export function projectKey(p: Project): string {
  return p.youtubeId || p.vimeoId || p.mp4Url || p.title;
}

const siteConfig: SiteConfig = {
  name: "Mikkel Gulliksen",
  title: "Film Producer",

  // ── Featured reel (YouTube ID for the hero section) ──
  featuredYoutubeId: "SM-BT9cijI4",

  // ── Projects / Videos ─────────────────────────
  projects: [
    // ── MUSIC VIDEOS ──
    {
      youtubeId: "SM-BT9cijI4",
      title: "Alan Walker x Imanbek – Sweet Dreams",
      role: "Producer",
      year: "2024",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "6tkaatkbC2Y",
      title: "Alan Walker x Salem Ilese – Fake A Smile",
      role: "Producer",
      year: "2021",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "axRAL0BXNvw",
      title: "Hans Zimmer & Alan Walker – Time (Official Remix)",
      role: "Producer",
      year: "2023",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "HhjHYkPQ8F0",
      title: "Alan Walker & Ava Max – Alone, Pt. II",
      role: "Producer",
      year: "2019",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "mfSU_XwEnZA",
      title: "Alan Walker & Ruben – Heading Home",
      role: "Producer",
      year: "2020",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "NTVWwlWhBds",
      title: "Au/Ra x Alan Walker – Dead Girl! (Lyric Video)",
      role: "Producer",
      year: "2023",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "ZtBzWUZbTvA",
      title: "Alan Walker x Conor Maynard – Believers",
      role: "Producer",
      year: "2022",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "rV_O6Q2KSN0",
      title: "Alan Walker & Georgia Ku – Don't You Hold Me Down",
      role: "Producer",
      year: "2023",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "Oj18EikZMuU",
      title: "K391 – End Of Time",
      role: "Producer",
      year: "2022",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "eXzestWGq2U",
      title: "VIZE x Alan Walker – Space Melody (Edward Artemyev)",
      role: "Producer",
      year: "2021",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "stURztsCOZs",
      title: "Boy in Space x Alan Walker x K391 – Paradise",
      role: "Producer",
      year: "2022",
      category: "MUSIC VIDEO",
    },

    // Marcus & Martinus (edited titles)
    {
      youtubeId: "lwObaOnEu4A",
      title: "Marcus & Martinus - Light It Up ft. Samantha J.",
      role: "Producer",
      year: "2020",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "yIOn18Gi8No",
      title: "Marcus & Martinus - Bae",
      role: "Producer",
      year: "2019",
      category: "MUSIC VIDEO",
    },

    // Isac Elliot / Fanny Andersen
    {
      youtubeId: "oogdONy5mYU",
      title: "Isac Elliot - Eyes Shut",
      role: "Producer",
      year: "2016",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "DWMUc5fvPeM",
      title: "Isac Elliot - Mouth to Mouth",
      role: "Producer",
      year: "2016",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "Dmp6VfzODXY",
      title: "Fanny Andersen - Kids",
      role: "Producer",
      year: "2018",
      category: "MUSIC VIDEO",
    },

    // ── COMMERCIALS ──
    {
      youtubeId: "DbPtlJ_0tiQ",
      title: "Power - It's Electrifying",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      youtubeId: "aada4pWmLF8",
      title: "Opel - Vi heier på dere!",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      mp4Url: "https://workinprogress.no/dynamic/upload/bilder/DLNB-Film_1.mp4",
      title: "AVINOR - Don't Leave Norway Behind",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      vimeoId: "916660362",
      title: "DNB - Oppstart (Kavar Singh)",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      vimeoId: "933729875",
      title: "Å Energi - En lysere fremtid",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      youtubeId: "s_9U6hkZhGk",
      title: "ASUS ROG Zephyrus",
      role: "Producer",
      year: "2023",
      category: "COMMERCIAL",
    },

    // ── CONCERT MOVIE ──
    {
      youtubeId: "NHni0iFA4TE",
      title: "Aviation Movie",
      role: "Producer",
      year: "2024",
      category: "CONCERT MOVIE",
    },

    // ── LIVE / PERFORMANCE ──
    {
      youtubeId: "tzrHVd6q4dQ",
      title: "Alan Walker - Believers (Live Stream)",
      role: "Producer",
      year: "2022",
      category: "LIVE",
    },
    {
      youtubeId: "cYxAr_NZF9E",
      title: "Alan Walker & Ruben – Heading Home (Live at Château de Fontainebleau)",
      role: "Producer",
      year: "2020",
      category: "PERFORMANCE VIDEO",
    },

    // ── MOVED TO BOTTOM (as requested) ──
    {
      youtubeId: "Du3UUYh2Svk",
      title: "Marcus & Martinus - Dance With You",
      role: "Producer",
      year: "2017",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "_j5KR28qtsI",
      title: "Marcus & Martinus - Girls ft. Madcon",
      role: "Producer",
      year: "2015",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "TThhhjBAGOc",
      title: "Helsedirektoratet - LEV",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
  ],

  // ── Contact ────────────────────────────────────
  contact: {
    email: "mikkel@example.com",        // ← Your email
    // phone: "+47 123 45 678",
  },

  // ── Socials (add URLs) ─────────────────────────
  socials: {
    // instagram: "https://instagram.com/mikkelgulliksen",
    // linkedin: "https://linkedin.com/in/mikkelgulliksen",
    // imdb: "https://imdb.com/name/nm1234567",
    // vimeo: "https://vimeo.com/mikkelgulliksen",
  },
};

export default siteConfig;
