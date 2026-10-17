export interface Award {
  title: string;
  date: string;
  description: string;
  linkedinUrl?: string;
  embedUrl?: string;
}

export interface Publication {
  title: string;
  /** Author list in order. */
  authors: string[];
  /** Short note on the author's role, e.g. "Second author · with ...". */
  authorNote?: string;
  /** Full conference name. */
  conference: string;
  /** Venue line: location · dates · publisher · pages. */
  venue?: string;
  year: string;
  doi?: string;
  publisher?: string;
  /** Verbatim abstract from the publisher record. */
  abstract?: string;
  /** One-line plain-language summary for quick scanning. */
  summary?: string;
  /** IEEE Xplore (or other) landing page. */
  link: string;
  doiUrl?: string;
  /** BibTeX citation block. */
  bibtex?: string;
  /** Slug of the related implementation in projects.json. */
  relatedSlug?: string;
}

export interface Education {
  degree: string;
  institution: string;
  graduation: string;
  cgpa: string;
  period: string;
  activities: string;
}
