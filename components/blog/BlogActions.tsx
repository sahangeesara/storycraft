"use client";

import Link from "next/link";
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function BlogActions({
  id,
}: {
  id: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const { error } = await supabase
      .from("blogArticle")
      .delete()
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
      title: "Deleted!",
      text: "Blog deleted successfully.",
      icon: "success",
    });

    router.refresh();
  };

  return (
    <div className="flex gap-2 mt-4">
      <Link
        href={`/blog/edit/${id}`}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Edit
      </Link>

      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}