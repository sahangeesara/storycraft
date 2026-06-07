export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  author: string;
  category?: string;
  created_at: string;
}
