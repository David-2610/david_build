"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";

/* --------------------------------------------------
   TYPES
-------------------------------------------------- */
type Project = {
	id: number;
	title: string;
	shortDescription?: string | null;
	description?: string | null;
	category?: string | null;
	status?: string | null;
	techStack?: string[] | null;
	coverImage?: string | null;
	images?: string[] | null;
	videoUrl?: string | null;
	link?: string | null;
	githubUrl?: string | null;
	featured?: boolean;
	views?: number;
	startDate?: string | null;
	endDate?: string | null;
	milestones?: {
		id: number;
		title: string;
		summary: string;
		date?: string | null;
	}[];
};

export default function ProjectDetailPage() {
	const params = useParams();
	const slug = params.slug as string;

	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!slug) {
			notFound();
			return;
		}

		fetch(`/api/projects/${slug}`, { cache: "no-store" })
			.then((res) => {
				if (!res.ok) throw new Error("Not found");
				return res.json();
			})
			.then(setProject)
			.catch(() => notFound())
			.finally(() => setLoading(false));
	}, [slug]);

	if (loading) {
		return (
			<div className="py-32 text-center text-gray-500">
				Loading project…
			</div>
		);
	}

	if (!project) return null;
	/* --------------------------------------------------
     RENDER
  -------------------------------------------------- */
	return (
		<main className="mx-auto max-w-6xl px-6 py-14 space-y-20">
			{/* ================= HERO ================= */}
			<section className="grid gap-10 lg:grid-cols-2 animate-fade-up">
				<div className="space-y-6">
					<div className="flex flex-wrap gap-2">
						{project.category && (
							<span className="badge-primary">
								{project.category}
							</span>
						)}
						{project.status && (
							<span className="badge-status">
								{project.status}
							</span>
						)}
						{project.featured && (
							<span className="badge-featured">⭐ Featured</span>
						)}
					</div>

					<h1 className="text-4xl font-bold leading-tight">
						{project.title}
					</h1>

					{project.shortDescription && (
						<p className="text-gray-600 max-w-xl">
							{project.shortDescription}
						</p>
					)}

					<div className="flex gap-4 pt-2">
						{project.link && (
							<a
								href={project.link}
								target="_blank"
								className="btn-primary"
							>
								Live Demo
							</a>
						)}
						{project.githubUrl && (
							<a
								href={project.githubUrl}
								target="_blank"
								className="btn-outline"
							>
								GitHub
							</a>
						)}
					</div>
				</div>

				<div className="aspect-[16/10] rounded-2xl overflow-hidden border bg-gray-100">
					{project.coverImage && (
						<img
							src={project.coverImage}
							alt={project.title}
							className="h-full w-full object-cover"
						/>
					)}
				</div>
			</section>

			{/* ================= META ================= */}
			<section className="animate-fade-up">
				<div className="rounded-xl border px-6 py-4 flex flex-wrap gap-6 text-sm text-gray-600">
					<span>
						<strong>Views:</strong> {project.views ?? 0}
					</span>
					{project.startDate && (
						<span>
							<strong>Started:</strong>{" "}
							{new Date(project.startDate).toLocaleDateString()}
						</span>
					)}
					{project.endDate && (
						<span>
							<strong>Completed:</strong>{" "}
							{new Date(project.endDate).toLocaleDateString()}
						</span>
					)}
				</div>
			</section>

			{/* ================= OVERVIEW ================= */}
			{project.description && (
				<section className="max-w-3xl animate-fade-up">
					<h2 className="section-title">Overview</h2>
					<p className="section-text whitespace-pre-line">
						{project.description}
					</p>
				</section>
			)}

			{/* ================= MEDIA ================= */}
			{(project.videoUrl || project.images?.length) && (
				<section className="animate-fade-up">
					<h2 className="section-title">Media</h2>

					{project.videoUrl && (
						<video
							src={project.videoUrl}
							controls
							className="mb-8 w-full rounded-xl border"
						/>
					)}

					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						{project.images?.map((img, i) => (
							<img
								key={`${img}-${i}`}
								src={img}
								className="rounded-lg border object-cover"
							/>
						))}
					</div>
				</section>
			)}

			{/* ================= TECH STACK ================= */}
			{project.techStack?.filter(Boolean).length ? (
				<section className="animate-fade-up">
					<h2 className="section-title">Tech Stack</h2>
					<div className="flex flex-wrap gap-2">
						{project.techStack.filter(Boolean).map((tech) => (
							<span key={tech} className="chip">
								{tech}
							</span>
						))}
					</div>
				</section>
			) : null}

			{/* ================= TIMELINE ================= */}
			{project.milestones?.length ? (
				<section className="animate-fade-up">
					<h2 className="section-title">Timeline</h2>

					<div className="space-y-6 border-l pl-6">
						{project.milestones.map((m) => (
							<div key={m.id} className="relative">
								<span className="dot" />
								<h3 className="font-semibold">{m.title}</h3>
								<p className="text-sm text-gray-600">
									{m.summary}
								</p>
							</div>
						))}
					</div>
				</section>
			) : null}
		</main>
	);
}
