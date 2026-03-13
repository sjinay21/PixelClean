"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BackgroundRemover() {

  const router = useRouter();

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔒 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleRemoveBackground = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {

      const res = await fetch(
        "https://pixelclean.onrender.com/api/background",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Background removal failed");
      }

      setImageUrl(data.imageUrl);

    } catch (error) {

      console.error(error);
      alert(error.message);

    }

    setLoading(false);

  };
const handleDownload = async () => {

try {

const response = await fetch(imageUrl);

const blob = await response.blob();

const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;


// 🔵 NEW: create timestamp
const now = new Date();

const timestamp =
now.getFullYear() + "-" +
String(now.getMonth() + 1).padStart(2, "0") + "-" +
String(now.getDate()).padStart(2, "0") + "-" +
String(now.getHours()).padStart(2, "0") + "-" +
String(now.getMinutes()).padStart(2, "0") + "-" +
String(now.getSeconds()).padStart(2, "0");


// 🔵 UPDATED: filename includes resolution + timestamp
a.download = `background-${timestamp}.png`;


document.body.appendChild(a);

a.click();

a.remove();

} catch (error) {

console.error("Download failed:", error);

alert("Download failed");

}

};
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 py-24 min-h-screen">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Background Remover
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          Upload your image and our AI will automatically remove the background
          while preserving the main subject.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl mx-auto">

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImageUrl(null);
            }}
            className="mb-6 block mx-auto text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4 file:rounded-lg
              file:border-0 file:text-sm file:font-semibold
              file:bg-orange-100 file:text-orange-700
              hover:file:bg-orange-200"
          />

          <button
            onClick={handleRemoveBackground}
            disabled={loading}
            className="px-10 py-3 rounded-xl text-white font-semibold text-lg transition shadow-md bg-orange-500 hover:bg-orange-600"
          >
            {loading ? "Removing Background..." : "Upload & Remove Background"}
          </button>

          {imageUrl && (
            <div className="mt-12">

              <h2 className="text-xl font-semibold mb-4">
                Processed Image
              </h2>

              <img
                src={imageUrl}
                alt="Background Removed"
                className="mx-auto rounded-2xl shadow-lg max-w-full"
              />

              <a
                onClick={handleDownload}
                className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Download Image
              </a>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}
