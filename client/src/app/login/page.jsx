"use client";

import { useState } from "react";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import Link from "next/link";
import { loginSchema } from "@/schemas/authSchemas";
import { loginUser } from "@/lib/api";
import { notify } from "@/lib/notifications";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const { goToHome, goToRegister } = useAppNavigation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (loading) return;

    setApiError("");
    setErrors({});

    try {
      await loginSchema.validate(form, { abortEarly: false });
    } catch (validationErr) {
      if (validationErr.inner) {
        const fieldErrors = {};
        validationErr.inner.forEach((err) => {
          if (err.path && !fieldErrors[err.path]) {
            fieldErrors[err.path] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirectUrl = params?.get("redirect");
      const safeDestination = (redirectUrl && redirectUrl.startsWith("/")) ? redirectUrl : "/";

      window.location.href = safeDestination;
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid credentials";
      setApiError(message);
      notify.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-gray-900">
            Login
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Access your PixelClean account and tools
          </p>

          {apiError && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@email.com"
                value={form.email}
                onChange={handleChange}
                hasError={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                hasError={Boolean(errors.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <Button
                type="button"
                variant="authCancel"
                onClick={goToHome}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="loginSubmit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href={ROUTES.REGISTER} className="text-orange-600 hover:underline font-medium">
              Register
            </Link>
          </div>
        </div>
    </div>
  );
}
