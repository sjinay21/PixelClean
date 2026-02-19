"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    identifier: "", password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Invalid credentials");
      return;
    }
    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input type="text"
          name="identifier"
          placeholder="Email or Username"
          value={form.identifier}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded-lg"
        />
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
