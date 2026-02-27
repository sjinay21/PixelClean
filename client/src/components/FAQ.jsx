/*"use client";
import { useState } from "react";

const faqs = [
  {
    question: "Is watermark removal free?",
    answer: "Yes, you can remove watermarks for free with limited usage.",
  },
  {
    question: "Does it reduce image quality?",
    answer: "Our AI preserves image quality with minimal distortion.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we automatically delete uploaded images after processing.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-6">
            <button
              className="w-full text-left font-medium text-lg flex justify-between"
              onClick={() => setOpen(open === index ? null : index)}
            >
              {faq.question}
              <span>{open === index ? "-" : "+"}</span>
            </button>

            {open === index && (
              <p className="mt-4 text-gray-600 text-sm">
                {faq.answer}
              </p>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}*/
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
