"use client";

import { useState, useEffect } from "react";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import Link from "next/link";
import api, { enhanceImage } from "@/lib/api";
import { notify } from "@/lib/notifications";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "@/components/ui/Image";

export default function EnhanceTool() {
  const { goToLogin } = useAppNavigation();

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(2);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      goToLogin(ROUTES.TOOL_ENHANCE);
    } else {
      setIsAuthorized(true);
    }
  }, [goToLogin]);

  const handleEnhance = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      goToLogin(ROUTES.TOOL_ENHANCE);
      return;
    }

    if (!file) {
      notify.warning("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("scale", scale);

    setLoading(true);

    try {
      const res = await api.post("/enhance", formData);
      setImageUrl(res.data.imageUrl);
      notify.success("Image enhanced successfully!");

    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.message || "Enhancement failed";
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

      a.download = `enhance-${scale}K-${timestamp}.png`;
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

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 tracking-tight">
            Image Enhancer
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12">
            Enhance your image quality with sharpening, noise reduction, and resolution upscaling.
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

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
              <Button
                onClick={() => setScale(1)}
                variant={scale === 1 ? "scaleActive" : "scaleInactive"}
              >
                1K
              </Button>

              <Button
                onClick={() => setScale(2)}
                variant={scale === 2 ? "scaleActive" : "scaleInactive"}
              >
                2K
              </Button>

              <Button
                onClick={() => setScale(4)}
                variant={scale === 4 ? "scaleActive" : "scaleInactive"}
              >
                4K
              </Button>

              <Button
                onClick={() => setScale(8)}
                variant={scale === 8 ? "scaleActive" : "scaleInactive"}
              >
                8K
              </Button>
            </div>

            <Button
              onClick={handleEnhance}
              disabled={loading}
              variant="toolAction"
            >
              {loading ? "Enhancing..." : "Enhance Image"}
            </Button>

            {imageUrl && (
              <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                  Enhanced Image Preview
                </h2>

                <div className="flex justify-center">
                  <Image
                    src={imageUrl}
                    alt="Enhanced"
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

