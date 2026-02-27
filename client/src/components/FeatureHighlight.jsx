"use client";

export default function FeatureHighlight() {
  const features = [
    {
      title: "Free To Use",
      desc: "No payment required unless you choose high-quality download.",
      icon: "😊",
    },
    {
      title: "Support Multiple Image Types",
      desc: "Supports JPG, PNG, WEBP and AVIF file types.",
      icon: "🧹",
    },
    {
      title: "Fast & Easy",
      desc: "Enhance, retouch, resize and download lightning fast.",
      icon: "⚡",
    },
    {
      title: "All Devices Compatible",
      desc: "Works on iOS, Android, Windows & Mac browsers.",
      icon: "💻",
    },
  ];

  return (
    <section className="py-28 bg-[#f4e7e6]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-16 text-center">

          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center text-4xl shadow-md mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

        {/* CTA Button */}
        <div className="text-center mt-20">
          <button className="border border-red-400 text-red-400 px-10 py-4 rounded-2xl hover:bg-red-400 hover:text-white transition-all duration-300">
            Try now
          </button>
        </div>

      </div>
    </section>
  );
}