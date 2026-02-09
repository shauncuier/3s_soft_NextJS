import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { FaUserEdit, FaCalendarAlt, FaArrowLeft, FaTag } from "react-icons/fa";
import { getBlogs, getBlogBySlug } from "@/lib/firestore";
import { notFound } from "next/navigation";
import StructuredData from "@/components/StructuredData";
import { Blog } from "@/types/firestore";

interface PageParams {
    params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const blogs = await getBlogs(true);
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: "Blog Not Found",
        };
    }

    return {
        title: blog.title,
        description: blog.excerpt || blog.content?.substring(0, 160),
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.excerpt || blog.content?.substring(0, 160),
            images: [blog.imageUrl],
            type: "article",
            url: `https://3s-soft.com/blog/${slug}`,
            publishedTime: blog.publishedAt?.toISOString(),
            authors: [blog.author],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description: blog.excerpt || blog.content?.substring(0, 160),
            images: [blog.imageUrl],
        }
    };
}

// Helper to render formatted text
const renderFormattedText = (text: string): React.ReactNode[] => {
    if (!text) return [];
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

export default async function BlogDetails({ params }: PageParams) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "image": [blog.imageUrl],
        "datePublished": blog.publishedAt?.toISOString(),
        "dateModified": blog.publishedAt?.toISOString(),
        "author": [{
            "@type": "Person",
            "name": blog.author,
            "url": "https://3s-soft.com/team"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "3S-SOFT",
            "logo": {
                "@type": "ImageObject",
                "url": "https://3s-soft.com/favicon/android-chrome-512x512.png"
            }
        },
        "description": blog.excerpt || blog.content?.substring(0, 160)
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
            <StructuredData data={blogSchema} id={`blog-schema-${blog.slug}`} />
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
                <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                            Blog Post
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {blog.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
                {/* Author / Date Bar */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-10 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <FaUserEdit className="text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Written by</p>
                            <p className="text-white font-medium">{blog.author}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <FaCalendarAlt className="text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs">Published on</p>
                            <p className="text-white font-medium">
                                {blog.publishedAt?.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Blog Body */}
                <article className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed">
                    {(blog.content || "").split("\n").map((paragraph, index) => {
                        if (!paragraph.trim()) return null;

                        const listMatch = paragraph.match(/^(\d+)\.\s+(.+)/);
                        if (listMatch) {
                            return (
                                <div key={index} className="flex gap-3 mb-4">
                                    <span className="bg-blue-500/20 text-blue-400 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                                        {listMatch[1]}
                                    </span>
                                    <p className="flex-1">{renderFormattedText(listMatch[2])}</p>
                                </div>
                            );
                        }

                        if (paragraph.trim().startsWith("- ")) {
                            return (
                                <div key={index} className="flex gap-3 mb-3 ml-4">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <p className="flex-1">{renderFormattedText(paragraph.slice(2))}</p>
                                </div>
                            );
                        }

                        return <p key={index} className="mb-4">{renderFormattedText(paragraph)}</p>;
                    })}
                </article>

                {/* Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h3 className="flex items-center gap-2 text-white font-semibold mb-4">
                            <FaTag className="text-blue-400" /> Tags
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-16">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
                    >
                        <FaArrowLeft /> Back to All Blogs
                    </Link>
                </div>
            </div>
        </div>
    );
}
