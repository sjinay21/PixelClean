"use client";

import { useState, useEffect } from "react";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import Link from "next/link";
import api from "@/lib/api";
import { notify } from "@/lib/notifications";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function PDFWatermarkTool() {
  const { goToLogin } = useAppNavigation();

  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      goToLogin(ROUTES.TOOL_PDF);
    } else {
      setIsAuthorized(true);
    }
  }, [goToLogin]);

  const handleAction = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      goToLogin(ROUTES.TOOL_PDF);
      return;
    }

    if (!file) {
      notify.warning("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await api.post("/pdf", formData);

      setPdfUrl(res.data.pdfUrl);
      notify.success("PDF processed successfully!");

    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login?redirect=/tools/pdf");
        return;
      }
      console.error(error);
      notify.error(error.response?.data?.message || error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
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

      a.download = `pdf-${timestamp}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      notify.success("PDF downloaded successfully!");
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
            Remove Watermark from PDF
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12">
            Upload your PDF and let our AI remove visible watermark overlays
            while preserving the document layout.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 max-w-2xl w-full mx-auto">

            <Input
              type="file"
              accept="application/pdf"
              variant="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setPdfUrl(null);
              }}
            />

            <Button
              onClick={handleAction}
              disabled={loading}
              variant="toolAction"
            >
              {loading ? "Processing..." : "Upload & Remove Watermark"}
            </Button>

            {pdfUrl && (
              <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-100">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                  Processed PDF Ready
                </h2>

                <Button
                  onClick={handleDownload}
                  variant="download"
                >
                  Download PDF
                </Button>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

