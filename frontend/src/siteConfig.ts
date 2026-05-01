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
  category: "MUSIC VIDEO" | "COMMERCIAL" | "FILM" | "LIVE" | "OTHER";
}

export interface SiteConfig {
  name: string;
  title: string;
  projects: Project[];
  /** YouTube ID for the featured reel at the top */
  featuredYoutubeId?: string;
  /** Optional local MP4 used as the visual hero reel */
  featuredMp4Url?: string;
  /** Optional poster image used before the hero reel loads */
  featuredPosterUrl?: string;
  /** Optional dedicated showreel ID used by ReelSection */
  showreelYoutubeId?: string;
  /** Optional profile image used by About section */
  profileImageUrl?: string;
  /** Small heading above about text */
  aboutHeading?: string;
  /** About text paragraphs */
  aboutText: string[];
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
  featuredMp4Url: "/media/showreel.mp4",
  featuredPosterUrl: "/media/posters/hero.jpg",
  showreelYoutubeId: "SM-BT9cijI4",

  // ── About section ───────────────────────────────────
  aboutHeading: "Freelance Producer / Line Producer",
  aboutText: [
    "TVC, MVs, CF, Content",
    "📍 Oslo, Norway",
    "Work experience: 12 years of experience in the production industry, I have been involved in hundreds of projects spanning across TV commercials, music videos, stills, and various content creation. My expertise includes working on both domestic and international productions, offering service production capabilities. I have a diverse background working in various roles and departments, with a particular focus on complex VFX productions in recent years. This broad experience has equipped me with a deep understanding of the intricacies of the production world.",
    "Produced campaigns for various clients: ASUS, RealMe, Dominos Pizza, Pepsi, MENY, UNICEF, POWER, OPEL, OBOS, TINE, HELP, Tom Wood, Bama etc.",
    "And artists including: Alan Walker, Ava Max, Hans Zimmer, Isak Elliot, Marcus & Martinus, Imanbek, Salem Ilese, Madcon, Conor Maynard, VIZE, Georgia Ku, Samantha J.",
    "Hit me up!",
  ],

  // ── Projects / Videos ─────────────────────────
  projects: [
    // ── MUSIC VIDEOS ──
    {
      youtubeId: "SM-BT9cijI4",
      posterUrl: "/media/posters/sweet-dreams.jpg",
      title: "Alan Walker x Imanbek – Sweet Dreams",
      role: "Producer",
      year: "2024",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "6tkaatkbC2Y",
      posterUrl: "/media/posters/fake-a-smile.jpg",
      title: "Alan Walker x Salem Ilese – Fake A Smile",
      role: "Producer",
      year: "2021",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "axRAL0BXNvw",
      posterUrl: "/media/posters/time-remix.jpg",
      title: "Hans Zimmer & Alan Walker – Time (Official Remix)",
      role: "Producer",
      year: "2023",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "HhjHYkPQ8F0",
      posterUrl: "/media/posters/alone-pt-ii.jpg",
      title: "Alan Walker & Ava Max – Alone, Pt. II",
      role: "Producer",
      year: "2019",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "mfSU_XwEnZA",
      posterUrl: "/media/posters/heading-home.jpg",
      title: "Alan Walker & Ruben – Heading Home",
      role: "Producer",
      year: "2020",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "NTVWwlWhBds",
      posterUrl: "/media/posters/dead-girl.jpg",
      title: "Au/Ra x Alan Walker – Dead Girl! (Lyric Video)",
      role: "Producer",
      year: "2023",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "ZtBzWUZbTvA",
      posterUrl: "/media/posters/believers.jpg",
      title: "Alan Walker x Conor Maynard – Believers",
      role: "Producer",
      year: "2022",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "rV_O6Q2KSN0",
      posterUrl: "/media/posters/georgia-ku.jpg",
      title: "Alan Walker & Georgia Ku – Don't You Hold Me Down",
      role: "Producer",
      year: "2023",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "Oj18EikZMuU",
      posterUrl: "/media/posters/end-of-time.jpg",
      title: "K391 – End Of Time",
      role: "Producer",
      year: "2022",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "eXzestWGq2U",
      posterUrl: "/media/posters/space-melody.jpg",
      title: "VIZE x Alan Walker – Space Melody (Edward Artemyev)",
      role: "Producer",
      year: "2021",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "stURztsCOZs",
      posterUrl: "/media/posters/paradise.jpg",
      title: "Boy in Space x Alan Walker x K391 – Paradise",
      role: "Producer",
      year: "2022",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "lwObaOnEu4A",
      title: "Alan Walker – Unity",
      role: "Producer",
      year: "2018",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "yIOn18Gi8No",
      title: "Alan Walker – Diamond Heart",
      role: "Producer",
      year: "2018",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "Du3UUYh2Svk",
      title: "Alan Walker – The Spectre",
      role: "Producer",
      year: "2017",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "_j5KR28qtsI",
      title: "Alan Walker – Sing Me To Sleep",
      role: "Producer",
      year: "2016",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "oogdONy5mYU",
      title: "Alan Walker – All Falls Down",
      role: "Producer",
      year: "2017",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "DWMUc5fvPeM",
      title: "Alan Walker – Darkside",
      role: "Producer",
      year: "2018",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "Dmp6VfzODXY",
      title: "Alan Walker – On My Way",
      role: "Producer",
      year: "2019",
      category: "MUSIC VIDEO",
    },
    {
      youtubeId: "NHni0iFA4TE",
      title: "Alan Walker – Faded (Restrung)",
      role: "Producer",
      year: "2016",
      category: "MUSIC VIDEO",
    },

    // ── COMMERCIALS ──
    {
      youtubeId: "DbPtlJ_0tiQ",
      title: "Commercial — DbPtlJ_0tiQ",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      youtubeId: "aada4pWmLF8",
      title: "Commercial — aada4pWmLF8",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      youtubeId: "TThhhjBAGOc",
      title: "Commercial — TThhhjBAGOc",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      mp4Url: "https://workinprogress.no/dynamic/upload/bilder/DLNB-Film_1.mp4",
      title: "AVINOR – Don't Leave Norway Behind",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      vimeoId: "916660362",
      title: "DNB – Oppstart (Kavar Singh)",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      vimeoId: "933729875",
      title: "Å Energi – En lysere fremtid",
      role: "Producer",
      year: "2024",
      category: "COMMERCIAL",
    },
    {
      youtubeId: "s_9U6hkZhGk",
      posterUrl: "/media/posters/asus-rog.jpg",
      title: "ASUS ROG Zephyrus",
      role: "Producer",
      year: "2023",
      category: "COMMERCIAL",
    },

    // ── FILM ──
    {
      youtubeId: "Hi-kQn3ze4o",
      posterUrl: "/media/posters/aviation.jpg",
      title: "Aviation Movie (Full Movie Stream)",
      role: "Producer",
      year: "2024",
      category: "FILM",
    },

    // ── LIVE ──
    {
      youtubeId: "tzrHVd6q4dQ",
      posterUrl: "/media/posters/live-believers.jpg",
      title: "Alan Walker – Believers (Live Stream)",
      role: "Producer",
      year: "2022",
      category: "LIVE",
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
