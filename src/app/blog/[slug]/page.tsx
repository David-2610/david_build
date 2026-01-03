import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

/* ================= SEO METADATA ================= */
export async function generateMetadata({ params }: Props) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  if (!blog || blog.status !== "PUBLISHED") {
    return {};
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      images: blog.ogImage ? [blog.ogImage] : [],
    },
  };
}

/* ================= PAGE ================= */
export default async function BlogDetailPage({ params }: Props) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  if (!blog || blog.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">{blog.title}</h1>

        <p className="text-gray-500">
          {new Date(blog.createdAt).toDateString()}
        </p>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full rounded-xl"
          />
        )}
      </header>

      {/* TipTap HTML */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
