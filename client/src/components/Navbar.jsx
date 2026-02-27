/*import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
      <h1 className="text-xl font-bold text-orange-500">PixelClean</h1>
      <div className="flex gap-6 items-center">
        <Link href="/pricing">Pricing</Link>
        <Link href="/api">API</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/tools">Watermark Remover</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Login
        </Link>
        <Link href="/register" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">
          Register
        </Link>
      </div>
    </nav>
  );
}*//*
"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          PixelClean
        </h1>

        <div className="flex gap-8 items-center text-sm font-medium">
          <Link href="/blog" className="hover:text-orange-500 transition">
            Blog
          </Link>
          <Link href="/pricing" className="hover:text-orange-500 transition">
            Pricing
          </Link>
           <Link href="/tools" className="hover:text-orange-500 transition">Watermark Remover</Link>
          <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
          Login
        </Link>
        <Link href="/register" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">
          Register
        </Link>
        </div>
      </div>
    </nav>
  );
}*/
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          PixelClean
        </h1>

        <div className="flex gap-8 items-center text-sm font-medium">

          <Link href="/blog" className="hover:text-orange-500 transition">
            Blog
          </Link>

          <Link href="/pricing" className="hover:text-orange-500 transition">
            Pricing
          </Link>

          <Link href="/tools" className="hover:text-orange-500 transition">
            Watermark Remover
          </Link>

          {/* ✅ If NOT logged in */}
          {!user && (
            <>
              <Link href="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                Login
              </Link>

              <Link href="/register" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">
                Register
              </Link>
            </>
          )}

          {/* ✅ If logged in */}
          {user && (
            <>
              <Link href="/dashboard" className="hover:text-orange-500 transition">
                Dashboard
              </Link>

              <span className="text-gray-700 font-semibold">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
