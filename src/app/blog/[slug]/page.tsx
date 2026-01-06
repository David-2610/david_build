"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Star } from "lucide-react";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  images?: string[] | null;
  category?: string | null;
  tags?: string[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt?: string | null;
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      notFound();
      return;
    }

    fetch(`/api/blog/${slug}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setBlog)
      .catch(() => notFound())
      .finally(() => setLoading(false));
  }, [slug]);

  /* --------------------------------------------------
     STATES
  -------------------------------------------------- */
  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500">
        Loading blog…
      </div>
    );
  }

  if (!blog) return null;

  /* --------------------------------------------------
     RENDER
  -------------------------------------------------- */
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 space-y-14">
      {/* ================= HERO ================= */}
      <section className="space-y-6 animate-fade-up">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {blog.category && (
            <span className="badge-primary">{blog.category}</span>
          )}

          {blog.featured && (
            <span className="badge-featured flex items-center gap-1">
              <Star className="h-3 w-3" />
              Featured
            </span>
          )}

          <span className="flex items-center gap-1 text-gray-500">
            <Calendar className="h-4 w-4" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>

          <span className="text-gray-400">
            • {blog.views} views
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold leading-tight">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-lg text-gray-600">
            {blog.excerpt}
          </p>
        )}
      </section>

      {/* ================= COVER ================= */}
      {blog.coverImage && (
        <section className="animate-fade-up">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-gray-100">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* ================= TAGS ================= */}
      {blog.tags?.length ? (
        <section className="flex flex-wrap gap-2 animate-fade-up">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </section>
      ) : null}

      {/* ================= CONTENT ================= */}
      <section className="animate-fade-up">
        <article
          className="prose prose-lg max-w-none prose-headings:scroll-mt-24"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>

      {/* ================= GALLERY ================= */}
      {blog.images?.length ? (
        <section className="animate-fade-up">
          <h2 className="section-title">Gallery</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {blog.images.map((img, i) => (
              <img
                key={`${img}-${i}`}
                src={img}
                className="rounded-lg border object-cover"
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
