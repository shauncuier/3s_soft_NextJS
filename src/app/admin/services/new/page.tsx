"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiImage, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewService() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePath, setImagePath] = useState<string>("");
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        shortDescription: "",
        fullDescription: "",
        icon: "",
        image: "",
        gradient: "from-blue-500 to-purple-600",
        seoTitle: "",
        seoDescription: "",
    });
    const [features, setFeatures] = useState<string[]>([""]);
    const [benefits, setBenefits] = useState<string[]>([""]);
    const [process, setProcess] = useState<{ step: string; description: string }[]>([
        { step: "", description: "" }
    ]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleAddFeature = () => setFeatures([...features, ""]);
    const handleRemoveFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const handleAddBenefit = () => setBenefits([...benefits, ""]);
    const handleRemoveBenefit = (index: number) => setBenefits(benefits.filter((_, i) => i !== index));
    const handleBenefitChange = (index: number, value: string) => {
        const newBenefits = [...benefits];
        newBenefits[index] = value;
        setBenefits(newBenefits);
    };

    const handleAddProcess = () => setProcess([...process, { step: "", description: "" }]);
    const handleRemoveProcess = (index: number) => setProcess(process.filter((_, i) => i !== index));
    const handleProcessChange = (index: number, field: "step" | "description", value: string) => {
        const newProcess = [...process];
        newProcess[index] = { ...newProcess[index], [field]: value };
        setProcess(newProcess);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const servicesRef = collection(db, "services");
            await addDoc(servicesRef, {
                ...formData,
                features: features.filter(Boolean),
                benefits: benefits.filter(Boolean),
                process: process.filter(p => p.step || p.description),
            });
            toast.success("Service added successfully!");
            router.push("/admin/services");
        } catch (error) {
            console.error("Error creating service:", error);
            toast.error("Failed to add service");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/services"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Add New Service</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-2">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="Service title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Icon (React Icon Name) *</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                placeholder="e.g., FiCode"
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
                            <label className="block text-sm font-medium text-gray-300 mb-2">Gradient</label>
                            <input
                                type="text"
                                value={formData.gradient}
                                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
                        <textarea
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            required
                            rows={2}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="Brief summary..."
                        />
                    </div>

                    {/* Full Description - Rich Text Editor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Description *</label>
                        <RichTextEditor
                            value={formData.fullDescription}
                            onChange={(value) => setFormData({ ...formData, fullDescription: value })}
                            placeholder="Detailed service explanation with rich formatting..."
                            minHeight="300px"
                        />
                    </div>

                    {/* Service Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Service Image
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
                                folder="services"
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
                                    placeholder="https://example.com/service-image.jpg"
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
                </div>

                {/* Features & Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Features</h2>
                            <button
                                type="button"
                                onClick={handleAddFeature}
                                className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                            >
                                <FiPlus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                        placeholder={`Feature ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFeature(index)}
                                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Benefits</h2>
                            <button
                                type="button"
                                onClick={handleAddBenefit}
                                className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                            >
                                <FiPlus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={benefit}
                                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                                        className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                        placeholder={`Benefit ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveBenefit(index)}
                                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Development Process */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-white">Work Process</h2>
                            <p className="text-sm text-gray-400">Define the steps for this service</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleAddProcess}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors"
                        >
                            <FiPlus className="w-4 h-4" /> Add Step
                        </button>
                    </div>

                    <div className="space-y-4">
                        {process.map((step, index) => (
                            <div key={index} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Step {index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProcess(index)}
                                        className="text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        value={step.step}
                                        onChange={(e) => handleProcessChange(index, "step", e.target.value)}
                                        className="md:col-span-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                        placeholder="Step Name (e.g. Planning)"
                                    />
                                    <input
                                        type="text"
                                        value={step.description}
                                        onChange={(e) => handleProcessChange(index, "description", e.target.value)}
                                        className="md:col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                        placeholder="Detailed description of this step..."
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-2">SEO Settings</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Meta Title</label>
                        <input
                            type="text"
                            value={formData.seoTitle}
                            onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="SEO Optimized Title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
                        <textarea
                            value={formData.seoDescription}
                            onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            placeholder="SEO Meta Description"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/services"
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
                        {loading ? "Adding..." : "Add Service"}
                    </button>
                </div>
            </form>
        </div>
    );
}
