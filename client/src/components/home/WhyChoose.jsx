"use client";
import { useState } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Image from "@/components/ui/Image";

export default function WhyChoose() {
  const [position, setPosition] = useState(50);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  return (
    
      <section className="py-16 sm:py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Why you should choose{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PixelClean
              </span>{" "}
              to remove watermarks
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-orange-100 mb-4 sm:mb-6 shadow-sm">
                <AutoAwesomeIcon sx={{ fontSize: { xs: 26, sm: 30 }, color: "#ea580c" }} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
                <span className="text-purple-700">
                  Effectively remove
                </span>{" "}
                most types of watermark
              </h3>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                PixelClean is capable of removing simple text watermark,
                logo watermark to complex, multi-layered watermarks
                with low opacity or extremely high opacity.
              </p>
            </div>

            <div
              className="relative w-full aspect-[3/2] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-col-resize touch-none select-none border border-gray-200"
              onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
              onTouchMove={handleTouchMove}
              onClick={handleMove}
            >
              <Image
                src="/After.png"
                alt="After - Watermark Removed"
                variant="compareBefore"
                className="pointer-events-none select-none"
              />

              <div
                className="absolute inset-0 pointer-events-none overflow-hidden select-none"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <Image
                  src="/Before.png"
                  alt="Before - Watermarked"
                  variant="compareBefore"
                  className="pointer-events-none select-none"
                />
              </div>

              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                style={{ left: `${position}%` }}
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-2xl pointer-events-none"
                style={{ left: `${position}%` }}
              >
                ◀▶
              </div>
            </div>

          </div>
        </div>
      </section>
   
  );
}