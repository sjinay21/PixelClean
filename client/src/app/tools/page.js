"use client";

import Link from "next/link";

const tools = [
  { name: "Image Watermark Remover", path: "/tools/watermark" },
  { name: "Video Watermark Remover", path: "/tools/video" },
  { name: "Batch Watermark Remover", path: "/tools/batch-watermark" },
  { name: "Text Remover", path: "/tools/remove-text" },
  { name: "PDF Watermark Remover", path: "/tools/pdf" },
  { name: "Image Enhancer", path: "/tools/enhance" },
  { name: "Batch Enhance Images", path: "/tools/batch-enhance" },
  { name: "Background Remover", path: "/tools/background" },
  { name: "Brand Match", path: "/tools/brand-match" }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        All Tools
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold mb-4">{tool.name}</h2>

            <Link
              href={tool.path}
              className="text-orange-500 font-medium"
            >
              Open Tool →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
