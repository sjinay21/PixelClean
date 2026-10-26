"use client";

import { useState } from "react";
import { useAppNavigation, ROUTES } from "@/hooks/useNavigation";
import Link from "next/link";
import { registerSchema } from "@/schemas/authSchemas";
import { registerUser } from "@/lib/api";
import { notify } from "@/lib/notifications";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const { goToLogin, goToHome } = useAppNavigation();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
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
      await registerSchema.validate(form, { abortEarly: false });
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

      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      notify.success("Registration successful. Please login.");
      goToLogin();

    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";
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
            Create Account
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Sign up to unlock and use PixelClean AI tools
          </p>

          {apiError && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                hasError={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                hasError={Boolean(errors.username)}
              />
              {errors.username && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username}</p>
              )}
            </div>

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

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="mobile"
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                hasError={Boolean(errors.mobile)}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Password"
                value={form.confirmPassword}
                onChange={handleChange}
                hasError={Boolean(errors.confirmPassword)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center mt-6">
              <Button
                type="button"
                variant="authCancel"
                onClick={goToHome}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="registerSubmit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>

          <div className="text-center mt-6 pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-600">
            Already have an account?{" "}
            <Link href={ROUTES.LOGIN} className="text-orange-600 hover:underline font-medium">
              Login
            </Link>
          </div>
        </div>
    </div>
  );
}
