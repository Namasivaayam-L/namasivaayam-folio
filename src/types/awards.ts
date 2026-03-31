export interface Award {
  title: string;
  date: string;
 description: string;
 linkedinUrl?: string;
  embedUrl?: string;
}

export interface Publication {
  title: string;
  date: string;
 description: string;
  link: string;
  conference?: string;
  embedUrl?: string;
}

export interface Education {
 degree: string;
  institution: string;
  graduation: string;
  cgpa: string;
  period: string;
  activities: string;
}
