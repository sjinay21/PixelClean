import React from "react";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  variant = "primary",
  hasError = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:"w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200",
    outline:"w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200",
    error:"w-full p-3 border border-red-500 rounded-lg text-sm sm:text-base outline-none transition focus:ring-2 focus:ring-red-200",
    file:"mb-6 block w-full max-w-md mx-auto text-xs sm:text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 cursor-pointer",
    unstyled: "",
  };

  const defaultVariant = type === "file" && variant === "primary" ? "file" : variant;
  const activeVariant = hasError ? "error" : defaultVariant;
  const inputClass = `${variants[activeVariant] || ""} ${className}`.trim();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClass}
      {...props}
    />
  );
}
