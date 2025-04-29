
import { LucideIcon } from 'lucide-react';

export interface ArticleType {
  id?: string;
  title: string;
  slug: string;
  content?: string;
  layout?: 'standard' | 'wide' | 'sidebar';
  position?: number;
  category_id?: string;
}

export interface CategoryType {
  id?: string;
  title: string;
  icon: LucideIcon | string;
  articles: ArticleType[];
  position?: number;
}
