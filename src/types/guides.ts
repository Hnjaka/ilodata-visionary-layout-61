
import { LucideIcon } from 'lucide-react';

export interface ArticleType {
  title: string;
  slug: string;
  content?: string;
  layout?: 'standard' | 'wide' | 'sidebar';
}

export interface CategoryType {
  title: string;
  icon: LucideIcon;
  articles: ArticleType[];
}
