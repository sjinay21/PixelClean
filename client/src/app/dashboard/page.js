"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // 🔒 If no token → redirect
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // ✅ Call protected backend route
        const res = await api.get("/protected");

        // ✅ Save user in state
        setUser(res.data.user);

        // (Optional) keep user synced in localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (error) {
        console.error("Protected route failed:", error.response?.data);

        // ❌ Token invalid or expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Extra safety
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Full Name</h2>
          <p className="text-xl font-semibold mt-2">{user.name}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Email</h2>
          <p className="text-xl font-semibold mt-2">{user.email}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Credits</h2>
          <p className="text-xl font-semibold mt-2">
            {user.credits ?? 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Subscription</h2>
          <p className="text-xl font-semibold mt-2">
            {user.subscriptionStatus ?? "Free"}
          </p>
        </div>
      </div>
    </div>
  );
}

