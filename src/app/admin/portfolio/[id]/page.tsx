"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import { getPortfolio, updatePortfolioItem } from "@/lib/firestore";
import { PortfolioItem } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiStar, FiImage, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

interface EditPortfolioPageProps {
    params: Promise<{ id: string }>;
}

export default function EditPortfolio({ params }: EditPortfolioPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imagePath, setImagePath] = useState<string>("");
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        client: "",
        description: "",
        longDescription: "",
        image: "",
        technologies: "",
        link: "",
        featured: false,
        results: "",
        scope: "",
    });

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const items = await getPortfolio();
                const item = items.find((p) => p.id === id);

                if (item) {
                    setFormData({
                        title: item.title,
                        slug: item.slug,
                        category: item.category,
                        client: item.client,
                        description: item.description,
                        longDescription: item.longDescription,
                        image: item.image,
                        technologies: item.technologies.join(", "),
                        link: item.link,
                        featured: item.featured,
                        results: item.results,
                        scope: item.scope.join(", "),
                    });
                    // Detect if image URL is external or uploaded
                    if (item.image && !item.image.includes("firebasestorage")) {
                        setImageInputMode("url");
                    }
                } else {
                    toast.error("Portfolio item not found");
                    router.push("/admin/portfolio");
                }
            } catch (error) {
                console.error("Error fetching portfolio:", error);
                toast.error("Failed to load portfolio item");
            } finally {
                setLoading(false);
            }
        }

        fetchPortfolio();
    }, [id, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const portfolioData: Partial<PortfolioItem> = {
                title: formData.title,
                slug: formData.slug,
                category: formData.category,
                client: formData.client,
                description: formData.description,
                longDescription: formData.longDescription,
                image: formData.image,
                technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                link: formData.link,
                featured: formData.featured,
                results: formData.results,
                scope: formData.scope.split(",").map((s) => s.trim()).filter(Boolean),
            };

            await updatePortfolioItem(id, portfolioData);
            toast.success("Portfolio item updated successfully!");
            router.push("/admin/portfolio");
        } catch (error) {
            console.error("Error updating portfolio:", error);
            toast.error("Failed to update portfolio item");
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
                    href="/admin/portfolio"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Portfolio Item</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Client *</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="eCommerce">eCommerce</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="SEO">SEO</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={2}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Rich Text Editor for Long Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Description</label>
                        <RichTextEditor
                            value={formData.longDescription}
                            onChange={(value) => setFormData({ ...formData, longDescription: value })}
                            placeholder="Detailed project description with rich formatting..."
                            minHeight="300px"
                        />
                    </div>

                    {/* Project Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Project Image
                        </label>

                        {/* Image Input Mode Toggle */}
                        <div className="flex gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => setImageInputMode("upload")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${imageInputMode === "upload"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                <FiImage className="w-4 h-4" />
                                Upload Image
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageInputMode("url")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${imageInputMode === "url"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                <FiLink className="w-4 h-4" />
                                Image URL
                            </button>
                        </div>

                        {/* Upload Mode */}
                        {imageInputMode === "upload" && (
                            <ImageUpload
                                folder="portfolio"
                                currentImageUrl={formData.image}
                                onUploadComplete={(url, path) => {
                                    setFormData({ ...formData, image: url });
                                    setImagePath(path);
                                }}
                                onDelete={() => {
                                    setFormData({ ...formData, image: "" });
                                    setImagePath("");
                                }}
                                aspectRatio="landscape"
                                seoName={formData.title}
                            />
                        )}

                        {/* URL Mode */}
                        {imageInputMode === "url" && (
                            <div className="space-y-4">
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://example.com/project-image.jpg"
                                />

                                {formData.image && (
                                    <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border border-gray-600 bg-gray-900">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://placehold.co/800x450/1f2937/9ca3af?text=Invalid+Image+URL";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Live Project URL</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="https://example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.technologies}
                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="React, Next.js, Node.js"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Scope (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.scope}
                            onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Frontend, Backend, Design"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Results</label>
                        <textarea
                            value={formData.results}
                            onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Key outcomes and results achieved..."
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${formData.featured ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-300"
                                }`}
                        >
                            <FiStar className="w-4 h-4" />
                            {formData.featured ? "Featured" : "Not Featured"}
                        </button>
                        <span className="text-sm text-gray-500">
                            {formData.featured ? "This project will be highlighted" : "Mark as featured to highlight"}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/portfolio"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {saving ? "Saving..." : "Update Project"}
                    </button>
                </div>
            </form>
        </div>
    );
}
