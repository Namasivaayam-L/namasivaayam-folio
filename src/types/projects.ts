export interface Project {
  name: string;
  slug: string;
  description: string;
  tech_stack: string[];
  tags: string[];
  repo_url?: string;
  live_url?: string;
  readme_path?: string;
  created_at: string;
 updated_at: string;
  featured?: boolean;
  stars?: number;
  forks?: number;
  language?: string | null;
  is_active?: boolean;
}
