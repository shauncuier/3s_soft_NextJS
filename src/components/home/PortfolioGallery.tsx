"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { PortfolioItem } from "@/types/firestore";

interface PortfolioGalleryProps {
    initialPortfolio: PortfolioItem[];
    categories: string[];
}

const PortfolioGallery = ({ initialPortfolio, categories }: PortfolioGalleryProps) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [filteredPortfolio, setFilteredPortfolio] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        if (activeCategory === "All") {
            const featured = initialPortfolio.filter((item) => item.featured);
            setFilteredPortfolio(featured.slice(0, 6));
        } else {
            const filtered = initialPortfolio.filter(
                (item) => item.category === activeCategory
            );
            setFilteredPortfolio(filtered.slice(0, 6));
        }
    }, [activeCategory, initialPortfolio]);

    return (
        <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.slice(0, 6).map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${activeCategory === category
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPortfolio.map((item, index) => (
                    <div
                        key={item.id || index}
                        className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                    >
                        <Link href={`/portfolio/${item.slug}`}>
                            {/* Image Container */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
                                    <div className="flex gap-2">
                                        {item.technologies?.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                                        <FaExternalLinkAlt className="w-4 h-4" />
                                    </div>
                                </div>
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {item.description}
                                </p>

                                {/* Client & Results */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                                            Client
                                        </p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                            {item.client}
                                        </p>
                                    </div>
                                    {item.results && (
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                                                Result
                                            </p>
                                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                                {item.results}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>

                        {/* Bottom Gradient Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PortfolioGallery;
