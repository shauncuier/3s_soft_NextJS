import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Portfolio | 3S-SOFT Digital Agency",
    description:
        "Explore our portfolio of successful web development, eCommerce, and digital marketing projects delivered to clients in the US, UK, and globally.",
};

interface PortfolioLayoutProps {
    children: ReactNode;
}

export default function PortfolioLayout({ children }: PortfolioLayoutProps) {
    return children;
}
