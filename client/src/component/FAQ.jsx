"use client";
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
}
