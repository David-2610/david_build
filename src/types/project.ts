export type Project = {
    id: number;
    title: string;
    slug: string;
    shortDescription: string;
    category: "WEB" | "AIML" | "GAME";
    techStack: string[];
    coverImage: string;
    featured: boolean;
    createdAt: string;
  };
  