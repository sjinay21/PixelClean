import React from "react";

export default function Image({
  src,
  alt = "",
  variant = "default",
  className = "",
  ...props
}) {
  const variants = {
    preview:"mx-auto rounded-2xl shadow-lg max-w-full max-h-[500px] object-contain",
    previewRounded:"rounded-xl shadow-md max-w-full max-h-[500px] object-contain",
    compareAfter:"w-full h-full object-cover",
    compareBefore:"absolute inset-0 w-full h-full object-cover",
    default: "",
    unstyled: "",
  };

  const imageClass = `${variants[variant] || ""} ${className}`.trim();

  return (
    <img
      src={src}
      alt={alt}
      className={imageClass}
      {...props}
    />
  );
}
