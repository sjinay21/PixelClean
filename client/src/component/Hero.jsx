"use client";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

export default function Hero() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-400 rounded-full blur-[120px] opacity-30 top-20 left-20"></div>
      <div className="absolute w-[500px] h-[500px] bg-pink-400 rounded-full blur-[120px] opacity-30 bottom-20 right-20"></div>

      <div className="relative z-10 text-center max-w-3xl px-6">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Remove Watermarks Instantly with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-700"
        >
          Clean, fast and automatic watermark removal in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
          delay: 0.6,
          duration: 2,
          repeat: Infinity,
          }}
          className="mt-12"
          >
          <div
            {...getRootProps()}
            className={`bg-white/70 backdrop-blur-xl border-2 border-dashed rounded-2xl p-12 shadow-2xl cursor-pointer transition-all duration-300
              ${isDragActive ? "border-orange-500 bg-orange-50" : "border-gray-300"}
            `}
          >
            <input {...getInputProps()} />
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop the image here..."
                : "Drag & Drop or Click to Upload"}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
