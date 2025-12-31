"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";
import { uploadVideo } from "@/lib/uploadVideo";

type Category = "WEB" | "AIML" | "GAME";

export default function NewProjectPage() {
	const router = useRouter();

	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [shortDescription, setShortDescription] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState<Category>("WEB");
	const [techStack, setTechStack] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [featured, setFeatured] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [uploadingImage, setUploadingImage] = useState(false);
	const [uploadingVideo, setUploadingVideo] = useState(false);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	function generateSlug(value: string) {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, "");
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const token = localStorage.getItem("admin_token");

		const res = await fetch("/api/admin/projects", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				title,
				slug,
				shortDescription,
				description,
				category,
				techStack: techStack.split(",").map((t) => t.trim()),
				coverImage,
				videoUrl, // ✅ ADD THIS
				featured,
			}),
		});

		if (res.status === 401) {
			adminLogout();
			return;
		}

		if (!res.ok) {
			setError("Failed to create project");
			setLoading(false);
			return;
		}

		router.push("/admin/projects");
	}

	return (
		<div className="max-w-3xl space-y-6">
			<h1 className="text-2xl font-bold text-[#2B41B0]">
				Create Project
			</h1>

			<form
				onSubmit={handleSubmit}
				className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
			>
				{error && (
					<p className="rounded bg-red-50 p-3 text-sm text-red-600">
						{error}
					</p>
				)}

				{/* Title */}
				<div>
					<label className="block text-sm font-medium">Title</label>
					<input
						required
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							setSlug(generateSlug(e.target.value));
						}}
						className="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				{/* Slug */}
				<div>
					<label className="block text-sm font-medium">Slug</label>
					<input
						required
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
						className="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				{/* Short Description */}
				<div>
					<label className="block text-sm font-medium">
						Short Description
					</label>
					<textarea
						required
						maxLength={300}
						value={shortDescription}
						onChange={(e) => setShortDescription(e.target.value)}
						className="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				{/* Full Description */}
				<div>
					<label className="block text-sm font-medium">
						Full Description
					</label>
					<textarea
						required
						rows={6}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				{/* Category */}
				<div>
					<label className="block text-sm font-medium">
						Category
					</label>
					<select
						value={category}
						onChange={(e) =>
							setCategory(e.target.value as Category)
						}
						className="mt-1 w-full rounded border px-3 py-2"
					>
						<option value="WEB">Web</option>
						<option value="AIML">AI / ML</option>
						<option value="GAME">Game</option>
					</select>
				</div>

				{/* Tech Stack */}
				<div>
					<label className="block text-sm font-medium">
						Tech Stack (comma separated)
					</label>
					<input
						value={techStack}
						onChange={(e) => setTechStack(e.target.value)}
						placeholder="Next.js, Prisma, MySQL"
						className="mt-1 w-full rounded border px-3 py-2"
					/>
				</div>

				{/* Cover Image */}
				<div>
					<label className="block text-sm font-medium">
						Cover Image
					</label>

					<input
						type="file"
						accept="image/*"
						onChange={async (e) => {
							if (!e.target.files?.[0]) return;

							setUploadingImage(true);
							const url = await uploadFile(
								e.target.files[0],
								"projects"
							);
							setCoverImage(url);
							setUploadingImage(false);
						}}
						className="mt-1 w-full"
					/>

					{uploadingImage && (
						<p className="mt-1 text-sm text-gray-500">
							Uploading image…
						</p>
					)}

					{coverImage && (
						<img
							src={coverImage}
							className="mt-3 h-32 rounded border object-cover"
							alt="Preview"
						/>
					)}
				</div>

				{/* video  */}
				<div>
					<label className="block text-sm font-medium">
						Project Video (optional)
					</label>

					<input
						type="file"
						accept="video/*"
						onChange={async (e) => {
							if (!e.target.files?.[0]) return;

							setUploadingVideo(true);
							const url = await uploadVideo(
								e.target.files[0],
								"projects"
							);
							setVideoUrl(url);
							setUploadingVideo(false);
						}}
						className="mt-1 w-full"
					/>

					{uploadingVideo && (
						<p className="mt-1 text-sm text-gray-500">
							Uploading video…
						</p>
					)}

					{videoUrl && (
						<video
							src={videoUrl}
							controls
							className="mt-3 h-40 rounded border"
						/>
					)}
				</div>

				{/* Featured */}
				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={featured}
						onChange={(e) => setFeatured(e.target.checked)}
					/>
					<label className="text-sm font-medium">
						Featured Project
					</label>
				</div>

				{/* Actions */}
				<div className="flex gap-3">
					<button
						disabled={loading || uploadingImage || uploadingVideo}
						className="rounded bg-[#2B41B0] px-5 py-2 text-white font-semibold disabled:opacity-50"
					>
						{loading ? "Creating..." : "Create Project"}
					</button>

					<button
						type="button"
						onClick={() => router.push("/admin/projects")}
						className="rounded border px-5 py-2 text-sm"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
