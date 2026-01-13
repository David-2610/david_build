"use client";

import { useState } from "react";
import { uploadFile } from "@/lib/upload";
import RichTextEditor from "@/components/editor/RichTextEditor";

type blogtatus = "DRAFT" | "PUBLISHED";
type UploadType = "cover" | "gallery" | null;

type BlogFormData = {
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	category: string;
	tags: string;
	status: blogtatus;
	featured: boolean;
	coverImage: string;
	images: string[];
};

type Props = {
	initialData?: Partial<BlogFormData>;
	onSubmit: (data: BlogFormData) => Promise<void>;
	submitLabel: string;
};

export default function BlogForm({
	initialData = {},
	onSubmit,
	submitLabel,
}: Props) {
	const [form, setForm] = useState<BlogFormData>(() => ({
		title: "",
		slug: "",
		excerpt: "",
		content: "",
		category: "",
		tags: "",
		status: "DRAFT",
		featured: false,
		coverImage: "",
		...initialData,
		// 🛡️ HARD NORMALIZATION (single source of truth)
		images: Array.isArray(initialData.images) ? initialData.images : [],
	}));

	const [uploading, setUploading] = useState<UploadType>(null);
	const [saving, setSaving] = useState(false);

	function generateSlug(value: string) {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, "-");
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (uploading) return;

		setSaving(true);
		await onSubmit(form);
		setSaving(false);
	}

	function removeCover() {
		setForm((f) => ({ ...f, coverImage: "" }));
	}

	function removeGalleryImage(index: number) {
		setForm((f) => ({
			...f,
			images: f.images.filter((_, i) => i !== index),
		}));
	}

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
			{/* ================= CONTENT ================= */}
			<Section title="✍️ Blog Content">
				<TwoCol>
					<Input
						label="Title"
						value={form.title}
						onChange={(v) =>
							setForm({
								...form,
								title: v,
								slug: form.slug || generateSlug(v),
							})
						}
					/>
					<Input
						label="Slug"
						value={form.slug}
						onChange={(v) => setForm({ ...form, slug: v })}
					/>
				</TwoCol>

				<Textarea
					label="Excerpt"
					rows={3}
					value={form.excerpt}
					onChange={(v) => setForm({ ...form, excerpt: v })}
				/>

				<div>
					<label className="label">Full Content</label>
					<RichTextEditor
						value={form.content}
						onChange={(v) => setForm({ ...form, content: v })}
					/>
				</div>
			</Section>

			{/* ================= MEDIA ================= */}
			<Section title="🖼 Media Uploads">
				{/* Cover Image */}
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
								"blog"
							);
							setForm((f) => ({ ...f, coverImage: url }));
							setUploading(null);
						}}
					/>

					{uploading === "cover" && (
						<UploadProgress label="Uploading cover…" />
					)}

					{form.coverImage && (
						<div className="relative mt-3 inline-block">
							<img
								src={form.coverImage}
								className="h-40 rounded object-cover border"
							/>
							<button
								type="button"
								onClick={removeCover}
								className="absolute top-2 right-2 bg-black/70 text-white rounded-full px-2"
							>
								✕
							</button>
						</div>
					)}
				</MediaBlock>

				{/* Gallery Images */}
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
								uploaded.push(await uploadFile(file, "blog"));
							}

							setForm((f) => ({
								...f,
								images: [...f.images, ...uploaded],
							}));
							setUploading(null);
						}}
					/>

					{uploading === "gallery" && (
						<UploadProgress label="Uploading images…" />
					)}

					<div className="mt-4 grid grid-cols-4 gap-4">
						{form.images.map((img, i) => (
							<div
								key={`${img}-${i}`}
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
				</MediaBlock>
			</Section>

			{/* ================= SETTINGS ================= */}
			<Section title="⚙ Blog Settings">
				<TwoCol>
					<Input
						label="Category"
						value={form.category}
						onChange={(v) => setForm({ ...form, category: v })}
					/>
					<Select
						value={form.status}
						options={["DRAFT", "PUBLISHED"]}
						onChange={(v) =>
							setForm({ ...form, status: v as blogtatus })
						}
					/>
				</TwoCol>

				<Input
					label="Tags (comma separated)"
					value={form.tags}
					onChange={(v) => setForm({ ...form, tags: v })}
				/>

				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						checked={form.featured}
						onChange={(e) =>
							setForm({ ...form, featured: e.target.checked })
						}
					/>
					Featured Blog
				</label>
			</Section>

			{/* ================= ACTION ================= */}
			<button
				disabled={saving || uploading !== null}
				className="w-full bg-[#2B41B0] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
			>
				{uploading ? "Uploading…" : saving ? "Saving…" : submitLabel}
			</button>
		</form>
	);
}

/* ================= HELPERS ================= */

function Section({ title, children }: any) {
	return (
		<section className="rounded-xl border bg-white p-6 space-y-4">
			<h2 className="text-lg font-semibold">{title}</h2>
			{children}
		</section>
	);
}

function TwoCol({ children }: any) {
	return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

type InputProps = {
	label: string;
	value: string;
	onChange: (value: string) => void;
  };
  
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
  

  type TextareaProps = {
	label: string;
	value: string;
	rows?: number;
	onChange: (value: string) => void;
  };
  
  function Textarea({ label, value, rows = 3, onChange }: TextareaProps) {
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
  

  type SelectProps<T extends string> = {
	value: T;
	options: T[];
	onChange: (value: T) => void;
  };
  
  function Select<T extends string>({
	value,
	options,
	onChange,
  }: SelectProps<T>) {
	return (
	  <select
		value={value}
		onChange={(e) => onChange(e.target.value as T)}
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
  

function MediaBlock({ label, children }: any) {
	return (
		<div className="border rounded-lg p-4 space-y-3">
			<label className="label">{label}</label>
			{children}
		</div>
	);
}

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
