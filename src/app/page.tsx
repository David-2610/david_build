"use client";

import React, { useState } from "react";
import { uploadFile } from "@/lib/upload";
import { uploadVideo } from "@/lib/uploadVideo";

const Home: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const uploadImage = async () => {
    if (!imageFile) {
      alert("Select an image first");
      return;
    }

    try {
      const url = await uploadFile(imageFile, "blogs");
      setImageUrl(url);
      alert("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
  };

  const uploadVideoHandler = async () => {
    if (!videoFile) {
      alert("Select a video first");
      return;
    }

    try {
      const url = await uploadVideo(videoFile, "projects");
      setVideoUrl(url);
      alert("Video uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Video upload failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Cloudinary Upload Test</h1>

      {/* IMAGE UPLOAD */}
      <h2>Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      <br /><br />
      <button onClick={uploadImage}>Upload Image</button>

      {imageUrl && (
        <>
          <p>Image URL:</p>
          <img src={imageUrl} alt="Uploaded" width={300} />
        </>
      )}

      <hr style={{ margin: "40px 0" }} />

      {/* VIDEO UPLOAD */}
      <h2>Upload Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
      />
      <br /><br />
      <button onClick={uploadVideoHandler}>Upload Video</button>

      {videoUrl && (
        <>
          <p>Video URL:</p>
          <video
            src={videoUrl}
            controls
            width={500}
            style={{ marginTop: "10px" }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
