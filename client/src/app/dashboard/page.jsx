"use client";

import { useEffect, useState } from "react";
import api, { getUserProfile, logoutUser } from "@/lib/api";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import { notify } from "@/lib/notifications";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";

export default function DashboardPage() {
  const { goToLogin, goToHome } = useAppNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        goToLogin();
        return;
      }

      try {
        const res = await api.get("/protected");
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        console.error("Protected route failed:", error);

        logoutUser();
        goToLogin();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [goToLogin]);

  const handleLogout = () => {
    notify.confirm({
      title: "Confirm Logout",
      message: "Are you sure you want to log out of your PixelClean account?",
      confirmText: "Log Out",
      cancelText: "Cancel",
      onConfirm: () => {
        logoutUser();
        goToHome();
        notify.info("Logged out successfully.");
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 text-gray-700 font-medium text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!user) return null;

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  const toolsList = [
    {
      name: "Image Watermark Remover",
      path: "/tools/watermark",
      icon: <ImageOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />,
      desc: "Remove stamps, text, and date watermarks from images cleanly.",
    },
    {
      name: "PDF Watermark Remover",
      path: "/tools/pdf",
      icon: <PictureAsPdfOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />,
      desc: "Erase unwanted watermark stamps across PDF documents.",
    },
    {
      name: "Logo Watermark Remover",
      path: "/tools/logo",
      icon: <BrandingWatermarkOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />,
      desc: "Cleanly remove brand logos and complex graphic overlays.",
    },
    {
      name: "Image Enhancer",
      path: "/tools/enhance",
      icon: <AutoFixHighOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />,
      desc: "Upscale resolution, reduce noise, and sharpen photos.",
    },
    {
      name: "Background Remover",
      path: "/tools/background",
      icon: <ContentCutOutlinedIcon sx={{ fontSize: 26, color: "#ea580c" }} />,
      desc: "Create transparent PNG cut-outs in seconds with high precision.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 pt-28 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/50">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-lg flex-shrink-0">
                {userInitial}
              </div>

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    Welcome back, {user.name}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                    Active Account
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your subscription, monitor credits, and quickly launch your AI tools.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href={ROUTES.PRICING}
                className="flex-1 md:flex-none text-center px-5 py-2.5 rounded-xl border border-orange-500 text-orange-600 hover:bg-orange-50 text-sm font-semibold transition cursor-pointer shadow-sm hover:shadow"
              >
                Upgrade Plan
              </Link>
              <Button
                variant="dashboardLogout"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition border border-white/50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account User</span>
                <span className="p-2 rounded-xl bg-orange-50 flex items-center justify-center">
                  <PersonOutlinedIcon sx={{ color: "#ea580c", fontSize: 20 }} />
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-400 mt-1">PixelClean Member</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition border border-white/50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</span>
                <span className="p-2 rounded-xl bg-blue-50 flex items-center justify-center">
                  <EmailOutlinedIcon sx={{ color: "#2563eb", fontSize: 20 }} />
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900 truncate">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">Verified Profile</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition border border-white/50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Available Credits</span>
                <span className="p-2 rounded-xl bg-amber-50 flex items-center justify-center">
                  <BoltIcon sx={{ color: "#d97706", fontSize: 20 }} />
                </span>
              </div>
              <p className="text-2xl font-extrabold text-orange-600">{user.credits ?? 0}</p>
              <p className="text-xs text-gray-400 mt-1">Ready for processing</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition border border-white/50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan Status</span>
                <span className="p-2 rounded-xl bg-purple-50 flex items-center justify-center">
                  <WorkspacePremiumOutlinedIcon sx={{ color: "#9333ea", fontSize: 20 }} />
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900 capitalize">
                {user.subscriptionStatus ?? "Free Plan"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Standard AI Speed</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-white/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Quick Access AI Tools
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Launch any editing tool to remove watermarks, clean backgrounds, or sharpen images.
                </p>
              </div>

              <Link
                href={ROUTES.TOOLS}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
              >
                View All Tools →
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {toolsList.map((tool, idx) => (
                <div
                  key={idx}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition flex flex-col justify-between bg-white shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        {tool.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug">
                        {tool.name}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                      {tool.desc}
                    </p>
                  </div>

                  <Link
                    href={tool.path}
                    className="w-full text-center py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold rounded-lg transition shadow-sm hover:shadow cursor-pointer block"
                  >
                    Open Tool →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-white/50">
            <div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                Need more processing credits or unlimited tools?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Explore our Pro and Premium plans for higher volume processing and priority rendering.
              </p>
            </div>

            <Link
              href={ROUTES.PRICING}
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition shadow-sm hover:shadow flex-shrink-0"
            >
              Check Pricing Plans
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
