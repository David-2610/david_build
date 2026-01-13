export const uploadFile = async (
    file: File,
    folder: "blog" | "projects"
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    formData.append("folder", folder);
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  
    if (!res.ok) {
      throw new Error("Cloudinary upload failed");
    }
  
    const data = await res.json();
    return data.secure_url as string;
  };
  