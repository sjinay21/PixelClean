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

      <section className="py-16 sm:py-24 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              How to remove watermarks with{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PixelClean
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 
                    ${activeStep === step.id
                      ? "bg-white shadow-xl scale-[1.01] sm:scale-[1.02]"
                      : "bg-transparent hover:bg-white/60"
                    }`}
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center rounded-2xl text-xl sm:text-2xl font-bold ${step.color}`}
                  >
                    {step.id}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-6 md:mt-0">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src="./Before_After_Image.png"
                    alt="Before and after watermark removal demonstration"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="block w-full h-auto"
                  />
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

  );
}