"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All", value: "ALL" },
  { label: "Web", value: "WEB" },
  { label: "AI / ML", value: "AIML" },
  { label: "Game", value: "GAME" },
];

export default function ProjectsFilter({ active }: { active: string }) {
  const router = useRouter();
  const params = useSearchParams();

  function setCategory(value: string) {
    const q = new URLSearchParams(params.toString());
    if (value === "ALL") q.delete("category");
    else q.set("category", value);
    router.push(`/projects?${q.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((c) => (
        <button
          key={c.value}
          onClick={() => setCategory(c.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium border transition
            ${
              active === c.value
                ? "bg-[#2B41B0] text-white border-[#2B41B0]"
                : "bg-white text-gray-600 hover:border-[#2B41B0]"
            }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
