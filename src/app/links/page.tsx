export default function LinksPage() {
    return (
      <main className="min-h-screen bg-white flex items-center">
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          
          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">
            Let’s Connect
          </h1>
          <p className="text-gray-600 mb-12">
            Reach out, explore my work, or connect with me online.
          </p>
  
          {/* Links */}
          <div className="flex flex-col gap-4">
  
            <a
              href="mailto:youremail@example.com"
              className="w-full rounded-xl border px-6 py-4 text-lg font-medium hover:bg-gray-100 transition"
            >
              📧 Email Me
            </a>
  
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl border px-6 py-4 text-lg font-medium hover:bg-gray-100 transition"
            >
              💼 LinkedIn
            </a>
  
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl border px-6 py-4 text-lg font-medium hover:bg-gray-100 transition"
            >
              🧑‍💻 GitHub
            </a>
  
            <a
              href="/projects"
              className="w-full rounded-xl border px-6 py-4 text-lg font-medium hover:bg-gray-100 transition"
            >
              🚀 View Projects
            </a>
  
            <a
              href="/blogs"
              className="w-full rounded-xl border px-6 py-4 text-lg font-medium hover:bg-gray-100 transition"
            >
              ✍️ Read Blogs
            </a>
  
          </div>
        </div>
      </main>
    );
  }
  