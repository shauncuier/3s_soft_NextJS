"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import { FiUpload, FiX, FiImage, FiCheck, FiAlertCircle } from "react-icons/fi";

interface ImageUploadProps {
    folder: "blogs" | "portfolio" | "team" | "testimonials" | "services";
    currentImageUrl?: string;
    onUploadComplete: (url: string, path: string) => void;
    onDelete?: () => void;
    maxSizeMB?: number;
    aspectRatio?: "square" | "landscape" | "portrait" | "any";
    className?: string;
    /** SEO-friendly name for the image (e.g., blog title, product name) */
    seoName?: string;
}

/**
 * Generates an SEO-friendly filename from text
 * Removes special characters, converts to lowercase, replaces spaces with hyphens
 */
function generateSeoFilename(text: string, folder: string, extension: string): string {
    if (!text || text.trim() === "") {
        // Fallback to timestamp if no SEO name provided
        return `${folder}-${Date.now()}.${extension}`;
    }

    const sanitized = text
        .toLowerCase()
        .trim()
        // Remove accents/diacritics
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        // Replace spaces and underscores with hyphens
        .replace(/[\s_]+/g, "-")
        // Remove special characters except hyphens
        .replace(/[^a-z0-9-]/g, "")
        // Remove consecutive hyphens
        .replace(/-+/g, "-")
        // Remove leading/trailing hyphens
        .replace(/^-|-$/g, "")
        // Limit length for URL friendliness
        .substring(0, 60);

    // Add timestamp suffix for uniqueness
    const timestamp = Date.now().toString(36);

    return `${sanitized}-${timestamp}.${extension}`;
}

/**
 * Gets file extension from file type
 */
function getExtensionFromType(mimeType: string): string {
    const typeMap: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "image/avif": "avif",
    };
    return typeMap[mimeType] || "jpg";
}

export default function ImageUpload({
    folder,
    currentImageUrl,
    onUploadComplete,
    onDelete,
    maxSizeMB = 5,
    aspectRatio = "any",
    className = "",
    seoName = "",
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Update preview when currentImageUrl changes
    useEffect(() => {
        if (currentImageUrl) {
            setPreview(currentImageUrl);
        }
    }, [currentImageUrl]);

    const validateFile = (file: File): string | null => {
        // Check file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
        if (!allowedTypes.includes(file.type)) {
            return "Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.";
        }

        // Check file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            return `File too large. Maximum size is ${maxSizeMB}MB.`;
        }

        return null;
    };

    const handleFile = async (file: File) => {
        setError(null);

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Generate SEO-friendly filename
        const extension = getExtensionFromType(file.type);
        const seoFilename = generateSeoFilename(seoName, folder, extension);

        // Upload file
        setUploading(true);
        setProgress(0);

        try {
            const formData = new FormData();

            // Create a new file with SEO-friendly name
            const renamedFile = new File([file], seoFilename, { type: file.type });
            formData.append("file", renamedFile);
            formData.append("folder", folder);
            formData.append("seoFilename", seoFilename);

            // Simulate progress (since fetch doesn't provide upload progress)
            const progressInterval = setInterval(() => {
                setProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Upload failed");
            }

            const data = await response.json();
            onUploadComplete(data.url, data.path);
            setPreview(data.url);
        } catch (err) {
            console.error("Upload error:", err);
            setError(err instanceof Error ? err.message : "Failed to upload image");
            setPreview(null);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDelete = () => {
        setPreview(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        if (onDelete) {
            onDelete();
        }
    };

    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case "square":
                return "aspect-square";
            case "landscape":
                return "aspect-video";
            case "portrait":
                return "aspect-[3/4]";
            default:
                return "aspect-video";
        }
    };

    return (
        <div className={`w-full ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleChange}
                className="hidden"
            />

            {!preview ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
                        ${getAspectRatioClass()}
                        border-2 border-dashed rounded-xl cursor-pointer
                        transition-all duration-200
                        flex flex-col items-center justify-center
                        ${dragActive
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700"
                        }
                    `}
                >
                    <FiUpload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-300 font-medium mb-2">
                        {dragActive ? "Drop image here" : "Click or drag image to upload"}
                    </p>
                    <p className="text-sm text-gray-500">
                        JPEG, PNG, WebP, or AVIF (max {maxSizeMB}MB)
                    </p>
                    {seoName && (
                        <p className="text-xs text-blue-400 mt-2">
                            📎 Will be saved as: {generateSeoFilename(seoName, folder, "jpg").replace(/-[a-z0-9]+\.jpg$/, "-*.jpg")}
                        </p>
                    )}
                </div>
            ) : (
                <div className="relative">
                    <div className={`${getAspectRatioClass()} relative rounded-xl overflow-hidden bg-gray-800`}>
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        {uploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                    <p className="text-white font-medium">{progress}%</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {!uploading && (
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                title="Replace image"
                            >
                                <FiImage className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                title="Remove image"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {!uploading && (
                        <div className="absolute bottom-2 left-2">
                            <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
                                <FiCheck className="w-4 h-4" />
                                Uploaded
                            </div>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="mt-3 flex items-start gap-2 bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                    <FiAlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}
