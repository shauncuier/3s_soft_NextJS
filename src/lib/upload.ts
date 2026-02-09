// Secure image upload utilities with Firebase Storage
import { storage } from "@/firebase/firebase.config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { sanitizeFilename } from "./validation";

// Image compression using browser Canvas API
export async function compressImage(
    file: File,
    maxWidth: number = 1920,
    maxHeight: number = 1080,
    quality: number = 0.85
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement("canvas");
                let { width, height } = img;

                // Calculate new dimensions while maintaining aspect ratio
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Failed to get canvas context"));
                    return;
                }

                // Draw and compress
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error("Failed to compress image"));
                        }
                    },
                    file.type,
                    quality
                );
            };

            img.onerror = () => reject(new Error("Failed to load image"));
            img.src = e.target?.result as string;
        };

        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
    });
}

// Generate secure filename with timestamp
export function generateSecureFilename(originalFilename: string): string {
    const sanitized = sanitizeFilename(originalFilename);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = sanitized.split(".").pop() || "jpg";
    const nameWithoutExt = sanitized.replace(/\.[^/.]+$/, "");

    return `${nameWithoutExt}_${timestamp}_${random}.${extension}`;
}

// Upload image to Firebase Storage
export async function uploadImageToStorage(
    file: File,
    folder: "blogs" | "portfolio" | "team" | "testimonials" | "services",
    compress: boolean = true
): Promise<{ url: string; path: string }> {
    try {
        // Validate file
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
        if (!allowedTypes.includes(file.type)) {
            throw new Error("Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.");
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error("File too large. Maximum size is 5MB.");
        }

        // Compress image if needed
        let uploadFile: Blob = file;
        if (compress && file.size > 500 * 1024) { // Compress if larger than 500KB
            uploadFile = await compressImage(file);
        }

        // Generate secure filename
        const filename = generateSecureFilename(file.name);
        const storagePath = `${folder}/${filename}`;

        // Create storage reference
        const storageRef = ref(storage, storagePath);

        // Set metadata for security
        const metadata = {
            contentType: file.type,
            customMetadata: {
                uploadedAt: new Date().toISOString(),
                originalName: sanitizeFilename(file.name),
            },
        };

        // Upload file
        await uploadBytes(storageRef, uploadFile, metadata);

        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);

        return {
            url: downloadURL,
            path: storagePath,
        };
    } catch (error) {
        console.error("Upload error:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to upload image");
    }
}

// Delete image from Firebase Storage
export async function deleteImageFromStorage(path: string): Promise<void> {
    try {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    } catch (error) {
        console.error("Delete error:", error);
        throw new Error("Failed to delete image");
    }
}

// Extract storage path from Firebase URL
export function extractStoragePath(url: string): string | null {
    try {
        const urlObj = new URL(url);

        // Handle Firebase Storage URLs
        if (urlObj.hostname.includes("firebasestorage.googleapis.com")) {
            const pathMatch = urlObj.pathname.match(/\/o\/(.+?)\?/);
            if (pathMatch) {
                return decodeURIComponent(pathMatch[1]);
            }
        }

        return null;
    } catch {
        return null;
    }
}

// Validate image dimensions
export async function validateImageDimensions(
    file: File,
    minWidth?: number,
    minHeight?: number,
    maxWidth?: number,
    maxHeight?: number
): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const { width, height } = img;

                if (minWidth && width < minWidth) {
                    resolve({
                        valid: false,
                        error: `Image width must be at least ${minWidth}px`,
                        dimensions: { width, height },
                    });
                    return;
                }

                if (minHeight && height < minHeight) {
                    resolve({
                        valid: false,
                        error: `Image height must be at least ${minHeight}px`,
                        dimensions: { width, height },
                    });
                    return;
                }

                if (maxWidth && width > maxWidth) {
                    resolve({
                        valid: false,
                        error: `Image width must not exceed ${maxWidth}px`,
                        dimensions: { width, height },
                    });
                    return;
                }

                if (maxHeight && height > maxHeight) {
                    resolve({
                        valid: false,
                        error: `Image height must not exceed ${maxHeight}px`,
                        dimensions: { width, height },
                    });
                    return;
                }

                resolve({ valid: true, dimensions: { width, height } });
            };

            img.onerror = () => {
                resolve({ valid: false, error: "Failed to load image" });
            };

            img.src = e.target?.result as string;
        };

        reader.onerror = () => {
            resolve({ valid: false, error: "Failed to read file" });
        };

        reader.readAsDataURL(file);
    });
}
