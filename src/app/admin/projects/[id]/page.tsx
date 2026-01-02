"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";
import { uploadVideo } from "@/lib/uploadVideo";

type UploadType = "cover" | "gallery" | "video" | null;

export default function EditProjectPage() {
	const { id } = useParams();
	const router = useRouter();

	const [form, setForm] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState<UploadType>(null);

	/* ================= FETCH ================= */
	useEffect(() => {
		const token = localStorage.getItem("admin_token");

		fetch(`/api/admin/projects/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				if (res.status === 401) adminLogout();
				return res.json();
			})
			.then((data) => {
				setForm({
					...data,
					techStack: data.techStack.join(", "),
					images: data.images ?? [],
					videoUrl: data.videoUrl ?? null,
				});
				setLoading(false);
			});
	}, [id]);

	/* ================= SAVE ================= */
	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);

		const token = localStorage.getItem("admin_token");

		const res = await fetch(`/api/admin/projects/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				...form,
				techStack: form.techStack
					.split(",")
					.map((t: string) => t.trim()),
			}),
		});

		if (res.status === 401) adminLogout();
		router.push("/admin/projects");
	}

	/* ================= DELETE ================= */
	async function handleDelete() {
		if (!confirm("Delete this project permanently?")) return;

		const token = localStorage.getItem("admin_token");

		await fetch(`/api/admin/projects/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});

		router.push("/admin/projects");
	}

	function removeGalleryImage(index: number) {
		setForm({
			...form,
			images: form.images.filter((_: any, i: number) => i !== index),
		});
	}

	if (loading) return <p className="p-10">Loading…</p>;

	/* ================= UI ================= */
	return (
		<div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
			<form onSubmit={handleSave} className="w-full max-w-5xl space-y-8">
				<h1 className="text-3xl font-bold text-center text-[#2B41B0]">
					Edit Project
				</h1>

				{/* ================= BASIC ================= */}
				<Section title="📘 Basic Information">
					<TwoCol>
						<Input
							label="Title"
							value={form.title}
							onChange={(v) => setForm({ ...form, title: v })}
						/>
						<Input
							label="Slug"
							value={form.slug}
							onChange={(v) => setForm({ ...form, slug: v })}
						/>
					</TwoCol>

					<Textarea
						label="Short Description"
						value={form.shortDescription}
						onChange={(v) =>
							setForm({ ...form, shortDescription: v })
						}
					/>

					<Textarea
						label="Full Description"
						rows={5}
						value={form.description}
						onChange={(v) => setForm({ ...form, description: v })}
					/>
				</Section>

				{/* ================= MEDIA ================= */}
				<Section title="🖼 Media">
					{/* Cover */}
					<MediaBlock label="Cover Image">
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
								setForm({ ...form, coverImage: url });
								setUploading(null);
							}}
						/>

						{uploading === "cover" && <UploadProgress />}

						{form.coverImage && (
							<Preview
								src={form.coverImage}
								onRemove={() =>
									setForm({ ...form, coverImage: "" })
								}
							/>
						)}
					</MediaBlock>

					{/* Gallery */}
					<MediaBlock label="Gallery Images">
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
								setForm({
									...form,
									images: [...form.images, ...uploaded],
								});
								setUploading(null);
							}}
						/>

						{uploading === "gallery" && <UploadProgress />}

						<div className="grid grid-cols-4 gap-4 mt-4">
							{form.images.map((img: string, i: number) => (
								<Preview
									key={i}
									src={img}
									onRemove={() => removeGalleryImage(i)}
								/>
							))}
						</div>
					</MediaBlock>

					{/* Video */}
					<MediaBlock label="Project Video">
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
								setForm({ ...form, videoUrl: url });
								setUploading(null);
							}}
						/>

						{uploading === "video" && <UploadProgress />}

						{form.videoUrl && (
							<video
								src={form.videoUrl}
								controls
								className="mt-3 h-40 rounded border"
							/>
						)}
					</MediaBlock>
				</Section>

				{/* ================= SETTINGS ================= */}
				<Section title="⚙ Settings">
					<TwoCol>
						<Select
							value={form.category}
							onChange={(v) => setForm({ ...form, category: v })}
							options={["WEB", "AIML", "GAME"]}
						/>
						<Select
							value={form.status}
							onChange={(v) => setForm({ ...form, status: v })}
							options={["COMPLETED", "IN_PROGRESS", "EXPERIMENT"]}
						/>
					</TwoCol>

					<Input
						label="Tech Stack"
						value={form.techStack}
						onChange={(v) => setForm({ ...form, techStack: v })}
					/>

					<TwoCol>
						<Input
							label="Live URL"
							value={form.link || ""}
							onChange={(v) => setForm({ ...form, link: v })}
						/>
						<Input
							label="GitHub URL"
							value={form.githubUrl || ""}
							onChange={(v) => setForm({ ...form, githubUrl: v })}
						/>
					</TwoCol>

					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={form.featured}
							onChange={(e) =>
								setForm({ ...form, featured: e.target.checked })
							}
						/>
						Featured Project
					</label>
				</Section>

				{/* ================= ACTION ================= */}
				<div className="flex gap-4">
					<button
						disabled={saving || uploading !== null}
						className="flex-1 bg-[#2B41B0] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
					>
						{saving ? "Saving..." : "Save Changes"}
					</button>

					<button
						type="button"
						onClick={handleDelete}
						className="bg-red-500 text-white px-6 rounded-xl"
					>
						Delete
					</button>
				</div>
			</form>
		</div>
	);
}
type InputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
};

type TextareaProps = {
	label: string;
	value: string;
	rows?: number;
	onChange: (value: string) => void;
};

type SelectProps = {
	value: string;
	options: string[];
	onChange: (value: string) => void;
};

type SectionProps = {
	title: string;
	children: React.ReactNode;
};

type WrapperProps = {
	children: React.ReactNode;
};

type MediaBlockProps = {
	label: string;
	children: React.ReactNode;
};

type PreviewProps = {
	src: string;
	onRemove: () => void;
};

/* ================= HELPERS ================= */

function Section({ title, children }: SectionProps) {
	return (
		<section className="rounded-xl border bg-white p-6 space-y-4">
			<h2 className="text-lg font-semibold">{title}</h2>
			{children}
		</section>
	);
}

function TwoCol({ children }: WrapperProps) {
	return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

function Input({ label, value, onChange }: InputProps) {
	return (
		<div>
			<label className="label">{label}</label>
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="input"
			/>
		</div>
	);
}

function Textarea({ label, value, onChange, rows = 3 }: TextareaProps) {
	return (
		<div>
			<label className="label">{label}</label>
			<textarea
				rows={rows}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="input"
			/>
		</div>
	);
}

function Select({ value, options, onChange }: SelectProps) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="input"
		>
			{options.map((o) => (
				<option key={o} value={o}>
					{o}
				</option>
			))}
		</select>
	);
}

function MediaBlock({ label, children }: MediaBlockProps) {
	return (
		<div className="border rounded-lg p-4 space-y-2">
			<label className="label">{label}</label>
			{children}
		</div>
	);
}

function Preview({ src, onRemove }: PreviewProps) {
	return (
		<div className="relative group border rounded-lg overflow-hidden">
			<img src={src} className="h-28 w-full object-cover" />
			<button
				type="button"
				onClick={onRemove}
				className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2 opacity-0 group-hover:opacity-100 transition"
			>
				✕
			</button>
		</div>
	);
}

function UploadProgress() {
	return (
		<div className="mt-2">
			<div className="h-2 bg-gray-200 rounded overflow-hidden">
				<div className="h-full bg-[#2B41B0] animate-progress" />
			</div>
		</div>
	);
}
