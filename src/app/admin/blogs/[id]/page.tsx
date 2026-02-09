"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import { getBlogBySlug, updateBlog, getBlogs } from "@/lib/firestore";
import { Blog } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

interface EditBlogPageProps {
    params: Promise<{ id: string }>;
}

export default function EditBlog({ params }: EditBlogPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        author: "",
        tags: "",
        readTime: "",
        published: false,
    });

    useEffect(() => {
        async function fetchBlog() {
            try {
                // First get all blogs to find by ID
                const blogs = await getBlogs(false);
                const blog = blogs.find((b) => b.id === id);

                if (blog) {
                    setFormData({
                        title: blog.title,
                        slug: blog.slug,
                        excerpt: blog.excerpt,
                        content: blog.content,
                        imageUrl: blog.imageUrl,
                        author: blog.author,
                        tags: blog.tags.join(", "),
                        readTime: blog.readTime,
                        published: blog.published,
                    });
                } else {
                    toast.error("Blog not found");
                    router.push("/admin/blogs");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast.error("Failed to load blog");
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const blogData: Partial<Blog> = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                imageUrl: formData.imageUrl,
                author: formData.author,
                tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
                readTime: formData.readTime,
                published: formData.published,
            };

            await updateBlog(id, blogData);
            toast.success("Blog post updated successfully!");
            router.push("/admin/blogs");
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Failed to update blog post");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/blogs"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Blog Post</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Excerpt *
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            required
                            rows={2}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Content *
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            required
                            rows={12}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Featured Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Author *
                            </label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Tags
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* Read Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Read Time
                            </label>
                            <input
                                type="text"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Publish Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, published: !formData.published })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${formData.published
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-700 text-gray-300"
                                }`}
                        >
                            {formData.published ? (
                                <>
                                    <FiEye className="w-4 h-4" /> Published
                                </>
                            ) : (
                                <>
                                    <FiEyeOff className="w-4 h-4" /> Draft
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/blogs"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {saving ? "Saving..." : "Update Post"}
                    </button>
                </div>
            </form>
        </div>
    );
}
