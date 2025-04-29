
import { LucideIcon } from 'lucide-react';

export interface ArticleType {
  title: string;
  slug: string;
}

export interface CategoryType {
  title: string;
  icon: LucideIcon;
  articles: ArticleType[];
}
