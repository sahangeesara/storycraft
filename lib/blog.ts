import { supabase } from './supabase';

export async function getAllArticles() {
  const { data, error } = await supabase
      .from('blogArticle')
      .select('*')
      .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}
