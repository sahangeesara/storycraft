'use client';

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {router} from "next/client";

export default function CreateBlogPage() {
    const [form, setForm] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        date: "",
        author: "",
        category: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/blog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            await Swal.fire({
                title: "Success!",
                text: "Blog created successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
            setForm({
                title: "",
                slug: "",
                content: "",
                excerpt: "",
                date: "",
                author: "",
                category: "",
            });
            await router.push("/blog");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Link
                href="/blog"
                className="mb-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                back to post
            </Link>
            <h1 className="text-2xl font-bold mb-6">Create Blog Article</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="excerpt"
                    placeholder="Excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full border p-2 rounded h-40"
                />

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="author"
                    placeholder="author"
                    value={form.author}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category (optional)"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
}
