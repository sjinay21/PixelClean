const listeners = new Set();

function addToast({ type = "info", message, title, duration }) {
  if (typeof window === "undefined") return null;

  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const defaultDuration = type === "error" ? 6000 : 4000;

  const toast = {
    id,
    type,
    message: typeof message === "string" ? message : JSON.stringify(message),
    title,
    duration: duration ?? defaultDuration,
  };

  listeners.forEach((listener) => {
    if (typeof listener.addToast === "function") {
      listener.addToast(toast);
    }
  });

  return id;
}

function requestConfirm({
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (typeof window === "undefined") return null;

  const id = `confirm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

  const dialog = {
    id,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  };

  listeners.forEach((listener) => {
    if (typeof listener.showConfirm === "function") {
      listener.showConfirm(dialog);
    }
  });

  return id;
}

function dismissToast(id) {
  listeners.forEach((listener) => {
    if (typeof listener.removeToast === "function") {
      listener.removeToast(id);
    }
  });
}

export const notify = {
  success: (message, options = {}) =>
    addToast({ type: "success", message, ...options }),
  error: (message, options = {}) =>
    addToast({ type: "error", message, ...options }),
  warning: (message, options = {}) =>
    addToast({ type: "warning", message, ...options }),
  info: (message, options = {}) =>
    addToast({ type: "info", message, ...options }),
  confirm: (options) => requestConfirm(options),
  dismiss: (id) => dismissToast(id),
};

export function subscribeNotifications(handlers) {
  listeners.add(handlers);
  return () => {
    listeners.delete(handlers);
  };
}

export default notify;
