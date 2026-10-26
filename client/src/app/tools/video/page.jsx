"use client";
import { useState, useEffect } from "react";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import Link from "next/link";
import api, { removeVideoWatermark } from "@/lib/api";
import { notify } from "@/lib/notifications";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function VideoTool() {
  const { goToLogin } = useAppNavigation();

  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {

      goToLogin(ROUTES.TOOL_VIDEO);
    } else {
      setIsAuthorized(true);
    }
  }, [goToLogin]);

  const handleAction = async () => {
    const token = localStorage.getItem("token");

    if (!token) {

      goToLogin(ROUTES.TOOL_VIDEO);
      return;
    }

    if (!file) {
      notify.warning("Please select a video");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    setLoading(true);

    try {
      const res = await api.post("/video", formData);
      setVideoUrl(res.data.videoUrl);
      notify.success("Video processed successfully!");

    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.message || "Video processing failed";
      notify.error(message);
    }

    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
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

      a.download = `video-${timestamp}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      notify.success("Video downloaded successfully!");
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

          <div className="mb-4 text-left">
            <Link href={ROUTES.TOOLS} className="inline-flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline">
              ← Back to All Tools
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-gray-900 tracking-tight">
            Remove Watermark from Video
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12">
            Upload your video and PixelClean will automatically remove watermark text.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-2xl w-full mx-auto">

            <Input
              type="file"
              accept="video/*"
              variant="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setVideoUrl(null);
              }}
            />

            <Button
              onClick={handleAction}
              disabled={loading}
              variant="toolAction"
            >
              {loading ? "Processing Video..." : "Upload & Remove Watermark"}
            </Button>

            {videoUrl && (
              <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                  Processed Video Preview
                </h2>

                <div className="flex justify-center">
                  <video
                    src={videoUrl}
                    controls
                    className="mx-auto rounded-2xl shadow-lg max-w-full max-h-[500px]"
                  />
                </div>

                <div>
                  <Button
                    onClick={handleDownload}
                    variant="download"
                  >
                    Download Video
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
