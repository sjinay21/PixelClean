"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
  {
    q: "Is watermark removal free?",
    a: "Yes, you can remove watermarks for free with limited usage.",
  },
  {
    q: "Does it reduce image quality?",
    a: "Our AI preserves image quality with minimal distortion.",
  },
  {
    q: "Is my data secure?",
    a: "Yes, we automatically delete uploaded images after processing.",
  },
];
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>

        {faqs.map((item, i) => (
          <div key={i} className="border-b py-6">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left font-medium flex justify-between"
            >
              {item.q}
              <span>{open === i ? "-" : "+"}</span>
            </button>

            {open === i && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-gray-600"
              >
                {item.a}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
