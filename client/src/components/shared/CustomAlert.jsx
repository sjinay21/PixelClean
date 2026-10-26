"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/hooks/useNavigation";
import { subscribeNotifications } from "@/lib/notifications";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

function ToastIcon({ type }) {
  switch (type) {
    case "success":
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircleOutlinedIcon className="text-emerald-600" sx={{ fontSize: 22 }} />
        </div>
      );
    case "error":
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
          <ErrorOutlinedIcon className="text-red-600" sx={{ fontSize: 22 }} />
        </div>
      );
    case "warning":
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
          <WarningAmberIcon className="text-orange-600" sx={{ fontSize: 22 }} />
        </div>
      );
    case "info":
    default:
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <InfoOutlinedIcon className="text-blue-600" sx={{ fontSize: 22 }} />
        </div>
      );
  }
}

export default function NotificationContainer() {
  const pathname = usePathname();
  const [toasts, setToasts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState(null);

  const isAuthPage =
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.REGISTER ||
    pathname === `${ROUTES.LOGIN}/` ||
    pathname === `${ROUTES.REGISTER}/`;

  const positionClasses = isAuthPage
    ? "top-4 sm:top-6"
    : "top-20 sm:top-24";

  useEffect(() => {
    const unsubscribe = subscribeNotifications({
      addToast: (toast) => {
        setToasts((prev) => [...prev, toast]);

        if (toast.duration && toast.duration > 0) {
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== toast.id));
          }, toast.duration);
        }
      },
      removeToast: (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      },
      showConfirm: (dialog) => {
        setConfirmDialog(dialog);
      },
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleConfirmAction = (confirmed) => {
    if (!confirmDialog) return;
    if (confirmed && typeof confirmDialog.onConfirm === "function") {
      confirmDialog.onConfirm();
    } else if (!confirmed && typeof confirmDialog.onCancel === "function") {
      confirmDialog.onCancel();
    }
    setConfirmDialog(null);
  };

  return (
    <>
      <div
        className={`fixed ${positionClasses} right-4 sm:right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm sm:max-w-md w-full px-4 sm:px-0`}
        aria-live="polite"
      >
        {toasts.map((toast) => {
          const typeBorder =
            toast.type === "success"
              ? "border-emerald-200 bg-white"
              : toast.type === "error"
              ? "border-red-200 bg-white"
              : toast.type === "warning"
              ? "border-orange-200 bg-white"
              : "border-blue-200 bg-white";

          const role = toast.type === "error" ? "alert" : "status";

          return (
            <div
              key={toast.id}
              role={role}
              className={`pointer-events-auto rounded-xl shadow-xl border p-4 flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${typeBorder}`}
            >
              <ToastIcon type={toast.type} />

              <div className="flex-1 min-w-0 pr-1">
                {toast.title && (
                  <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                    {toast.title}
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-gray-700 leading-snug break-words">
                  {toast.message}
                </p>
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-lg p-1 transition cursor-pointer"
                aria-label="Close notification"
              >
                <CloseIcon sx={{ fontSize: 18 }} />
              </button>
            </div>
          );
        })}
      </div>
      {confirmDialog && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-modal-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-100 transform transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <WarningAmberIcon sx={{ fontSize: 26 }} className="text-orange-600" />
              </div>
              <h3 id="confirm-modal-title" className="text-lg font-bold text-gray-900">
                {confirmDialog.title || "Confirm Action"}
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {confirmDialog.message}
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => handleConfirmAction(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition cursor-pointer"
              >
                {confirmDialog.cancelText || "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => handleConfirmAction(true)}
                className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition cursor-pointer shadow-sm"
              >
                {confirmDialog.confirmText || "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CustomAlert({ type = "info", title, message, onClose }) {
  const typeStyles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-orange-50 border-orange-200 text-orange-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`p-4 rounded-xl border flex items-start gap-3 ${typeStyles[type] || typeStyles.info}`}
    >
      <ToastIcon type={type} />
      <div className="flex-1 min-w-0">
        {title && <h5 className="font-semibold text-sm mb-0.5">{title}</h5>}
        <p className="text-xs sm:text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition"
          aria-label="Dismiss alert"
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </button>
      )}
    </div>
  );
}
