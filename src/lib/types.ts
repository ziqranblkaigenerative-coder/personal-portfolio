export type ProjectStatus = 'published' | 'draft' | 'archived';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content?: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  tech_stack: string[];
  featured: boolean;
  status: ProjectStatus;
  sort_order?: number;
  created_at: string;
  updated_at?: string;
}

export interface ProfileSettings {
  id?: string;
  full_name: string;
  title: string;
  bio: string;
  short_intro: string;
  avatar_url: string;
  email: string;
  phone?: string;
  location?: string;
  resume_url?: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
    website?: string;
  };
  skills: {
    category: string;
    items: { name: string; icon?: string; level?: number }[];
  }[];
  experience: {
    role: string;
    company: string;
    period: string;
    description: string;
    skills?: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
    description?: string;
  }[];
  stats: {
    years_experience: string;
    projects_completed: string;
    happy_clients: string;
    tech_masteries: string;
  };
  available_for_hire: boolean;
}

export interface UserSession {
  id: string;
  email: string;
  role?: string;
  isAdmin?: boolean;
}

export const PROJECT_CATEGORIES = [
  'Semua',
  'Web App',
  'Fullstack',
  'Mobile App',
  'UI/UX Design',
  'Backend & API',
  'AI / Machine Learning'
] as const;

export type CategoryFilter = typeof PROJECT_CATEGORIES[number];
