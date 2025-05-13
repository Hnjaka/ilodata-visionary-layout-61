
import type { LucideIcon } from "lucide-react";

export interface GuideCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  slug: string;
  created_at: string;
  articles?: GuideArticle[];
}

export interface GuideArticle {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  created_at: string;
  guide_category_id: string;
  published: boolean;
  layout?: string;
}
