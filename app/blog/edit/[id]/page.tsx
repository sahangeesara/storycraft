"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();

    const id = params.id as string;

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        category: "",
    });

    useEffect(() => {
        fetchArticle();
    }, []);

    const fetchArticle = async () => {
        const { data, error } = await supabase
            .from("blogArticle")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
            });

            return;
        }

        setForm({
            title: data.title || "",
            slug: data.slug || "",
            excerpt: data.excerpt || "",
            content: data.content || "",
            author: data.author || "",
            category: data.category || "",
        });

        setLoading(false);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        const { error } = await supabase
            .from("blogArticle")
            .update({
                title: form.title,
                slug: form.slug,
                excerpt: form.excerpt,
                content: form.content,
                author: form.author,
                category: form.category,
            })
            .eq("id", id);

        if (error) {
            await Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
            });

            return;
        }

        await Swal.fire({
            title: "Success",
            text: "Blog updated successfully",
            icon: "success",
        });

        router.push("/blog");
        router.refresh();
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">
                Edit Blog
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border rounded p-3"
                    required
                />

                <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="Slug"
                    className="w-full border rounded p-3"
                    required
                />

                <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author"
                    className="w-full border rounded p-3"
                />

                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="w-full border rounded p-3"
                />

                <textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    placeholder="Excerpt"
                    rows={4}
                    className="w-full border rounded p-3"
                />

                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Content"
                    rows={10}
                    className="w-full border rounded p-3"
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        Update Blog
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/blog")}
                        className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
