"use client";

import { useRouter } from "next/navigation";
import { useAdminData } from "@/contexts/AdminDataContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash } from "lucide-react";

export default function AdminBlogs() {
  const router = useRouter();
  const { blogs } = useAdminData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Button onClick={() => router.push("/admin/blogs/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs?.map((blog: any) => (
          <div
            key={blog.id}
            className="rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Cover */}
            {blog.coverImage && (
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">{blog.title}</h2>
                <Badge
                  variant={
                    blog.status === "PUBLISHED" ? "default" : "secondary"
                  }
                >
                  {blog.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {blog.excerpt}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-2 text-xs">
                {blog.category && <Badge variant="outline">{blog.category}</Badge>}
                {blog.featured && <Badge>Featured</Badge>}
                <Badge variant="secondary">Views: {blog.views}</Badge>
              </div>

              {/* SEO */}
              <div className="text-xs text-muted-foreground">
                <p><b>Slug:</b> {blog.slug}</p>
                <p><b>Meta Title:</b> {blog.metaTitle ?? "—"}</p>
                <p><b>Meta Description:</b> {blog.metaDescription ?? "—"}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => router.push(`/admin/blogs/${blog.id}`)}
                >
                  <Pencil className="mr-1 h-4 w-4" />
                  Edit
                </Button>

                <Button size="sm" variant="destructive">
                  <Trash className="mr-1 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
