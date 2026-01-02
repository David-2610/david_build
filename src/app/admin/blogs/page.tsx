"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "@/app/admin/AdminShell";
type Blog = {
  id: number;
  title: string;
  status: string;
  createdAt: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/blogs", {
      credentials: "include", // ✅ COOKIE AUTH
    })
      .then(async (res) => {
        if (res.status === 401) {
          router.push("/admin/login");
          return [];
        }

        const data = await res.json();
        return Array.isArray(data) ? data : [];
      })
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, [router]);

  return (
    <AdminShell>
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="bg-[#2B41B0] text-white px-4 py-2 rounded"
        >
          + New Blog
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading blogs…</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/admin/blogs/${blog.id}`}
              className="border rounded p-4 hover:bg-gray-50 transition"
            >
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {blog.status} •{" "}
                {new Date(blog.createdAt).toDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
    </AdminShell>
  );
}
