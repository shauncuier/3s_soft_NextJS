import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Hire Expert Developers & Digital Marketers",
    description:
        "Get a free quote for your next digital project. Contact 3S-SOFT for MERN stack development, Amazon eCommerce management, SEO audits, and custom business solutions.",
};

interface ContactLayoutProps {
    children: ReactNode;
}

export default function ContactLayout({ children }: ContactLayoutProps) {
    return children;
}
