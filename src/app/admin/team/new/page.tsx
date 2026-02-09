"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createTeamMember, getTeamMembers } from "@/lib/firestore";
import { TeamMember } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiImage, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewTeamMember() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePath, setImagePath] = useState<string>("");
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        bio: "",
        image: "",
        skills: "",
        linkedin: "",
        twitter: "",
        github: "",
        facebook: "",
        dribbble: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get current team count for order assignment
            const existingMembers = await getTeamMembers();
            const nextOrder = existingMembers.length;

            const memberData: Omit<TeamMember, "id"> = {
                name: formData.name,
                position: formData.position,
                bio: formData.bio,
                image: formData.image,
                skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
                order: nextOrder, // Auto-assign order (last position)
                social: {
                    linkedin: formData.linkedin || undefined,
                    twitter: formData.twitter || undefined,
                    github: formData.github || undefined,
                    facebook: formData.facebook || undefined,
                    dribbble: formData.dribbble || undefined,
                },
            };

            await createTeamMember(memberData);
            toast.success("Team member added successfully!");
            router.push("/admin/team");
        } catch (error) {
            console.error("Error creating team member:", error);
            toast.error("Failed to add team member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/team"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Add Team Member</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Full name"
                            />
                        </div>

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Job title"
                            />
                        </div>
                    </div>

                    {/* Bio - Rich Text Editor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                        <RichTextEditor
                            value={formData.bio}
                            onChange={(value) => setFormData({ ...formData, bio: value })}
                            placeholder="Write a detailed bio for this team member..."
                            minHeight="200px"
                        />
                    </div>

                    {/* Profile Photo Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Profile Photo *
                        </label>

                        {/* Image Input Mode Toggle */}
                        <div className="flex gap-2 mb-4">
                            <button
                                type="button"
                                onClick={() => setImageInputMode("upload")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${imageInputMode === "upload"
                                    ? "bg-green-500 text-white"
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
                                    ? "bg-green-500 text-white"
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
                                folder="team"
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
                                    placeholder="https://example.com/photo.jpg"
                                />

                                {formData.image && (
                                    <div className="flex justify-center">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-900">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Team+Member&background=random&size=128";
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
                        <input
                            type="text"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="React, Node.js, TypeScript"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                    </div>

                    {/* Social Links Section */}
                    <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-lg font-medium text-white mb-4">Social Links</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter / X</label>
                                <input
                                    type="url"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://twitter.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                                <input
                                    type="url"
                                    value={formData.facebook}
                                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://facebook.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Dribbble</label>
                                <input
                                    type="url"
                                    value={formData.dribbble}
                                    onChange={(e) => setFormData({ ...formData, dribbble: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    placeholder="https://dribbble.com/username"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/team"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {loading ? "Saving..." : "Add Member"}
                    </button>
                </div>
            </form>
        </div>
    );
}
