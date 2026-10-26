import React from "react";

export default function Textarea({
  value,
  onChange,
  rows = 4,
  cols,
  placeholder = "",
  variant = "default",
  hasError = false,
  className = "",
  ...props
}) {
  const variants = {
    default:"w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-y",
    error:"w-full p-3 border border-red-500 rounded-lg text-sm sm:text-base outline-none transition focus:ring-2 focus:ring-red-200 resize-y",
    unstyled: "",
  };

  const activeVariant = hasError ? "error" : variant;
  const textareaClass = `${variants[activeVariant] || ""} ${className}`.trim();

  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      className={textareaClass}
      {...props}
    />
  );
}
