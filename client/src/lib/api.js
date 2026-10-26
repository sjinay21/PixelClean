import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://pixelclean.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      const currentPath = window.location.pathname;
      const redirectParam =
        currentPath && currentPath !== "/"
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : "";
      window.location.href = `/login${redirectParam}`;
    }
    return Promise.reject(error);
  }
);

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const getUserProfile = () => api.get("/protected");

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem("token"));
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const removeWatermark = (formData) => api.post("/watermark", formData);
export const removePdfWatermark = (formData) => api.post("/pdf", formData);
export const removeLogo = (formData) => api.post("/logo", formData);
export const enhanceImage = (formData) => api.post("/enhance", formData);
export const removeBackground = (formData) => api.post("/background", formData);
export const removeVideoWatermark = (formData) => api.post("/video", formData);

export const login = loginUser;
export const register = registerUser;
export const logout = logoutUser;

export default api;
