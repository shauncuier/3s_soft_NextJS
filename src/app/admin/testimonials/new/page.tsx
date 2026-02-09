"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial } from "@/lib/firestore";
import { Testimonial } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiStar, FiImage, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewTestimonial() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePath, setImagePath] = useState<string>("");
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        company: "",
        image: "",
        rating: 5,
        testimonial: "",
        project: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const testimonialData: Omit<Testimonial, "id" | "createdAt"> = {
                name: formData.name,
                position: formData.position,
                company: formData.company,
                image: formData.image,
                rating: Number(formData.rating),
                testimonial: formData.testimonial,
                project: formData.project,
            };

            await createTestimonial(testimonialData);
            toast.success("Testimonial created successfully!");
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Error creating testimonial:", error);
            toast.error("Failed to create testimonial");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/testimonials"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Testimonial</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Client Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Client's full name"
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Position
                            </label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="CEO, Marketing Director, etc."
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Company
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Company name"
                            />
                        </div>

                        {/* Project */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Related Project
                            </label>
                            <input
                                type="text"
                                value={formData.project}
                                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Project name (if applicable)"
                            />
                        </div>
                    </div>

                    {/* Testimonial Content - Rich Text Editor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Testimonial *
                        </label>
                        <RichTextEditor
                            value={formData.testimonial}
                            onChange={(value) => setFormData({ ...formData, testimonial: value })}
                            placeholder="What did the client say about your work..."
                            minHeight="200px"
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Rating
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className={`p-1 transition-colors ${star <= formData.rating
                                        ? "text-yellow-400"
                                        : "text-gray-600"
                                        }`}
                                >
                                    <FiStar
                                        className={`w-8 h-8 ${star <= formData.rating ? "fill-current" : ""
                                            }`}
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-gray-400">
                                {formData.rating} / 5
                            </span>
                        </div>
                    </div>

                    {/* Client Photo Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Client Photo
                        </label>

                        {/* Image Input Mode Toggle */}
                        <div className="flex gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => setImageInputMode("upload")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${imageInputMode === "upload"
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                <FiImage className="w-4 h-4" />
                                Upload Photo
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageInputMode("url")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${imageInputMode === "url"
                                    ? "bg-orange-500 text-white"
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
                                folder="testimonials"
                                currentImageUrl={formData.image}
                                onUploadComplete={(url, path) => {
                                    setFormData({ ...formData, image: url });
                                    setImagePath(path);
                                }}
                                onDelete={() => {
                                    setFormData({ ...formData, image: "" });
                                    setImagePath("");
                                }}
                                aspectRatio="square"
                                seoName={formData.name}
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
                                    placeholder="https://example.com/client-photo.jpg"
                                />

                                {formData.image && (
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-900">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "Client")}&background=random&size=96`;
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                            Leave empty to use auto-generated avatar based on client name
                        </p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/testimonials"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {loading ? "Saving..." : "Add Testimonial"}
                    </button>
                </div>
            </form>
        </div>
    );
}
