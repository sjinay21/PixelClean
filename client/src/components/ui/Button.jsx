import React from "react";

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:"w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium rounded-lg transition text-sm sm:text-base cursor-pointer shadow-sm hover:shadow",
    authSubmit:"w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium rounded-lg transition text-sm sm:text-base cursor-pointer shadow-sm hover:shadow",
    loginSubmit:"w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium rounded-lg transition text-sm sm:text-base cursor-pointer shadow-sm hover:shadow",
    registerSubmit:"w-full sm:w-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium rounded-lg transition text-sm sm:text-base cursor-pointer shadow-sm hover:shadow",
    outline:"border border-orange-500 text-orange-500 hover:bg-orange-50 font-medium rounded-lg transition cursor-pointer",
    secondary:"w-full sm:w-auto px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition text-sm sm:text-base cursor-pointer",
    cancel:"w-full sm:w-auto px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition text-sm sm:text-base cursor-pointer",
    authCancel:"w-full sm:w-auto px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition text-sm sm:text-base cursor-pointer",
    toolAction:"w-full sm:w-auto px-6 sm:px-10 py-3 rounded-xl text-white font-semibold text-base sm:text-lg transition shadow-md bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 cursor-pointer",
    download:"inline-block mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition cursor-pointer text-sm sm:text-base shadow-sm",
    scaleActive:"px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm sm:text-base bg-orange-500 text-white shadow-sm",
    scaleInactive:"px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm sm:text-base bg-gray-100 text-gray-700 hover:bg-gray-200",
    pricingHighlight:"w-full py-3 rounded-xl font-semibold text-white transition bg-orange-500 hover:bg-orange-600 cursor-pointer",
    pricingDefault:"w-full py-3 rounded-xl font-semibold text-white transition bg-gray-800 hover:bg-black cursor-pointer",
    dashboardLogout:"flex-1 md:flex-none text-center px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-sm font-semibold transition cursor-pointer border border-gray-200",
    navLogout:"flex items-center gap-1 bg-red-500 text-white px-3.5 py-1.5 rounded-lg hover:bg-red-600 transition cursor-pointer text-xs font-semibold shadow-xs",
    navLogoutMobile:"flex items-center justify-center gap-2 bg-red-500 text-white text-center px-4 py-2.5 rounded-lg hover:bg-red-600 transition w-full cursor-pointer",
    danger:"bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition cursor-pointer shadow-xs",
    success:"inline-block mt-6 px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition cursor-pointer text-sm sm:text-base shadow-sm",
    unstyled: "",
  };

  const buttonClass = `${variants[variant] || ""} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}
