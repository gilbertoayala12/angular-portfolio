export interface Technology {
  name: string;
  icon: string;
  color?: string;
}

export interface ProjectLinks {
  demo?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  images?: string[];
  technologies: Technology[];
  tags: string[];
  links: ProjectLinks;
  keyFeatures: string[];
  role?: string;
  date: string;
  featured?: boolean;
}