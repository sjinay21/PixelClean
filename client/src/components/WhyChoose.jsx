/*export default function WhyChoose() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Why Choose PixelClean?
          </h2>
          <p className="text-gray-600 mb-4">
            Remove complex, multi-layered watermarks without quality loss.
          </p>
          <p className="text-gray-600">
            Fast processing. High accuracy. Secure uploads.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md h-96"></div>
      </div>
    </section>
  );
}*/
"use client";
import { useState } from "react";

export default function WhyChoose() {
  const [position, setPosition] = useState(50);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Why you should choose{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              PixelClean
            </span>{" "}
            to remove watermarks
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-100 text-purple-600 text-2xl mb-6">
              ✨
            </div>

            <h3 className="text-3xl font-bold mb-6">
              <span className="text-purple-600">
                Effectively remove
              </span>{" "}
              most types of watermark
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              PixelClean is capable of removing simple text watermark,
              logo watermark to complex, multi-layered watermarks
              with low opacity or extremely high opacity.
            </p>
          </div>
          <div
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-col-resize"
            onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
            onClick={handleMove}
          >
            <img
              src="https://imgv3.fotor.com/images/side/Remove-watermark-from-video-automatically-in-seconds-using-Fotors-free-online-AI-video-watermark-remover.jpg"
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            /> 
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src="https://imgv3.fotor.com/images/side/Remove-watermark-from-video-automatically-in-seconds-using-Fotors-free-online-AI-video-watermark-remover.jpg"
                alt="After"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute top-0 bottom-0 w-1 bg-white"
              style={{ left: `${position}%` }}
            ></div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-xl"
              style={{ left: `calc(${position}% - 24px)` }}
            >
              ◀▶
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}