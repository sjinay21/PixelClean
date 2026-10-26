"use client";

import Link from "next/link";
import { ROUTES } from "@/hooks/useNavigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

export default function NotFound() {


  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] bg-orange-400 rounded-full blur-[100px] sm:blur-[120px] opacity-30 top-12 left-4 sm:top-20 sm:left-20 pointer-events-none" />
        <div className="absolute w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] bg-pink-400 rounded-full blur-[100px] sm:blur-[120px] opacity-30 bottom-12 right-4 sm:bottom-20 sm:right-20 pointer-events-none" />

        <div className="relative z-10 max-w-lg w-full mx-auto text-center bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 sm:p-12">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
            <SentimentDissatisfiedIcon sx={{ fontSize: { xs: 48, sm: 58 }, color: "#ffffff" }} />
          </div>

          <h1 className="text-6xl sm:text-8xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            Page Not Found
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-3 max-w-md mx-auto leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The link may be broken, or the page may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
             <Link
              href={ROUTES.HOME}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center"
            >
              Return to Homepage
            </Link>
            <Link
              href={ROUTES.PRICING}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer text-center"
            >
              View Pricing & Tools
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
