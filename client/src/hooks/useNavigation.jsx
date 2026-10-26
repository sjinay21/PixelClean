"use client";

import { useRouter } from "next/navigation";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PRICING: "/pricing",
  TOOLS: "/tools",
  ABOUT: "/about",
  API: "/api",
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_OF_SERVICE: "/terms-of-service",

  TOOL_WATERMARK: "/tools/watermark",
  TOOL_PDF: "/tools/pdf",
  TOOL_LOGO: "/tools/logo",
  TOOL_ENHANCE: "/tools/enhance",
  TOOL_BACKGROUND: "/tools/background",
  TOOL_VIDEO: "/tools/video",

  TOOL: (name) => `/tools/${name}`,
};

export const useAppNavigation = () => {
  const router = useRouter();

  return {
    router,

    goToHome: () => router.push(ROUTES.HOME),
    goToLogin: (redirectUrl) => {
      if (redirectUrl) {
        const dest = redirectUrl.startsWith("/") ? redirectUrl : `/${redirectUrl}`;
        router.push(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(dest)}`);
      } else {
        router.push(ROUTES.LOGIN);
      }
    },
    goToRegister: () => router.push(ROUTES.REGISTER),
    goToDashboard: () => router.push(ROUTES.DASHBOARD),
    goToPricing: () => router.push(ROUTES.PRICING),
    goToTools: () => router.push(ROUTES.TOOLS),
    goToAbout: () => router.push(ROUTES.ABOUT),
    goToApi: () => router.push(ROUTES.API),
    goToPrivacyPolicy: () => router.push(ROUTES.PRIVACY_POLICY),
    goToTermsOfService: () => router.push(ROUTES.TERMS_OF_SERVICE),

    goToWatermark: () => router.push(ROUTES.TOOL_WATERMARK),
    goToToolWatermark: () => router.push(ROUTES.TOOL_WATERMARK),
    goToPdf: () => router.push(ROUTES.TOOL_PDF),
    goToToolPdf: () => router.push(ROUTES.TOOL_PDF),
    goToLogo: () => router.push(ROUTES.TOOL_LOGO),
    goToToolLogo: () => router.push(ROUTES.TOOL_LOGO),
    goToEnhance: () => router.push(ROUTES.TOOL_ENHANCE),
    goToToolEnhance: () => router.push(ROUTES.TOOL_ENHANCE),
    goToBackground: () => router.push(ROUTES.TOOL_BACKGROUND),
    goToToolBackground: () => router.push(ROUTES.TOOL_BACKGROUND),
    goToVideo: () => router.push(ROUTES.TOOL_VIDEO),
    goToToolVideo: () => router.push(ROUTES.TOOL_VIDEO),
    goToTool: (name) => router.push(ROUTES.TOOL(name)),

    goBack: () => router.back(),
    goForward: () => router.forward(),
    refresh: () => router.refresh(),
    replace: (path) => router.replace(path),
    push: (path) => router.push(path),
  };
};

export const useNavigation = useAppNavigation;
export default useAppNavigation;
