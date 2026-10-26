"use client";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <motion.section
      id="features"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-24 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Powerful AI Tools</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Watermark Removal", "Background Removal", "Object Removal"].map(
            (title, index) => (
              <div
                key={index}
                className="bg-gray-50 p-10 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 text-sm">
                  AI-powered precision editing with professional quality.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </motion.section>
  );
}
