"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { adminLogout } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/upload";
import { uploadVideo } from "@/lib/uploadVideo";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  /* ---------------- FETCH PROJECT ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("admin_token");

    fetch(`/api/admin/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) adminLogout();
        return res.json();
      })
      .then((data) => {
        setForm({
          ...data,
          techStack: data.techStack.join(", "),
          videoUrl: data.videoUrl ?? null,
        });
        setLoading(false);
      });
  }, [id]);

  /* ---------------- SAVE PROJECT ---------------- */
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
        videoUrl: form.videoUrl ?? null,
      }),
    });

    if (res.status === 401) adminLogout();

    router.push("/admin/projects");
  }

  /* ---------------- DELETE PROJECT ---------------- */
  async function handleDelete() {
    if (!confirm("Delete this project permanently?")) return;

    const token = localStorage.getItem("admin_token");

    await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/admin/projects");
  }

  if (loading) return <p>Loading…</p>;

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-[#2B41B0]">
        Edit Project
      </h1>

      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
      >
        {/* TEXT FIELDS */}
        {[
          ["Title", "title"],
          ["Slug", "slug"],
          ["Short Description", "shortDescription"],
          ["Tech Stack", "techStack"],
        ].map(([label, key]) => (
          <div key={key}>
            <label className="block text-sm font-medium">
              {label}
            </label>
            <input
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
        ))}

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium">
            Description
          </label>
          <textarea
            rows={6}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </div>

        {/* COVER IMAGE */}
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
              setForm({ ...form, coverImage: url });
              setUploadingImage(false);
            }}
            className="mt-1 w-full"
          />

          {uploadingImage && (
            <p className="mt-1 text-sm text-gray-500">
              Uploading image…
            </p>
          )}

          {form.coverImage && (
            <img
              src={form.coverImage}
              alt="Cover preview"
              className="mt-3 h-32 rounded border object-cover"
            />
          )}
        </div>

        {/* VIDEO */}
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
              setForm({ ...form, videoUrl: url });
              setUploadingVideo(false);
            }}
            className="mt-1 w-full"
          />

          {uploadingVideo && (
            <p className="mt-1 text-sm text-gray-500">
              Uploading video…
            </p>
          )}

          {form.videoUrl && (
            <video
              src={form.videoUrl}
              controls
              className="mt-3 h-40 rounded border"
            />
          )}
        </div>

        {/* FEATURED */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
          />
          <label className="text-sm font-medium">
            Featured Project
          </label>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            disabled={saving || uploadingImage || uploadingVideo}
            className="rounded bg-[#2B41B0] px-5 py-2 text-white font-semibold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-500 px-5 py-2 text-white"
          >
            Delete Project
          </button>
        </div>
      </form>
    </div>
  );
}
