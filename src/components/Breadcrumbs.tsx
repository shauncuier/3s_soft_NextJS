"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaHome } from "react-icons/fa";
import StructuredData from "./StructuredData";

const Breadcrumbs = () => {
    const pathname = usePathname();

    // Don't show breadcrumbs on homepage
    if (pathname === "/") return null;

    const pathSegments = pathname.split("/").filter((segment) => segment !== "");

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());

        return { label, href };
    });

    const items = [
        { label: "Home", href: "/" },
        ...breadcrumbItems
    ];

    // Schema.org BreadcrumbList
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://3s-soft.com${item.href === "/" ? "" : item.href}`
        }))
    };

    return (
        <nav aria-label="Breadcrumb" className="py-4 px-5 max-w-[1480px] mx-auto overflow-x-auto whitespace-nowrap scrollbar-hide">
            <StructuredData data={schema} id="breadcrumb-schema" />
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <FaChevronRight className="mx-2 text-[10px] text-gray-600 flex-shrink-0" />}
                        <Link
                            href={item.href}
                            className={`hover:text-blue-500 transition-colors duration-200 capitalize ${index === items.length - 1 ? "text-blue-400 font-medium" : ""
                                }`}
                        >
                            {index === 0 ? <FaHome className="inline mb-1" /> : item.label}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
