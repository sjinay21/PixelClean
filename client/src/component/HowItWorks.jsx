/*export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            How to Remove Watermarks
          </h2>
          <p className="mt-4 text-gray-600">
            Remove watermark from photos in 4 simple steps.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg">1. Upload Photo</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Upload your image with watermark or logo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. AI Detection</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Our AI automatically detects watermark regions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. Clean & Refine</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Fine-tune results with advanced removal engine.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">4. Download</h3>
              <p className="text-gray-600 mt-2 text-sm">
                Download your cleaned HD image.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 rounded-xl h-96"></div>
        </div>
      </div>
    </section>
  );
}*/
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Upload photo with watermark",
      desc: "Drag & drop the image or choose a file from your device.",
      color: "bg-orange-100 text-orange-500",
    },
    {
      id: 2,
      title: "AI detects watermark",
      desc: "Our AI scans and automatically removes watermark areas.",
      color: "bg-pink-100 text-pink-500",
    },
    {
      id: 3,
      title: "Refine & clean",
      desc: "Advanced processing ensures natural pixel blending.",
      color: "bg-purple-100 text-purple-500",
    },
    {
      id: 4,
      title: "Download HD Image",
      desc: "Get your clean watermark-free image instantly.",
      color: "bg-blue-100 text-blue-500",
    },
  ];

  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">
            How to remove watermarks with{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              PixelClean
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-8">
            {steps.map((step) => (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStep(step.id)}
                className={`flex gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300 
                  ${
                    activeStep === step.id
                      ? "bg-white shadow-xl scale-[1.02]"
                      : "bg-transparent"
                  }`}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl text-2xl font-bold ${step.color}`}
                >
                  {step.id}
                </div>

                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src="https://imgv3.fotor.com/images/side/Remove-watermark-from-video-automatically-in-seconds-using-Fotors-free-online-AI-video-watermark-remover.jpg"
                  alt="Demo"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
