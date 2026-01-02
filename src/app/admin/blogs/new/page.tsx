"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";
import RichTextEditor from "@/components/editor/RichTextEditor";

type BlogStatus = "DRAFT" | "PUBLISHED";
type UploadType = "cover" | "gallery" | "og" | null;

export default function NewBlogPage() {
  const router = useRouter();

  /* ================= CORE ================= */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  /* ================= META ================= */
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<BlogStatus>("DRAFT");
  const [featured, setFeatured] = useState(false);

  /* ================= SEO ================= */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogImage, setOgImage] = useState("");

  /* ================= MEDIA ================= */
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState<UploadType>(null);

  const [saving, setSaving] = useState(false);

  function generateSlug(value: string) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  }

  function removeGalleryImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem("admin_token");

    const res = await fetch("/api/admin/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        slug,
        excerpt,
        content,

        coverImage,
        images,
        category: category || null,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],

        // SEO
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        ogImage: ogImage || null,

        status,
        featured,
      }),
    });

    if (res.status === 401) {
      adminLogout();
      return;
    }

    router.push("/admin/blogs");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-[#2B41B0]">
          Create Blog
        </h1>

        {/* ================= CONTENT ================= */}
        <Section title="✍️ Blog Content">
          <TwoCol>
            <Input
              label="Title"
              value={title}
              onChange={(v) => {
                setTitle(v);
                if (!slug) setSlug(generateSlug(v));
              }}
            />
            <Input label="Slug" value={slug} onChange={setSlug} />
          </TwoCol>

          <Textarea
            label="Excerpt (Short summary)"
            value={excerpt}
            rows={3}
            onChange={setExcerpt}
          />

          <div>
            <label className="label">Full Content</label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </Section>

        {/* ================= MEDIA ================= */}
        <Section title="🖼 Media">
          <MediaBlock label="Cover Image">
            <input
              type="file"
              accept="image/*"
              disabled={uploading !== null}
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                setUploading("cover");
                const url = await uploadFile(e.target.files[0], "blogs");
                setCoverImage(url);
                setUploading(null);
              }}
            />
            {uploading === "cover" && <UploadProgress />}
            {coverImage && <Preview src={coverImage} onRemove={() => setCoverImage("")} />}
          </MediaBlock>

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
                  uploaded.push(await uploadFile(file, "blogs"));
                }
                setImages((prev) => [...prev, ...uploaded]);
                setUploading(null);
              }}
            />
            {uploading === "gallery" && <UploadProgress />}
            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((img, i) => (
                <Preview key={i} src={img} onRemove={() => removeGalleryImage(i)} />
              ))}
            </div>
          </MediaBlock>
        </Section>

        {/* ================= SETTINGS ================= */}
        <Section title="⚙ Settings">
          <TwoCol>
            <Input label="Category" value={category} onChange={setCategory} />
            <Select
              value={status}
              options={["DRAFT", "PUBLISHED"]}
              onChange={(v) => setStatus(v as BlogStatus)}
            />
          </TwoCol>

          <Input
            label="Tags (comma separated)"
            value={tags}
            onChange={setTags}
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured Blog
          </label>
        </Section>

        {/* ================= SEO ================= */}
        <Section title="🔍 SEO">
          <Input label="Meta Title" value={metaTitle} onChange={setMetaTitle} />

          <Textarea
            label="Meta Description"
            value={metaDescription}
            rows={3}
            onChange={setMetaDescription}
          />

          <MediaBlock label="OG Image (Social Preview)">
            <input
              type="file"
              accept="image/*"
              disabled={uploading !== null}
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                setUploading("og");
                const url = await uploadFile(e.target.files[0], "blogs");
                setOgImage(url);
                setUploading(null);
              }}
            />
            {ogImage && <Preview src={ogImage} onRemove={() => setOgImage("")} />}
          </MediaBlock>
        </Section>

        {/* ================= ACTION ================= */}
        <button
          disabled={saving || uploading !== null}
          className="w-full bg-[#2B41B0] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}

/* ================= HELPERS ================= */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-white p-6 space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  );
}

function Textarea({ label, value, rows, onChange }: { label: string; value: string; rows: number; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  );
}

function Select({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function MediaBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function Preview({ src, onRemove }: { src: string; onRemove: () => void }) {
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
