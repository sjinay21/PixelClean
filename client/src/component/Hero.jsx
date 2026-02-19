"use client";
import { useState } from "react";
export default function Hero() {
  const [image, setImage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
  if (!image) return;
  const formData = new FormData();
  formData.append("file", image);
  setLoading(true);
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/watermark", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Upload failed");
      setLoading(false);
      return;
    }
    setUploadedUrl(data.job?.originalFile);
    setLoading(false);
    }catch (err) {
    console.error(err);
    alert("Something went wrong");
    setLoading(false);
    }
  };
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Remove Watermarks from Photos 
        </h1>
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-6"
          />
          <button
            onClick={handleUpload}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
          {uploadedUrl && (
            <div className="mt-8">
              <img
                src={uploadedUrl}
                alt="Uploaded"
                className="mx-auto rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
