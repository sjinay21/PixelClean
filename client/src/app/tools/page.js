"use client";

import Link from "next/link";

const tools = [
  { name: "Image Watermark Remover", path: "/tools/watermark" },
  { name: "PDF Watermark Remover", path: "/tools/pdf" },
  { name: "Logo Watermark Remover", path: "/tools/logo" },
  { name: "Image Enhancer", path: "/tools/enhance" },
  { name: "Background Remover", path: "/tools/background" },
  { name: "Video Watermark Remover", path: "/tools/video" }
];

export default function ToolsPage() {
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 py-24 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-12">
          All Tools
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
            >

              <h2 className="text-lg font-semibold mb-6">
                {tool.name}
              </h2>

              <Link
                href={tool.path}
                className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Open Tool →
              </Link>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
