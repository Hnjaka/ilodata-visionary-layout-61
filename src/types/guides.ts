
import { LucideIcon } from 'lucide-react';

export interface ArticleType {
  id?: string;
  title: string;
  slug: string;
  content?: string;
  layout?: 'standard' | 'wide' | 'sidebar';
  position?: number;
  category_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryType {
  id?: string;
  title: string;
  icon: LucideIcon | string;
  articles: ArticleType[];
  position?: number;
  created_at?: string;
  updated_at?: string;
}
