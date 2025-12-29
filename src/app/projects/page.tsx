export default function ProjectsPage() {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-12">Projects</h1>
  
        <div className="flex flex-col gap-8">
          
          {/* Project */}
          <div className="border rounded-xl p-6 hover:shadow-md transition">
            <h2 className="text-2xl font-semibold">
              Personal Portfolio Platform
            </h2>
            <p className="mt-2 text-gray-600">
              A modern personal website built to showcase projects, blogs, and
              experiments with a strong focus on design and performance.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Tech Stack: Next.js, Tailwind, Prisma
            </p>
          </div>
  
          <div className="border rounded-xl p-6 hover:shadow-md transition">
            <h2 className="text-2xl font-semibold">
              Recipe Management Application
            </h2>
            <p className="mt-2 text-gray-600">
              Full-stack recipe platform featuring authentication, tagging,
              filtering, and user interaction.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Tech Stack: React, Node.js, REST APIs
            </p>
          </div>
  
        </div>
      </main>
    );
  }
  