"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogForm from "@/components/Admin/BlogForm";
import { adminFetch } from "@/lib/adminFetch";

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/blogs/id/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        router.push("/admin/blogs");
        return;
      }

      const data = await res.json();

      setBlog({
        ...data,
        tags: data.tags?.join(", ") ?? "",
      });
    }

    load();
  }, [id, router]);

  if (!blog) {
    return <p className="p-10">Loading…</p>;
  }

  /* ================= DELETE ================= */
  async function handleDelete() {
    if (!confirm("Delete this blog permanently? This cannot be undone.")) {
      return;
    }

    try {
      setDeleting(true);

      await adminFetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      router.push("/admin/blogs");
    } catch (err) {
      console.error("DELETE BLOG ERROR:", err);
      alert("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2B41B0]">
            Edit Blog
          </h1>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-60"
          >
            {deleting ? "Deleting…" : "Delete Blog"}
          </button>
        </div>

        {/* Form */}
        <BlogForm
          initialData={blog}
          submitLabel="Save Changes"
          onSubmit={async (data) => {
            await adminFetch(`/api/admin/blogs/${id}`, {
              method: "PUT",
              body: JSON.stringify({
                ...data,
                tags: data.tags
                  ? data.tags.split(",").map((t) => t.trim())
                  : [],
              }),
            });

            router.push("/admin/blogs");
          }}
        />
      </div>
    </div>
  );
}
