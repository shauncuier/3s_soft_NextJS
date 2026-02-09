"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import Link from "next/link";
import { ADMIN_EMAILS } from "@/types/firestore";
import {
    FiHome,
    FiFileText,
    FiBriefcase,
    FiUsers,
    FiMail,
    FiSettings,
    FiLogOut,
    FiGrid,
    FiMessageSquare,
} from "react-icons/fi";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { user, loading, logoutUser } = useAuth();
    const router = useRouter();

    const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login?redirectTo=/admin");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
                    <p className="text-gray-400 mb-6">
                        Your email (<strong>{user.email}</strong>) is not in the admin whitelist.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Please add your email to <code>src/types/firestore.ts</code> in the <code>ADMIN_EMAILS</code> array.
                    </p>
                    <button
                        onClick={() => logoutUser()}
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                        Logout
                    </button>
                    <Link
                        href="/"
                        className="block mt-4 text-blue-400 hover:underline"
                    >
                        Back to Website
                    </Link>
                </div>
            </div>
        );
    }

    const navItems = [
        { href: "/admin", icon: FiHome, label: "Dashboard" },
        { href: "/admin/services", icon: FiGrid, label: "Services" },
        { href: "/admin/blogs", icon: FiFileText, label: "Blogs" },
        { href: "/admin/portfolio", icon: FiBriefcase, label: "Portfolio" },
        { href: "/admin/team", icon: FiUsers, label: "Team" },
        { href: "/admin/testimonials", icon: FiMessageSquare, label: "Testimonials" },
        { href: "/admin/contacts", icon: FiMail, label: "Contacts" },
    ];

    return (
        <div className="min-h-screen bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 fixed h-full">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-white">3S-SOFT Admin</h1>
                </div>
                <nav className="mt-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-300 truncate">{user.email}</div>
                    </div>
                    <button
                        onClick={() => logoutUser()}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    >
                        <FiLogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
    );
}
