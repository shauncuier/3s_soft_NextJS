"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  content?: string;
  image?: string;
  type?: "website" | "article";
}

// Note: In Next.js App Router, metadata should be exported from page.tsx files
// This component can be used for client-side dynamic title updates
const PageTitle = ({ title, content, image, type = "website" }: PageTitleProps) => {
  const pathname = usePathname();
  const currentUrl = `https://3s-soft.com${pathname}`;
  const defaultImage = "https://3s-soft.com/favicon/android-chrome-512x512.png";
  const siteTitle = "3S-SOFT";

  // In Next.js App Router, use generateMetadata in page.tsx instead
  // This component is kept for compatibility but metadata is handled at page level
  return null;
};

export default PageTitle;
