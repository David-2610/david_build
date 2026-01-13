"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Calendar, Star } from "lucide-react";

type Blog = {
	id: number;
	title: string;
	excerpt: string;
	content: string;
	coverImage?: string | null;
	category?: string | null;
	tags?: string[] | null;
	status: "DRAFT" | "PUBLISHED";
	featured: boolean;
	createdAt: string;
};

type Props = {
	blog: Blog;
	onClose: () => void;
};

export default function BlogPreviewModal({ blog, onClose }: Props) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
			<div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-xl">
				{/* Header */}
				<div className="flex items-center justify-between border-b p-4">
					<h2 className="text-lg font-semibold text-[#2B41B0]">
						Blog Preview
					</h2>

					<button
						onClick={onClose}
						className="rounded-full p-1 hover:bg-gray-100"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Content */}
				<div className="overflow-y-auto p-6 space-y-6">
					{/* Cover */}
					{blog.coverImage && (
						<div className="relative h-56 w-full overflow-hidden rounded-xl">
							<Image
								src={blog.coverImage}
								alt={blog.title}
								fill
								className="object-cover"
							/>

							{blog.featured && (
								<span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#2B41B0] px-3 py-1 text-xs font-semibold text-white">
									<Star className="h-3 w-3" />
									Featured
								</span>
							)}
						</div>
					)}

					{/* Title */}
					<div className="space-y-1">
						<h1 className="text-2xl font-bold text-[#2B41B0]">
							{blog.title}
						</h1>

						<div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
							<span className="flex items-center gap-1">
								<Calendar className="h-3 w-3" />
								{new Date(blog.createdAt).toLocaleDateString()}
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
					</div>

					{/* Category & Tags */}
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

					{/* Excerpt */}
					{blog.excerpt && (
						<p className="text-gray-700 text-sm">{blog.excerpt}</p>
					)}

					{/* Content preview */}
					<div className="prose max-w-none text-sm">
						<div
							dangerouslySetInnerHTML={{ __html: blog.content }}
						/>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 border-t p-4">
					<button
						onClick={onClose}
						className="rounded-lg border px-4 py-2 text-sm"
					>
						Close
					</button>

					<Link
						href={`/admin/blog/${blog.id}`}
						className="rounded-lg bg-[#2B41B0] px-4 py-2 text-sm font-semibold text-white"
					>
						Edit Blog
					</Link>
				</div>
			</div>
		</div>
	);
}
