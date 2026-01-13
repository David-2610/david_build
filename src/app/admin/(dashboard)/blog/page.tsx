"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Calendar, Tag, Star } from "lucide-react";
import BlogPreviewModal from "@/components/Admin/BlogPreviewModal";

type Blog = {
	id: number;
	title: string;
	slug: string;
	excerpt: string;
	coverImage?: string | null;
	category?: string | null;
	tags?: string[] | null;
	status: "DRAFT" | "PUBLISHED";
	featured: boolean;
	createdAt: string;
};

export default function AdminblogPage() {
	const router = useRouter();
	const [previewBlog, setPreviewBlog] = useState<any | null>(null);

	const [blog, setblog] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			try {
				// 🔒 Auth guard
				const auth = await fetch("/api/admin/dashboard", {
					credentials: "include",
				});

				if (auth.status === 401) {
					router.replace("/admin/login");
					return;
				}

				if (!auth.ok) {
					throw new Error("Auth failed");
				}

				// 📦 Fetch blog (admin can see all)
				const res = await fetch("/api/blog", {
					cache: "no-store",
				});

				if (!res.ok) {
					throw new Error("Failed to load blog");
				}

				const data = await res.json();
				setblog(data);
			} catch (err) {
				console.error(err);
				setError("Failed to load blog");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, [router]);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-[60vh] text-gray-500">
				Loading blog…
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-xl border bg-white p-10 text-center text-red-600">
				{error}
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-2xl font-bold text-[#2B41B0]">blog</h1>

				<Link
					href="/admin/blog/new"
					className="inline-flex items-center gap-2 rounded-lg bg-[#2B41B0] px-4 py-2 text-sm font-semibold text-white hover:scale-[1.05] transition"
				>
					+ New Blog
				</Link>
			</div>

			{/* Grid */}
			{blog.length > 0 && (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{blog.map((blog) => (
						<div
							key={blog.id}
							className="group rounded-2xl border bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1"
						>
							{/* Cover */}
							<div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-gray-100">
								{blog.coverImage ? (
									<Image
										src={blog.coverImage}
										alt={blog.title}
										fill
										className="object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								) : (
									<div className="flex h-full items-center justify-center text-gray-400 text-sm">
										No cover image
									</div>
								)}

								{blog.featured && (
									<span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#2B41B0] px-3 py-1 text-xs font-semibold text-white">
										<Star className="h-3 w-3" />
										Featured
									</span>
								)}
							</div>

							{/* Content */}
							<div className="space-y-3 p-5">
								<h3 className="text-lg font-semibold text-[#2B41B0] line-clamp-2">
									{blog.title}
								</h3>

								{blog.excerpt && (
									<p className="text-sm text-gray-600 line-clamp-3">
										{blog.excerpt}
									</p>
								)}

								{/* Meta */}
								<div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
									<span className="flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										{new Date(
											blog.createdAt
										).toLocaleDateString()}
									</span>

									<span
										className={`rounded-full px-2 py-0.5 font-medium ${
											blog.status === "PUBLISHED"
												? "bg-green-100 text-green-700"
												: "bg-yellow-100 text-yellow-700"
										}`}
									>
										{blog.status}
									</span>
								</div>

								{/* Category + Tags */}
								{(blog.category || blog.tags?.length) && (
									<div className="flex flex-wrap gap-2">
										{blog.category && (
											<span className="rounded-full bg-[#2B41B0]/10 px-3 py-1 text-xs font-medium text-[#2B41B0]">
												{blog.category}
											</span>
										)}

										{blog.tags?.map((tag, idx) => (
											<span
												key={`${tag || "tag"}-${idx}`}
												className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
											>
												#{tag}
											</span>
										))}
									</div>
								)}

								{/* Actions */}
								<div className="flex items-center justify-between pt-3">
									<button
										onClick={async () => {
											const res = await fetch(
												`/api/blog/id/${blog.id}`,
												{
													cache: "no-store",
												}
											);
											const fullBlog = await res.json();
											setPreviewBlog(fullBlog);
										}}
										className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 hover:underline"
									>
										<Eye className="h-4 w-4" />
										View
									</button>

									<Link
										href={`/admin/blog/${blog.id}`}
										className="inline-flex items-center gap-1 text-sm font-semibold text-[#2B41B0] hover:underline"
									>
										<Pencil className="h-4 w-4" />
										Edit
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Empty state */}
			{blog.length === 0 && (
				<div className="rounded-2xl border bg-white p-12 text-center space-y-4">
					<p className="text-gray-500 text-lg">No blog found.</p>

					<p className="text-sm text-gray-400">
						Start by creating your first blog post.
					</p>

					<Link
						href="/admin/blog/new"
						className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2B41B0] px-5 py-2.5 text-sm font-semibold text-white hover:scale-[1.05] transition"
					>
						+ Create New Blog
					</Link>
				</div>
			)}
			{previewBlog && (
				<BlogPreviewModal
					blog={previewBlog}
					onClose={() => setPreviewBlog(null)}
				/>
			)}
		</div>
	);
}
