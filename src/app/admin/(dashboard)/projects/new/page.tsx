"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/lib/upload";
import { uploadVideo } from "@/lib/uploadVideo";

type Category = "WEB" | "AIML" | "GAME";
type Status = "COMPLETED" | "IN_PROGRESS" | "EXPERIMENT";

type Milestone = {
	title: string;
	summary: string;
};

type UploadType = "cover" | "gallery" | "video" | null;

export default function NewProjectPage() {
	const router = useRouter();

	// ===== CORE =====
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [shortDescription, setShortDescription] = useState("");
	const [description, setDescription] = useState("");

	// ===== META =====
	const [category, setCategory] = useState<Category>("WEB");
	const [status, setStatus] = useState<Status>("COMPLETED");
	const [techStack, setTechStack] = useState("");
	const [featured, setFeatured] = useState(false);
	const [order, setOrder] = useState<number | "">("");

	// ===== MEDIA =====
	const [coverImage, setCoverImage] = useState("");
	const [images, setImages] = useState<string[]>([]);
	const [videoUrl, setVideoUrl] = useState<string | null>(null);

	// ===== LINKS =====
	const [link, setLink] = useState("");
	const [githubUrl, setGithubUrl] = useState("");

	// ===== MILESTONES =====
	const [milestones, setMilestones] = useState<Milestone[]>([]);

	// ===== UI =====
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState<UploadType>(null);

	function generateSlug(value: string) {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-");
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch("/api/admin/projects", {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					slug,
					shortDescription,
					description,
					category,
					status,
					techStack: techStack.split(",").map((t) => t.trim()),
					coverImage,
					images,
					videoUrl,
					link: link || null,
					githubUrl: githubUrl || null,
					featured,
					order: order === "" ? null : Number(order),
					milestones,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to create project");
			}

			router.push("/admin/projects");
		} finally {
			setLoading(false);
		}
	}
	function removeCoverImage() {
		setCoverImage("");
	}

	function removeGalleryImage(index: number) {
		setImages((prev) => prev.filter((_, i) => i !== index));
	}

	return (
		<div className="flex justify-center py-10 px-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-5xl space-y-8"
			>
				<h1 className="text-3xl font-bold text-center text-[#2B41B0]">
					Create New Project
				</h1>

				{/* BASIC INFO */}
				<section className="rounded-xl border bg-white p-6 space-y-4">
					<h2 className="text-lg font-semibold">
						📘 Basic Information
					</h2>

					<div className="grid grid-cols-2 gap-4">
						<input
							required
							placeholder="Project title"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
								setSlug(generateSlug(e.target.value));
							}}
							className="input"
						/>

						<input
							required
							placeholder="Slug"
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							className="input"
						/>
					</div>

					<textarea
						maxLength={300}
						placeholder="Short description"
						value={shortDescription}
						onChange={(e) => setShortDescription(e.target.value)}
						className="input"
					/>

					<textarea
						rows={5}
						placeholder="Full description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="input"
					/>
				</section>

				{/* ================= MEDIA ================= */}
				<section className="rounded-xl border bg-white p-6 space-y-6">
					<h2 className="text-lg font-semibold">🖼 Media Uploads</h2>

					{/* Cover */}
					<div className="border rounded-lg p-4">
						<label className="label">Cover Image</label>
						<input
							type="file"
							accept="image/*"
							disabled={uploading !== null}
							onChange={async (e) => {
								if (!e.target.files?.[0]) return;
								setUploading("cover");
								const url = await uploadFile(
									e.target.files[0],
									"projects"
								);
								setCoverImage(url);
								setUploading(null);
							}}
						/>

						{uploading === "cover" && (
							<UploadProgress label="Uploading cover…" />
						)}

						{coverImage && (
							<div className="relative mt-3 inline-block">
								<img
									src={coverImage}
									className="h-40 rounded object-cover border"
								/>
								<button
									type="button"
									onClick={removeCoverImage}
									className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2"
								>
									✕
								</button>
							</div>
						)}
					</div>

					{/* Gallery */}
					<div className="border rounded-lg p-4">
						<label className="label">Gallery Images</label>
						<input
							type="file"
							accept="image/*"
							multiple
							disabled={uploading !== null}
							onChange={async (e) => {
								if (!e.target.files) return;
								setUploading("gallery");
								const uploaded: string[] = [];
								for (const file of Array.from(e.target.files)) {
									uploaded.push(
										await uploadFile(file, "projects")
									);
								}
								setImages((prev) => [...prev, ...uploaded]);
								setUploading(null);
							}}
						/>

						{uploading === "gallery" && (
							<UploadProgress label="Uploading images…" />
						)}

						<div className="mt-4 grid grid-cols-4 gap-4">
							{images.map((img, i) => (
								<div
									key={i}
									className="relative group border rounded-lg overflow-hidden"
								>
									<img
										src={img}
										className="h-24 w-full object-cover"
									/>
									<button
										type="button"
										onClick={() => removeGalleryImage(i)}
										className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 opacity-0 group-hover:opacity-100 transition"
									>
										✕
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Video */}
					<div className="border rounded-lg p-4">
						<label className="label">Project Video</label>
						<input
							type="file"
							accept="video/*"
							disabled={uploading !== null}
							onChange={async (e) => {
								if (!e.target.files?.[0]) return;
								setUploading("video");
								const url = await uploadVideo(
									e.target.files[0],
									"projects"
								);
								setVideoUrl(url);
								setUploading(null);
							}}
						/>

						{uploading === "video" && (
							<UploadProgress label="Uploading video…" />
						)}

						{videoUrl && (
							<video
								src={videoUrl}
								controls
								className="mt-3 h-48 rounded"
							/>
						)}
					</div>
				</section>

				{/* ================= SETTINGS ================= */}
				<section className="rounded-xl border bg-white p-6 space-y-4">
					<h2 className="text-lg font-semibold">
						⚙ Project Settings
					</h2>

					<div className="grid grid-cols-3 gap-4">
						<select
							value={category}
							onChange={(e) =>
								setCategory(e.target.value as Category)
							}
							className="input"
						>
							<option value="WEB">Web</option>
							<option value="AIML">AI / ML</option>
							<option value="GAME">Game</option>
						</select>

						<select
							value={status}
							onChange={(e) =>
								setStatus(e.target.value as Status)
							}
							className="input"
						>
							<option value="COMPLETED">Completed</option>
							<option value="IN_PROGRESS">In Progress</option>
							<option value="EXPERIMENT">Experiment</option>
						</select>

						<input
							type="number"
							placeholder="Display Order"
							value={order}
							onChange={(e) =>
								setOrder(
									e.target.value === ""
										? ""
										: Number(e.target.value)
								)
							}
							className="input"
						/>
					</div>

					<input
						placeholder="Tech Stack (comma separated)"
						value={techStack}
						onChange={(e) => setTechStack(e.target.value)}
						className="input"
					/>

					<div className="grid grid-cols-2 gap-4">
						<input
							placeholder="Live Project URL"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							className="input"
						/>
						<input
							placeholder="GitHub URL"
							value={githubUrl}
							onChange={(e) => setGithubUrl(e.target.value)}
							className="input"
						/>
					</div>

					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={featured}
							onChange={(e) => setFeatured(e.target.checked)}
						/>
						Featured Project
					</label>
				</section>

				{/* ================= MILESTONES ================= */}
				<section className="rounded-xl border bg-white p-6 space-y-4">
					<h2 className="text-lg font-semibold">🏁 Milestones</h2>

					{milestones.map((m, i) => (
						<div
							key={i}
							className="border rounded-lg p-4 space-y-2"
						>
							<input
								placeholder="Milestone title"
								value={m.title}
								onChange={(e) => {
									const copy = [...milestones];
									copy[i].title = e.target.value;
									setMilestones(copy);
								}}
								className="input"
							/>
							<textarea
								placeholder="Milestone summary"
								value={m.summary}
								onChange={(e) => {
									const copy = [...milestones];
									copy[i].summary = e.target.value;
									setMilestones(copy);
								}}
								className="input"
							/>
						</div>
					))}

					<button
						type="button"
						onClick={() =>
							setMilestones([
								...milestones,
								{ title: "", summary: "" },
							])
						}
						className="text-blue-600 text-sm"
					>
						+ Add milestone
					</button>
				</section>

				<button
					disabled={loading || uploading !== null}
					className="w-full bg-[#2B41B0] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
				>
					{loading ? "Creating..." : "Create Project"}
				</button>
			</form>
		</div>
	);
}

/* ---------- Upload Progress ---------- */

function UploadProgress({ label }: { label: string }) {
	return (
		<div className="mt-3 space-y-1">
			<p className="text-sm text-gray-600">{label}</p>
			<div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
				<div className="h-full bg-[#2B41B0] animate-progress" />
			</div>
		</div>
	);
}
