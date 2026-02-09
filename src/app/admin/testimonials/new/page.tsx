"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial } from "@/lib/firestore";
import { Testimonial } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";

export default function NewTestimonial() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
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
                                Position *
                            </label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="e.g. CEO, Marketing Manager"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Company */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Company *
                            </label>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Client's company"
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Rating (1-5) *
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Testimonial Text */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Testimonial Content *
                        </label>
                        <textarea
                            value={formData.testimonial}
                            onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="What did the client say?"
                        />
                    </div>

                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Associated Project
                        </label>
                        <input
                            type="text"
                            value={formData.project}
                            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Web Development, MERN Project"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Image URL */}
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Client Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                            <p className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wider text-center">Avatar Preview</p>
                            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-600 bg-gray-800">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}&background=random`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center px-2">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
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
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {loading ? "Saving..." : "Save Testimonial"}
                    </button>
                </div>
            </form>
        </div>
    );
}
