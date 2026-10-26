"use client";

import Link from "next/link";
import { ROUTES } from "@/hooks/useNavigation";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";

export default function FeatureHighlight() {
  const features = [
    {
      title: "Free To Use",
      desc: "No payment required unless you choose high-quality download.",
      icon: <SentimentSatisfiedAltOutlinedIcon sx={{ fontSize: { xs: 36, sm: 42 }, color: "#ea580c" }} />,
    },
    {
      title: "Support Multiple Image Types",
      desc: "Supports JPG, PNG, WEBP and AVIF file types.",
      icon: <CollectionsOutlinedIcon sx={{ fontSize: { xs: 36, sm: 42 }, color: "#ea580c" }} />
    },
    {
      title: "Fast & Easy",
      desc: "Enhance, retouch, resize and download lightning fast.",
      icon: <BoltIcon sx={{ fontSize: { xs: 36, sm: 42 }, color: "#ea580c" }} />,
    },
    {
      title: "All Devices Compatible",
      desc: "Works on iOS, Android, Windows & Mac browsers.",
      icon: <DevicesOutlinedIcon sx={{ fontSize: { xs: 36, sm: 42 }, color: "#ea580c" }} />,
    },
  ];

  return (
      <section className="py-16 sm:py-24 md:py-28 bg-[#f4e7e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-center">
            {features.map((item, index) => (
              <div key={index} className="flex flex-col items-center hover:-translate-y-2 transition-all duration-300 p-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white flex items-center justify-center text-3xl sm:text-4xl shadow-md mb-4 sm:mb-6">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <Link href={ROUTES.TOOLS} className="inline-block border border-red-400 text-red-500 font-medium px-8 sm:px-10 py-3 sm:py-4 rounded-2xl hover:bg-red-400 hover:text-white transition-all duration-300 text-sm sm:text-base cursor-pointer">Try now</Link>
          </div>
        </div>
      </section>
  );
}