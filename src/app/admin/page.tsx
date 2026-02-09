"use client";

import { useEffect, useState } from "react";
import { FiFileText, FiBriefcase, FiUsers, FiMail } from "react-icons/fi";
import { getBlogs, getPortfolio, getTeamMembers, getContacts } from "@/lib/firestore";
import Link from "next/link";

interface Stats {
    blogs: number;
    portfolio: number;
    team: number;
    contacts: number;
    newContacts: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        blogs: 0,
        portfolio: 0,
        team: 0,
        contacts: 0,
        newContacts: 0,
    });
    const [loading, setLoading] = useState(true);
    const [migrating, setMigrating] = useState(false);

    const fetchStats = async () => {
        try {
            const [blogs, portfolio, team, contacts] = await Promise.all([
                getBlogs(false),
                getPortfolio(),
                getTeamMembers(),
                getContacts(),
            ]);

            setStats({
                blogs: blogs.length,
                portfolio: portfolio.length,
                team: team.length,
                contacts: contacts.length,
                newContacts: contacts.filter((c) => c.status === "new").length,
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleMigration = async () => {
        if (!confirm("This will import data from local JSON files. Existing duplicates might be created. Continue?")) return;

        setMigrating(true);
        const toast = (await import("react-hot-toast")).default;

        try {
            const res = await fetch("/api/admin/migrate");
            const result = await res.json();

            if (!result.success) throw new Error(result.error);

            const { data } = result;
            const { db } = await import("@/firebase/firebase.config");
            const { collection, addDoc, Timestamp, getDocs, query, where, limit } = await import("firebase/firestore");

            const collections = ["blogs", "portfolio", "team", "testimonials", "services"];

            for (const key of collections) {
                const items = data[key];
                if (!items) continue;

                toast.loading(`Checking & Migrating ${key}...`, { id: "migration" });

                let count = 0;
                let skipped = 0;

                for (const item of items) {
                    try {
                        // Duplicate Check
                        const ref = collection(db, key);
                        let q;

                        if (item.slug) {
                            q = query(ref, where("slug", "==", item.slug), limit(1));
                        } else if (item.name) {
                            q = query(ref, where("name", "==", item.name), limit(1));
                        }

                        if (q) {
                            const existing = await getDocs(q);
                            if (!existing.empty) {
                                skipped++;
                                continue;
                            }
                        }

                        const cleanItem = { ...item };
                        delete cleanItem._id;
                        delete cleanItem.id;

                        // Add timestamps for blogs
                        if (key === "blogs") {
                            cleanItem.createdAt = Timestamp.now();
                            cleanItem.publishedAt = Timestamp.now();
                            cleanItem.published = true;
                            cleanItem.excerpt = cleanItem.details?.substring(0, 160) + "...";
                            cleanItem.content = cleanItem.details;
                            delete cleanItem.details;
                        }

                        if (key === "testimonials") {
                            cleanItem.createdAt = Timestamp.now();
                        }

                        // Map Service fields
                        if (key === "services") {
                            cleanItem.shortDescription = cleanItem.description || "";
                            cleanItem.fullDescription = cleanItem.fullContent || "";
                            cleanItem.benefits = cleanItem.benefits || [];
                            cleanItem.process = cleanItem.process || [];
                            delete cleanItem.description;
                            delete cleanItem.fullContent;
                        }

                        // Safety: Remove any empty keys from objects (like social)
                        if (cleanItem.social && typeof cleanItem.social === 'object') {
                            Object.keys(cleanItem.social).forEach(k => {
                                if (k === "" || k === undefined) {
                                    delete cleanItem.social[k];
                                }
                            });
                        }

                        await addDoc(collection(db, key), cleanItem);
                        count++;
                    } catch (itemError: any) {
                        console.error(`Error migrating item in ${key}:`, itemError);
                        throw new Error(`Failed at ${key} item ${count + 1}: ${itemError.message}`);
                    }
                }
                console.log(`Successfully migrated ${count} items to ${key}, skipped ${skipped} existing.`);
            }

            toast.success("Migration update complete! Check console for details.", { id: "migration" });
            fetchStats();
        } catch (error: any) {
            console.error("Migration failed:", error);
            toast.error(`Migration failed: ${error.message}`, { id: "migration" });
        } finally {
            setMigrating(false);
        }
    };

    const statCards = [
        {
            label: "Blog Posts",
            value: stats.blogs,
            icon: FiFileText,
            href: "/admin/blogs",
            color: "from-blue-500 to-blue-600",
        },
        {
            label: "Portfolio Items",
            value: stats.portfolio,
            icon: FiBriefcase,
            href: "/admin/portfolio",
            color: "from-purple-500 to-purple-600",
        },
        {
            label: "Team Members",
            value: stats.team,
            icon: FiUsers,
            href: "/admin/team",
            color: "from-green-500 to-green-600",
        },
        {
            label: "Contacts",
            value: stats.contacts,
            icon: FiMail,
            href: "/admin/contacts",
            color: "from-orange-500 to-orange-600",
            badge: stats.newContacts > 0 ? stats.newContacts : undefined,
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card) => (
                    <Link
                        key={card.label}
                        href={card.href}
                        className="relative bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all hover:-translate-y-1"
                    >
                        <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}
                        >
                            <card.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-gray-400 text-sm">{card.label}</p>
                        <p className="text-3xl font-bold text-white">{card.value}</p>
                        {card.badge && (
                            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                {card.badge} new
                            </span>
                        )}
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/admin/blogs/new"
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        + New Blog Post
                    </Link>
                    <Link
                        href="/admin/portfolio/new"
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                    >
                        + New Portfolio Item
                    </Link>
                    <Link
                        href="/admin/team/new"
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                        + New Team Member
                    </Link>
                </div>
            </div>

            {/* System Tools */}
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">System Tools</h2>
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={handleMigration}
                        disabled={migrating}
                        className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 rounded-lg transition-all disabled:opacity-50"
                    >
                        {migrating ? "Migration in Progress..." : "Migrate Local Data to Firestore"}
                    </button>
                    <p className="text-sm text-gray-500 mt-2 w-full">
                        Warning: This will read from <code>src/data/*.json</code> and upload to Firestore. Use only once.
                    </p>
                </div>
            </div>
        </div>
    );
}
