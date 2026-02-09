"use client";

import { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "@/lib/firestore";
import { Blog } from "@/types/firestore";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        try {
            const data = await getBlogs(false);
            setBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            toast.error("Failed to load blogs");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            await deleteBlog(id);
            setBlogs(blogs.filter((b) => b.id !== id));
            toast.success("Blog deleted successfully");
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete blog");
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
                <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    New Post
                </Link>
            </div>

            {blogs.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-400 mb-4">No blog posts yet</p>
                    <Link
                        href="/admin/blogs/new"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Create your first post →
                    </Link>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="text-left p-4 text-gray-400 font-medium">Title</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Author</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                                <th className="text-left p-4 text-gray-400 font-medium">Date</th>
                                <th className="text-right p-4 text-gray-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="border-b border-gray-700 hover:bg-gray-750">
                                    <td className="p-4">
                                        <div>
                                            <p className="text-white font-medium">{blog.title}</p>
                                            <p className="text-gray-500 text-sm">/blog/{blog.slug}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">{blog.author}</td>
                                    <td className="p-4">
                                        {blog.published ? (
                                            <span className="flex items-center gap-1 text-green-400">
                                                <FiEye className="w-4 h-4" /> Published
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-yellow-400">
                                                <FiEyeOff className="w-4 h-4" /> Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        {blog.createdAt?.toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/blogs/${blog.id}`}
                                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                            >
                                                <FiEdit className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => blog.id && handleDelete(blog.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
