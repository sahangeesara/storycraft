import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase.from("blog_articles").insert([
    {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      date: body.date,
      author: body.author,
      category: body.category || null,
    },
  ]);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Blog created successfully",
    data,
  });
}