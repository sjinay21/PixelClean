"use client";

import { useState, useEffect } from "react";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import Link from "next/link";
import api, { removeBackground } from "@/lib/api";
import { notify } from "@/lib/notifications";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "@/components/ui/Image";

export default function BackgroundRemover() {
  const { goToLogin } = useAppNavigation();

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      goToLogin(ROUTES.TOOL_BACKGROUND);
    } else {
      setIsAuthorized(true);
    }
  }, [goToLogin]);

  const handleRemoveBackground = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      goToLogin(ROUTES.TOOL_BACKGROUND);
      return;
    }

    if (!file) {
      notify.warning("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await api.post("/background", formData);
      setImageUrl(res.data.imageUrl);
      notify.success("Background removed successfully!");

    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.message || "Background removal failed";
      notify.error(message);
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

      const now = new Date();
      const timestamp =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + "-" +
        String(now.getHours()).padStart(2, "0") + "-" +
        String(now.getMinutes()).padStart(2, "0") + "-" +
        String(now.getSeconds()).padStart(2, "0");

      a.download = `background-${timestamp}.png`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      notify.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      notify.error("Download failed");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100">
        <div className="text-gray-700 font-medium text-base sm:text-lg">
          Verifying access...
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 pt-28 pb-16 sm:pb-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900 tracking-tight">
            Background Remover
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12">
            Upload your image and our AI will automatically remove the background
            while preserving the main subject.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-2xl w-full mx-auto">

            <Input
              type="file"
              accept="image/*"
              variant="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setImageUrl(null);
              }}
            />

            <Button
              onClick={handleRemoveBackground}
              disabled={loading}
              variant="toolAction"
            >
              {loading ? "Removing Background..." : "Upload & Remove Background"}
            </Button>

            {imageUrl && (
              <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                  Processed Image Preview
                </h2>

                <div className="flex justify-center">
                  <Image
                    src={imageUrl}
                    alt="Background Removed"
                    variant="preview"
                  />
                </div>

                <div>
                  <Button
                    onClick={handleDownload}
                    variant="download"
                  >
                    Download Image
                  </Button>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

