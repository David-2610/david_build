import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Blog",
  description: "Articles, tutorials, and insights",
};

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      createdAt: true,
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-gray-600">
          Articles, tutorials, and insights
        </p>
      </header>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs published yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-6 space-y-3">
                <h2 className="text-2xl font-semibold group-hover:text-[#2B41B0] transition">
                  {blog.title}
                </h2>

                <p className="text-gray-600">
                  {blog.excerpt}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(blog.createdAt).toDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
