"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";
import RichTextEditor from "@/components/editor/RichTextEditor";

type BlogStatus = "DRAFT" | "PUBLISHED";
type UploadType = "cover" | "gallery" | "og" | null;

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  coverImage: string;
  images: string[];

  category: string;
  tags: string; // comma-separated in UI

  metaTitle: string;
  metaDescription: string;
  ogImage: string;

  status: BlogStatus;
  featured: boolean;
};

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<BlogForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<UploadType>(null);

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    fetch(`/api/admin/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) adminLogout();
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,

          coverImage: data.coverImage ?? "",
          images: data.images ?? [],

          category: data.category ?? "",
          tags: (data.tags ?? []).join(", "),

          metaTitle: data.metaTitle ?? "",
          metaDescription: data.metaDescription ?? "",
          ogImage: data.ogImage ?? "",

          status: data.status,
          featured: data.featured,
        });
        setLoading(false);
      });
  }, [id]);

  /* ================= UPDATE ================= */
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;

    setSaving(true);
    const token = localStorage.getItem("admin_token");

    const res = await fetch(`/api/admin/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,

        coverImage: form.coverImage || null,
        images: form.images,

        category: form.category || null,
        tags: form.tags
          ? form.tags.split(",").map((t) => t.trim())
          : [],

        metaTitle: form.metaTitle || null,
        metaDescription: form.metaDescription || null,
        ogImage: form.ogImage || null,

        status: form.status,
        featured: form.featured,
      }),
    });

    if (res.status === 401) {
      adminLogout();
      return;
    }

    router.push("/admin/blogs");
  }

  /* ================= DELETE ================= */
  async function handleDelete() {
    if (!confirm("Delete this blog permanently?")) return;

    const token = localStorage.getItem("admin_token");

    await fetch(`/api/admin/blogs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    router.push("/admin/blogs");
  }

  function removeGalleryImage(index: number) {
    if (!form) return;
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  }

  if (loading || !form) {
    return <p className="p-10">Loading…</p>;
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <form onSubmit={handleSave} className="w-full max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-[#2B41B0]">
          Edit Blog
        </h1>

        {/* ================= CONTENT ================= */}
        <Section title="✍️ Blog Content">
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
            label="Excerpt"
            value={form.excerpt}
            rows={3}
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
                setForm({ ...form, coverImage: url });
                setUploading(null);
              }}
            />

            {form.coverImage && (
              <Preview
                src={form.coverImage}
                onRemove={() => setForm({ ...form, coverImage: "" })}
              />
            )}
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
                setForm({
                  ...form,
                  images: [...form.images, ...uploaded],
                });
                setUploading(null);
              }}
            />

            <div className="grid grid-cols-4 gap-4 mt-4">
              {form.images.map((img, i) => (
                <Preview
                  key={i}
                  src={img}
                  onRemove={() => removeGalleryImage(i)}
                />
              ))}
            </div>
          </MediaBlock>
        </Section>

        {/* ================= SETTINGS ================= */}
        <Section title="⚙ Settings">
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
                setForm({ ...form, status: v as BlogStatus })
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

        {/* ================= SEO ================= */}
        <Section title="🔍 SEO">
          <Input
            label="Meta Title"
            value={form.metaTitle}
            onChange={(v) => setForm({ ...form, metaTitle: v })}
          />

          <Textarea
            label="Meta Description"
            value={form.metaDescription}
            rows={3}
            onChange={(v) =>
              setForm({ ...form, metaDescription: v })
            }
          />

          <MediaBlock label="OG Image">
            <input
              type="file"
              accept="image/*"
              disabled={uploading !== null}
              onChange={async (e) => {
                if (!e.target.files?.[0]) return;
                setUploading("og");
                const url = await uploadFile(e.target.files[0], "blogs");
                setForm({ ...form, ogImage: url });
                setUploading(null);
              }}
            />

            {form.ogImage && (
              <Preview
                src={form.ogImage}
                onRemove={() => setForm({ ...form, ogImage: "" })}
              />
            )}
          </MediaBlock>
        </Section>

        {/* ================= ACTIONS ================= */}
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

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
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

function Textarea({
  label,
  value,
  rows,
  onChange,
}: {
  label: string;
  value: string;
  rows: number;
  onChange: (v: string) => void;
}) {
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

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
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

function MediaBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function Preview({
  src,
  onRemove,
}: {
  src: string;
  onRemove: () => void;
}) {
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
