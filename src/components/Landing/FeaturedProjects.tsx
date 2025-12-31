"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
type Project = {
	id: number;
	title: string;
	slug: string;
	shortDescription: string;
	category: "WEB" | "AIML" | "GAME";
	techStack: unknown; // 👈 FIX
	coverImage: string;
};

export default function FeaturedProjects() {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/projects/featured")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data)) {
					setProjects(data);
				} else {
					console.error("Expected array, got:", data);
					setProjects([]);
				}
				setLoading(false);
			})
			.catch((err) => {
				console.error("Fetch failed:", err);
				setProjects([]);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<section className="py-24 text-center">
				<p className="opacity-70">Loading featured projects…</p>
			</section>
		);
	}

	return (
		<section className="relative py-28 bg-[linear-gradient(180deg,#ffffff_0%,#f6f7ff_100%)]">
			<div className="max-w-6xl mx-auto px-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-[#2B41B0]">
						Featured Projects
					</h2>
					<p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg opacity-80">
						A few projects where I focused on solving real problems
						through design, code, and experimentation.
					</p>
				</motion.div>

				{/* Cards */}
				<div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, i) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.15, duration: 0.6 }}
							whileHover={{ y: -6 }}
							className="group relative"
						>
							{/* Glow */}
							<div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl bg-gradient-to-r from-[#2B41B0]/30 via-[#7E57C2]/30 to-[#FF7C5C]/30" />

							{/* Card */}
							<Link
								href={`/projects/${project.slug}`}
								className="relative z-10 block overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg"
							>
								{/* Image */}
								<div className="relative h-44 w-full">
									<Image
										src={
											project.coverImage ||
											"/icons/LOGOS/logoDF.png"
										}
										alt={project.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>

								{/* Content */}
								<div className="p-6">
									<span className="text-xs font-semibold uppercase tracking-wider text-[#7E57C2]">
										{project.category}
									</span>

									<h3 className="mt-2 text-lg font-semibold text-[#2B41B0]">
										{project.title}
									</h3>

									<p className="mt-2 text-sm opacity-80 leading-relaxed">
										{project.shortDescription}
									</p>

									{/* Tech stack */}
									<div className="mt-4 flex flex-wrap gap-2">
										{Array.isArray(project.techStack) &&
											project.techStack.map(
												(tech: string) => (
													<span
														key={tech}
														className="rounded-full bg-[#2B41B0]/10 px-3 py-1 text-xs font-medium text-[#2B41B0]"
													>
														{tech}
													</span>
												)
											)}
									</div>

									{/* Arrow */}
									<div className="mt-5 flex items-center text-sm font-medium text-[#2B41B0]">
										View project
										<ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>

				{/* CTA */}
				<div className="mt-16 text-center">
					<Link
						href="/projects"
						className="inline-flex items-center justify-center rounded-xl bg-[#2B41B0] px-6 py-3 text-white font-semibold hover:scale-[1.05] transition"
					>
						View All Projects
					</Link>
				</div>
			</div>
		</section>
	);
}
