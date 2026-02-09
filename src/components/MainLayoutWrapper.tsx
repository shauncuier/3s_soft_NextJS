"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import ScrollToTop from "@/components/ScrollToTop";

interface MainLayoutWrapperProps {
    children: ReactNode;
    navbar: ReactNode;
    footer: ReactNode;
}

export default function MainLayoutWrapper({ children, navbar, footer }: MainLayoutWrapperProps) {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith("/admin");

    // Admin routes get their own layout, no Navbar/Footer
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // Regular site pages get Navbar and Footer
    return (
        <>
            <ScrollToTop />
            {navbar}
            <main>{children}</main>
            {footer}
        </>
    );
}
