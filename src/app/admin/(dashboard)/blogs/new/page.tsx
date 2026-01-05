"use client";

import { useRouter } from "next/navigation";
import BlogForm from "@/components/Admin/BlogForm";
import { adminFetch } from "@/lib/adminFetch";

export default function NewBlogPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <BlogForm
        submitLabel="Create Blog"
        onSubmit={async (data) => {
          await adminFetch("/api/admin/blogs", {
            method: "POST",
            body: JSON.stringify({
              ...data,
              tags: data.tags
                ? data.tags.split(",").map((t) => t.trim())
                : [],
            }),
          });

          // ✅ simple + reliable
          router.push("/admin/blogs");
        }}
      />
    </div>
  );
}
