"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { uploadFile } from "@/lib/upload";
import { uploadVideo } from "@/lib/uploadVideo";
import { adminFetch } from "@/lib/adminFetch";
import { useAdminData } from "@/contexts/AdminDataContext";

type Category = "WEB" | "AIML" | "GAME";
type Status = "COMPLETED" | "IN_PROGRESS" | "EXPERIMENT";
type UploadType = "cover" | "gallery" | "video" | null;

type Milestone = {
	title: string;
	summary: string;
	date?: string | null;
};

export default function EditProjectPage() {
	const { id } = useParams();
	const router = useRouter();
	const { refreshProjects, refreshDashboard } = useAdminData();

	const [form, setForm] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState<UploadType>(null);

	const { slug } = useParams();

	/* ================= FETCH ================= */
	useEffect(() => {
	  if (!slug) return;
	
	  fetch(`/api/projects/${slug}`, { cache: "no-store" })
		.then((res) => {
		  if (!res.ok) throw new Error("Project not found");
		  return res.json();
		})
		.then((data) => {
		  setForm({
			...data,
			techStack: Array.isArray(data.techStack)
			  ? data.techStack.join(", ")
			  : "",
			images: data.images ?? [],
			startDate: data.startDate
			  ? data.startDate.slice(0, 10)
			  : "",
			endDate: data.endDate
			  ? data.endDate.slice(0, 10)
			  : "",
			milestones: data.milestones ?? [],
		  });
		  setLoading(false);
		})
		.catch(() => {
		  router.push("/admin/projects");
		});
	}, [slug, router]);
	

	/* ================= SAVE ================= */
	async function handleSave(e: React.FormEvent) {
		e.preventDefault();
		setSaving(true);

		await adminFetch(`/api/admin/projects/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				...form,
				techStack: form.techStack
					.split(",")
					.map((t: string) => t.trim()),
				order: form.order === "" ? null : Number(form.order),
				startDate: form.startDate || null,
				endDate: form.endDate || null,
			}),
		});

		refreshProjects();
		refreshDashboard();
		router.push("/admin/projects");
	}

	/* ================= DELETE ================= */
	async function handleDelete() {
		if (!confirm("Delete this project permanently?")) return;

		await adminFetch(`/api/admin/projects/${id}`, { method: "DELETE" });
		refreshProjects();
		refreshDashboard();
		router.push("/admin/projects");
	}

	if (loading) return <p className="p-10">Loading…</p>;

	/* ================= UI ================= */
	return (
		<div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
			<form onSubmit={handleSave} className="w-full max-w-5xl space-y-8">
				<h1 className="text-3xl font-bold text-center text-[#2B41B0]">
					Edit Project
				</h1>

				{/* BASIC */}
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

				{/* MEDIA */}
				<Section title="🖼 Media">
					<MediaBlock label="Cover Image">
						<input
							type="file"
							accept="image/*"
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
						{form.coverImage && (
							<Preview
								src={form.coverImage}
								onRemove={() =>
									setForm({ ...form, coverImage: "" })
								}
							/>
						)}
					</MediaBlock>

					<MediaBlock label="Gallery">
						<input
							type="file"
							accept="image/*"
							multiple
							onChange={async (e) => {
								if (!e.target.files) return;
								setUploading("gallery");
								const uploaded = [];
								for (const f of Array.from(e.target.files))
									uploaded.push(
										await uploadFile(f, "projects")
									);
								setForm({
									...form,
									images: [...form.images, ...uploaded],
								});
								setUploading(null);
							}}
						/>
						<div className="grid grid-cols-4 gap-4 mt-4">
							{form.images.map((img: string, i: number) => (
								<Preview
									key={i}
									src={img}
									onRemove={() =>
										setForm({
											...form,
											images: form.images.filter(
												(_: any, idx: number) =>
													idx !== i
											),
										})
									}
								/>
							))}
						</div>
					</MediaBlock>
				</Section>

				{/* SETTINGS */}
				<Section title="⚙ Settings">
					<TwoCol>
						<Select
							value={form.category}
							options={["WEB", "AIML", "GAME"]}
							onChange={(v) => setForm({ ...form, category: v })}
						/>
						<Select
							value={form.status}
							options={["COMPLETED", "IN_PROGRESS", "EXPERIMENT"]}
							onChange={(v) => setForm({ ...form, status: v })}
						/>
					</TwoCol>

					<Input
						label="Tech Stack"
						value={form.techStack}
						onChange={(v) => setForm({ ...form, techStack: v })}
					/>

					<TwoCol>
						<Input
							label="Start Date"
							value={form.startDate}
							onChange={(v) => setForm({ ...form, startDate: v })}
						/>
						<Input
							label="End Date"
							value={form.endDate}
							onChange={(v) => setForm({ ...form, endDate: v })}
						/>
					</TwoCol>

					<Input
						label="Display Order"
						value={form.order ?? ""}
						onChange={(v) => setForm({ ...form, order: v })}
					/>

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

					<p className="text-sm text-muted-foreground">
						Views: {form.views}
					</p>
				</Section>

				{/* ACTIONS */}
				<div className="flex gap-4">
					<button className="flex-1 bg-[#2B41B0] text-white py-3 rounded-xl font-semibold">
						Save Changes
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
