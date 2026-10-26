"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "What is PixelClean?",
      a: "PixelClean is an AI-powered online image editing platform providing dedicated tools to remove watermarks, delete backgrounds, enhance photos, and clean documents quickly and effectively.",
    },
    {
      q: "How does the Image Watermark Remover work?",
      a: "The Image Watermark Remover uses computer vision to detect watermark text or stamps and intelligently reconstructs the underlying background textures, leaving a clean result.",
    },
    {
      q: "Can PixelClean remove watermarks from PDF files?",
      a: "Yes. Our PDF Watermark Remover detects and removes unwanted watermark text, stamps, and overlay graphics across PDF document pages.",
    },
    {
      q: "What is the Logo Watermark Remover used for?",
      a: "The Logo Watermark Remover is tailored specifically for removing brand logos, channel logos, and complex graphic emblems from images without damaging surrounding pixels.",
    },
    {
      q: "How does the Image Enhancer improve photos?",
      a: "The Image Enhancer applies neural sharpening, noise reduction, and intelligent contrast adjustment to restore clarity to soft, blurry, or low-resolution images.",
    },
    {
      q: "How does the Background Remover work?",
      a: "The Background Remover automatically separates the foreground subject—whether a person, product, or object—from its background to create a clean, transparent PNG cut-out.",
    },
    {
      q: "Do I need an account to use PixelClean tools?",
      a: "Yes, you need to sign in to access and use the tools. Creating an account is fast and free, allowing you to manage your processing credits and usage safely.",
    },
    {
      q: "Does processing reduce the original image quality?",
      a: "No. PixelClean is engineered to preserve the original resolution, sharp edges, and color accuracy of your files with minimal distortion.",
    },
    {
      q: "Is my uploaded data safe and secure?",
      a: "Yes. All uploads are processed securely over encrypted connections, and files are automatically removed after processing to protect your privacy.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border-b border-gray-200 pb-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left font-semibold text-base sm:text-lg text-gray-900 flex justify-between items-center py-2 cursor-pointer hover:text-orange-500 transition"
              >
                <span>{item.q}</span>
                <span className="text-xl sm:text-2xl text-orange-500 font-light ml-4 flex-shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>

              {open === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed"
                >
                  {item.a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

