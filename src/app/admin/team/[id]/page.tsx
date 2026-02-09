"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import { getTeamMembers, updateTeamMember } from "@/lib/firestore";
import { TeamMember } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiImage, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

interface EditTeamMemberPageProps {
    params: Promise<{ id: string }>;
}

export default function EditTeamMember({ params }: EditTeamMemberPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    useEffect(() => {
        async function fetchMember() {
            try {
                const members = await getTeamMembers();
                const member = members.find((m) => m.id === id);

                if (member) {
                    setFormData({
                        name: member.name,
                        position: member.position,
                        bio: member.bio,
                        image: member.image,
                        skills: member.skills.join(", "),
                        linkedin: member.social.linkedin || "",
                        twitter: member.social.twitter || "",
                        github: member.social.github || "",
                        facebook: member.social.facebook || "",
                        dribbble: member.social.dribbble || "",
                    });
                    // Detect if image URL is external or uploaded
                    if (member.image && !member.image.includes("firebasestorage")) {
                        setImageInputMode("url");
                    }
                } else {
                    toast.error("Team member not found");
                    router.push("/admin/team");
                }
            } catch (error) {
                console.error("Error fetching team member:", error);
                toast.error("Failed to load team member");
            } finally {
                setLoading(false);
            }
        }

        fetchMember();
    }, [id, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const memberData: Partial<TeamMember> = {
                name: formData.name,
                position: formData.position,
                bio: formData.bio,
                image: formData.image,
                skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
                social: {
                    linkedin: formData.linkedin || undefined,
                    twitter: formData.twitter || undefined,
                    github: formData.github || undefined,
                    facebook: formData.facebook || undefined,
                    dribbble: formData.dribbble || undefined,
                },
            };

            await updateTeamMember(id, memberData);
            toast.success("Team member updated successfully!");
            router.push("/admin/team");
        } catch (error) {
            console.error("Error updating team member:", error);
            toast.error("Failed to update team member");
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
                    href="/admin/team"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Team Member</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Position *</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Rich Text Editor for Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                        <RichTextEditor
                            value={formData.bio}
                            onChange={(value) => setFormData({ ...formData, bio: value })}
                            placeholder="Team member bio and background..."
                            minHeight="200px"
                        />
                    </div>

                    {/* Profile Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Profile Image
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
                                    placeholder="https://example.com/profile-photo.jpg"
                                />

                                {formData.image && (
                                    <div className="flex justify-center">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-900">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`;
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Skills (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="React, TypeScript, Node.js"
                        />
                    </div>

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
                                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
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

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/team"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                        <FiSave className="w-5 h-5" />
                        {saving ? "Saving..." : "Update Member"}
                    </button>
                </div>
            </form>
        </div>
    );
}
