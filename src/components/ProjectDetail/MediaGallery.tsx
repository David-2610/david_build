import Image from "next/image";

export default function MediaGallery({
  cover,
  images,
  video,
}: {
  cover: string;
  images: string[];
  video?: string | null;
}) {
  if (!images.length && !video) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-[#2B41B0]">
        Media
      </h2>

      {video && (
        <video
          src={video}
          controls
          className="w-full rounded-xl border"
        />
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div
            key={img}
            className="relative h-48 rounded-xl overflow-hidden border"
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
