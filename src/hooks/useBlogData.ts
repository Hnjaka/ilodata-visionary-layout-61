
// Type definitions for blog data structures
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  image?: string;
  category_id: string;
  category_title?: string;
  published: boolean;
  published_at?: string;
  position?: number;
}

export interface BlogCategory {
  id: string;
  title: string;
  icon?: string;
  position?: number;
  articles: BlogArticle[];
}
