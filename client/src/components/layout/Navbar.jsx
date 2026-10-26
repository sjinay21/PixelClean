"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTES, useAppNavigation } from "@/hooks/useNavigation";
import { logoutUser, getStoredUser } from "@/lib/api";
import { notify } from "@/lib/notifications";
import Button from "@/components/ui/Button";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const pathname = usePathname();
  const { goToHome } = useAppNavigation();

  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      href: ROUTES.PRICING,
      label: "Pricing",
      icon: <PaymentsOutlinedIcon sx={{ fontSize: 18 }} />,
    },
    {
      href: ROUTES.TOOLS,
      label: "Tools",
      icon: <AutoFixHighOutlinedIcon sx={{ fontSize: 18 }} />,
    },
  ];

  const isLinkActive = (href) => {
    if (!pathname) return false;
    if (href === ROUTES.HOME) return pathname === ROUTES.HOME;
    return pathname === href || pathname.startsWith(href);
  };

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    notify.confirm({
      title: "Confirm Logout",
      message: "Are you sure you want to log out of your PixelClean account?",
      confirmText: "Log Out",
      cancelText: "Cancel",
      onConfirm: () => {
        logoutUser();
        setUser(null);
        setMobileMenuOpen(false);
        goToHome();
        notify.info("Logged out successfully.");
      },
    });
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        <Link
          href={ROUTES.HOME}
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer hover:opacity-90 transition"
        >
          PixelClean
        </Link>

        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  active
                    ? "text-orange-500 font-semibold bg-orange-50/80"
                    : "text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium"
                }`}
              >
                <span className={active ? "text-orange-500" : "text-gray-500"}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}

          {!user && (
            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.LOGIN}
                className="flex items-center gap-1.5 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-xs"
              >
                <LoginIcon sx={{ fontSize: 18 }} />
                <span>Login</span>
              </Link>

              <Link
                href={ROUTES.REGISTER}
                className="flex items-center gap-1.5 border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                <HowToRegOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Register</span>
              </Link>
            </div>
          )}

          {user && (
            <div className="flex items-center gap-4">
              <Link
                href={ROUTES.DASHBOARD}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  isLinkActive(ROUTES.DASHBOARD)
                    ? "text-orange-500 font-semibold bg-orange-50/80"
                    : "text-gray-700 hover:text-orange-500 hover:bg-gray-50 font-medium"
                }`}
              >
                <DashboardOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Dashboard</span>
              </Link>

              <span className="text-gray-700 font-semibold truncate max-w-[120px]">
                {user.name}
              </span>

              <Button
                variant="navLogout"
                onClick={handleLogout}
              >
                <LogoutIcon sx={{ fontSize: 16 }} />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? (
            <CloseIcon sx={{ fontSize: 26 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 26 }} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-5 py-4 flex flex-col gap-3 text-base font-medium shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                }`}
              >
                <span className={active ? "text-orange-500" : "text-gray-500"}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}

          {!user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link
                href={ROUTES.LOGIN}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-orange-500 text-white text-center px-4 py-2.5 rounded-lg hover:bg-orange-600 transition"
              >
                <LoginIcon sx={{ fontSize: 18 }} />
                <span>Login</span>
              </Link>

              <Link
                href={ROUTES.REGISTER}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 border border-orange-500 text-orange-500 text-center px-4 py-2.5 rounded-lg hover:bg-orange-50 transition"
              >
                <HowToRegOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Register</span>
              </Link>
            </div>
          )}

          {user && (
            <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
              <div className="text-gray-700 text-sm">
                Signed in as: <span className="font-semibold text-gray-900">{user.name}</span>
              </div>
              <Link
                href={ROUTES.DASHBOARD}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition ${
                  isLinkActive(ROUTES.DASHBOARD)
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                }`}
              >
                <DashboardOutlinedIcon sx={{ fontSize: 18 }} />
                <span>Dashboard</span>
              </Link>
              <Button
                variant="navLogoutMobile"
                onClick={handleLogout}
              >
                <LogoutIcon sx={{ fontSize: 18 }} />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
