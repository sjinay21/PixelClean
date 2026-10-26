"use client";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { useAppNavigation } from "@/hooks/useNavigation";
import { isAuthenticated } from "@/lib/api";
import { notify } from "@/lib/notifications";
import Input from "@/components/ui/Input";

export default function Hero() {
  const { goToLogin, goToTools } = useAppNavigation();

  const handleDrop = (acceptedFiles) => {
    if (!isAuthenticated()) {
      notify.warning("You need to log in to use PixelClean tools.", {
        title: "Login Required",
      });
      goToLogin();
      return;
    }

    goToTools();
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: handleDrop,
  });

  const handleBoxClick = () => {
    if (!isAuthenticated()) {
      notify.warning("You need to log in to use PixelClean tools.", {
        title: "Login Required",
      });
      goToLogin();
      return;
    }

    open();
    goToTools();
  };

  return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 overflow-hidden pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-orange-400 rounded-full blur-[100px] md:blur-[120px] opacity-30 top-12 left-4 sm:top-20 sm:left-20 pointer-events-none"></div>
        <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-pink-400 rounded-full blur-[100px] md:blur-[120px] opacity-30 bottom-12 right-4 sm:bottom-20 sm:right-20 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-3xl w-full mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 tracking-tight"
          >
            Remove Watermarks Instantly with AI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-xl mx-auto"
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
            className="mt-8 sm:mt-12"
          >
            <div
              {...getRootProps({
                onClick: handleBoxClick,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleBoxClick();
                  }
                },
              })}
              className={`bg-white/70 backdrop-blur-xl border-2 border-dashed rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl cursor-pointer transition-all duration-300
                ${isDragActive ? "border-orange-500 bg-orange-50" : "border-gray-300"}
              `}
            >
              <Input {...getInputProps()} variant="unstyled" />
              <p className="text-base sm:text-lg font-medium text-gray-800">
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
