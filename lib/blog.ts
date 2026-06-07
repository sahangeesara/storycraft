import { BlogArticle } from '@/types/blog';
import {supabase} from "@/lib/supabase";

export async function getAllArticles(): Promise<BlogArticle[]> {
  const { data, error } = await supabase
      .from('blogArticle')
      .select('*');

  if (error) throw error;

  return data ?? [];
}
