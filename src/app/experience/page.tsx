export default function ExperiencePage() {
    return (
      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-12">Experience</h1>
  
        <div className="space-y-12">
          
          {/* Experience Block */}
          <div className="border-l-2 border-gray-200 pl-6">
            <h2 className="text-2xl font-semibold">
              Full Stack Developer
            </h2>
            <p className="text-sm text-gray-500">
              Freelance / Personal Projects · 2023 – Present
            </p>
            <p className="mt-3 text-gray-700">
              Working on full-stack applications, focusing on clean UI,
              performance optimization, and scalable architecture.
            </p>
          </div>
  
          <div className="border-l-2 border-gray-200 pl-6">
            <h2 className="text-2xl font-semibold">
              Frontend Developer
            </h2>
            <p className="text-sm text-gray-500">
              Client Work · 2022 – 2023
            </p>
            <p className="mt-3 text-gray-700">
              Developed responsive interfaces, integrated APIs, and collaborated
              closely with designers and backend teams.
            </p>
          </div>
  
        </div>
      </main>
    );
  }
  