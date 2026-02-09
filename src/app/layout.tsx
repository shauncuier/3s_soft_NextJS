import "./globals.css";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import AuthProvider from "@/contexts/AuthContext";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import Breadcrumbs from "@/components/Breadcrumbs";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Optimized font loading with next/font
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const viewport: Viewport = {
    themeColor: "#3b82f6",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "3S-SOFT | Web Development, e-Commerce & Digital Services",
        template: "%s | 3S-SOFT",
    },
    description:
        "3S-SOFT is a premium digital agency specializing in MERN stack development, eCommerce managed services for Amazon/eBay, and data-driven SEO strategies.",
    keywords: [
        "MERN Stack",
        "Web Development",
        "Digital Agency",
        "SEO",
        "eCommerce",
        "Amazon",
        "eBay",
    ],
    authors: [{ name: "3S-SOFT" }],
    creator: "3S-SOFT",
    metadataBase: new URL("https://3s-soft.com"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://3s-soft.com/",
        title: "3S-SOFT | Web Development, eCommerce & Digital Services",
        description:
            "MERN Stack development, WordPress, product listing on Amazon/eBay/Etsy, graphics, SEO & more.",
        siteName: "3S-SOFT",
        images: [
            {
                url: "/favicon/android-chrome-512x512.png",
                width: 512,
                height: 512,
                alt: "3S-SOFT Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "3S-SOFT | Web Development, eCommerce & Digital Services",
        description:
            "MERN stack, WordPress, eCommerce product listings, SEO, graphics & virtual assistant help.",
        images: ["/favicon/android-chrome-512x512.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon/favicon.ico",
        apple: "/favicon/apple-touch-icon.png",
    },
    verification: {
        google: "your-google-verification-code",
    },
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "3S-SOFT",
    "url": "https://3s-soft.com",
    "logo": "https://3s-soft.com/favicon/android-chrome-512x512.png",
    "sameAs": [
        "https://linkedin.com/company/3s-soft",
        "https://twitter.com/3ssoft",
        "https://facebook.com/3ssoft"
    ],
    "description": "Premium digital agency specializing in MERN stack, eCommerce, and SEO."
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" data-theme="dark" className={inter.variable}>
            <head>
                <link rel="preconnect" href="https://img.freepik.com" />
                <link rel="dns-prefetch" href="https://img.freepik.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://firestore.googleapis.com" />
                <StructuredData data={organizationSchema} id="org-schema" />
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-PH7L4T9ZX3"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PH7L4T9ZX3');
          `}
                </Script>
            </head>
            <body className={inter.className}>
                <AuthProvider>
                    <Toaster position="top-right" />
                    <MainLayoutWrapper
                        navbar={<Navbar />}
                        footer={<Footer />}
                    >
                        <Breadcrumbs />
                        {children}
                    </MainLayoutWrapper>
                </AuthProvider>
            </body>
        </html>
    );
}

