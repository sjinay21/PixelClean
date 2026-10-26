"use client";

import Link from "next/link";
import { ROUTES } from "@/hooks/useNavigation";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ContentCutOutlinedIcon from "@mui/icons-material/ContentCutOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function Footer() {
  const productLinks = [
    {
      href: ROUTES.TOOL_WATERMARK,
      label: "Image Watermark Remover",
      icon: <ImageOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      href: ROUTES.TOOL_PDF,
      label: "PDF Watermark Remover",
      icon: <PictureAsPdfOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      href: ROUTES.TOOL_LOGO,
      label: "Logo Watermark Remover",
      icon: <BrandingWatermarkOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      href: ROUTES.TOOL_ENHANCE,
      label: "Image Enhancer",
      icon: <AutoFixHighOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      href: ROUTES.TOOL_BACKGROUND,
      label: "Background Remover",
      icon: <ContentCutOutlinedIcon sx={{ fontSize: 16 }} />,
    },
  ];

  const companyLinks = [
    {
      href: ROUTES.ABOUT,
      label: "About",
      icon: <InfoOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      href: ROUTES.PRIVACY_POLICY,
      label: "Privacy Policy",
      icon: <SecurityOutlinedIcon sx={{ fontSize: 16 }} />,
    },
    {
      href: ROUTES.TERMS_OF_SERVICE,
      label: "Terms of Service",
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 16 }} />,
    },
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <Link
            href={ROUTES.HOME}
            className="text-lg font-bold text-white hover:text-orange-400 transition cursor-pointer inline-block"
          >
            PixelClean
          </Link>
          <p className="text-gray-400 mt-4 text-sm">
            AI-powered image editing tools built for creators.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Product</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {productLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <span className="text-gray-500">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 hover:text-orange-400 transition"
                >
                  <span className="text-gray-500">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} PixelClean. All rights reserved.
      </div>
    </footer>
  );
}
