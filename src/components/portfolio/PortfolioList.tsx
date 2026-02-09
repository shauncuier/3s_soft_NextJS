"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { PortfolioItem } from "@/types/firestore";

interface PortfolioListProps {
    initialPortfolio: PortfolioItem[];
}

export default function PortfolioList({ initialPortfolio }: PortfolioListProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
    const [searchQuery, setSearchQuery] = useState("");

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(initialPortfolio.map(item => item.category)))];

    useEffect(() => {
        let filtered = initialPortfolio;

        // Filter by category
        if (activeCategory !== "All") {
            filtered = filtered.filter((item) => item.category === activeCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.technologies?.some((tech) => tech.toLowerCase().includes(query))
            );
        }

        setFilteredPortfolio(filtered);
    }, [activeCategory, searchQuery, initialPortfolio]);

    return (
        <>
            {/* Search Bar - Part of the Hero but we need state access here */}
            {/* Note: I'll move the hero search input logic to this component if I want it to behave like the original */}

            {/* Hero Section Search (passed via props or logic duplication) */}
            {/* For now, I'll include the Search bar logic here if needed, or better, keep the layout consistent */}

            <section className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-5 transition-colors duration-300 min-h-screen">
                <div className="max-w-370 mx-auto">
                    {/* Search Bar (Moved here for state access) */}
                    <div className="mb-12 max-w-xl mx-auto relative -mt-32 z-20">
                        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search projects, technologies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-2xl transition-all duration-300"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${activeCategory === category
                                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                        Showing{" "}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {filteredPortfolio.length}
                        </span>{" "}
                        projects
                    </p>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPortfolio.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                            >
                                <Link href={`/portfolio/${item.slug}`}>
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        {/* Overlay with Tech Tags */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                                            <div className="space-y-4">
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {item.technologies?.slice(0, 4).map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs rounded-full border border-white/30"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="text-white text-sm font-medium flex items-center justify-center gap-2">
                                                    View Details <FaExternalLinkAlt className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="px-4 py-1.5 bg-linear-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                                                {item.category}
                                            </span>
                                            {item.featured && (
                                                <span className="px-4 py-1.5 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full shadow-lg">
                                                    ★ Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-blue-500 text-sm font-semibold mb-1 uppercase tracking-wider">
                                                    {item.client}
                                                </p>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                            {item.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-sm">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                {item.results}
                                            </div>
                                            <span className="text-blue-500 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Case Study <FaExternalLinkAlt className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                {/* Bottom Gradient Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredPortfolio.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <FaSearch className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                No projects found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search or filter to find what you&apos;re looking for.
                            </p>
                            <button
                                onClick={() => {
                                    setActiveCategory("All");
                                    setSearchQuery("");
                                }}
                                className="mt-6 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
