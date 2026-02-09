"use client";

import { useEffect, useState } from "react";
import { getPortfolio, deletePortfolioItem } from "@/lib/firestore";
import { PortfolioItem } from "@/types/firestore";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlus, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminPortfolio() {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    async function fetchPortfolio() {
        try {
            const data = await getPortfolio();
            setPortfolio(data);
        } catch (error) {
            console.error("Error fetching portfolio:", error);
            toast.error("Failed to load portfolio");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this portfolio item?")) return;

        try {
            await deletePortfolioItem(id);
            setPortfolio(portfolio.filter((p) => p.id !== id));
            toast.success("Portfolio item deleted successfully");
        } catch (error) {
            console.error("Error deleting portfolio:", error);
            toast.error("Failed to delete portfolio item");
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Portfolio</h1>
                <Link
                    href="/admin/portfolio/new"
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    New Project
                </Link>
            </div>

            {portfolio.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-400 mb-4">No portfolio items yet</p>
                    <Link
                        href="/admin/portfolio/new"
                        className="text-purple-400 hover:text-purple-300"
                    >
                        Add your first project →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portfolio.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
                        >
                            <div className="h-40 bg-gray-700 relative overflow-hidden group">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1f2937/9ca3af?text=Project+Image";
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                        No Image
                                    </div>
                                )}
                                {item.featured && (
                                    <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded z-10">
                                        <FiStar className="w-3 h-3" /> Featured
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                                <p className="text-gray-500 text-sm mb-4">{item.client}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-xs">/portfolio/{item.slug}</span>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/portfolio/${item.id}`}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                        >
                                            <FiEdit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => item.id && handleDelete(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
