export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  readTime: string;
  fileName: string;
  coverImage?: string;
  author?: string;
}

export interface BlogPostContent extends BlogPost {
  content: string;
}