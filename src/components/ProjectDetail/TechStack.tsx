export default function TechStack({
    stack,
  }: {
    stack: string[];
  }) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[#2B41B0]">
          Tech Stack
        </h2>
  
        <div className="flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-[#2B41B0]/10 px-4 py-1.5 text-sm font-medium text-[#2B41B0]"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    );
  }
  