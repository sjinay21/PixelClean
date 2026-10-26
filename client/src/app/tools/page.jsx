"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";

const tools = [
  { name: "Image Watermark Remover", path: "/tools/watermark" },
  { name: "PDF Watermark Remover", path: "/tools/pdf" },
  { name: "Logo Watermark Remover", path: "/tools/logo" },
  { name: "Image Enhancer", path: "/tools/enhance" },
  { name: "Background Remover", path: "/tools/background" },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 pt-28 pb-16 sm:pb-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-gray-900 tracking-tight">
            All Tools
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-12 text-sm sm:text-base">
            Select an AI-powered editing tool below to remove watermarks, clean backgrounds, or enhance photo quality.
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col justify-between border border-gray-100"
              >
                <div>
                  <div className="w-12 h-12 mx-auto rounded-xl bg-orange-100 flex items-center justify-center mb-4 shadow-sm">
                    {index === 0 && <ImageOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />}
                    {index === 1 && <PictureAsPdfOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />}
                    {index === 2 && <BrandingWatermarkOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />}
                    {index === 3 && <AutoFixHighOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />}
                    {index === 4 && <ContentCutOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold mb-2 text-gray-900">
                    {tool.name}
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
                    {index === 0 && "Remove stamps, text, and date watermarks from images cleanly."}
                    {index === 1 && "Erase unwanted watermark stamps across your PDF document pages."}
                    {index === 2 && "Eliminate brand logos and graphic emblems seamlessly."}
                    {index === 3 && "Upscale resolution, reduce noise, and sharpen blurry photos."}
                    {index === 4 && "Automatically create clean transparent PNG cut-outs in seconds."}
                  </p>
                </div>

                <div>
                  <Link
                    href={tool.path}
                    className="inline-block w-full px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition text-sm sm:text-base cursor-pointer shadow-sm hover:shadow"
                  >
                    Open Tool →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
