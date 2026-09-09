export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: string;
  status: string;
  category: string;
  tags: string;
  meta_description: string;
  read_time: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
}

export interface NewsListArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: number;
  featured_image?: string;
  author: string;
}

export interface NewsIndexData {
  articles: NewsListArticle[];
  featured: NewsListArticle[];
  total: number;
}
