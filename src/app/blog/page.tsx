export default function BlogsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      <div className="space-y-8">

        {/* Blog Card */}
        <article className="border-b pb-6">
          <h2 className="text-2xl font-semibold">
            Building a Personal Brand as a Developer
          </h2>
          <p className="mt-2 text-gray-600">
            Thoughts on consistency, learning in public, and creating meaningful
            developer projects.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Jan 2025 · 5 min read
          </p>
        </article>

        <article className="border-b pb-6">
          <h2 className="text-2xl font-semibold">
            Lessons Learned from Building Full-Stack Apps
          </h2>
          <p className="mt-2 text-gray-600">
            Practical takeaways from building real-world applications and
            working through architectural decisions.
          </p>
          <p className="mt-3 text-sm text-gray-500">
            Dec 2024 · 7 min read
          </p>
        </article>

      </div>
    </main>
  );
}
