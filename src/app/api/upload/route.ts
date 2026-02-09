import { NextRequest, NextResponse } from "next/server";
import { uploadImageToStorage } from "@/lib/upload";
import { validateImageFile } from "@/lib/validation";
import { uploadLimiter, getClientIdentifier, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
    try {
        // Apply rate limiting
        const rateLimitResponse = await rateLimit(request, uploadLimiter);
        if (rateLimitResponse) {
            return rateLimitResponse;
        }

        // Get form data
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as "blogs" | "portfolio" | "team" | "testimonials" | "services";

        // Validate inputs
        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const validFolders = ["blogs", "portfolio", "team", "testimonials", "services"];
        if (!folder || !validFolders.includes(folder)) {
            return NextResponse.json(
                { error: "Invalid folder specified" },
                { status: 400 }
            );
        }

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        console.log("Upload attempt:", {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            folder,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        });

        // Upload to Firebase Storage (compression disabled - uses browser APIs)
        const { url, path } = await uploadImageToStorage(file, folder, false);

        console.log("Upload success:", { url, path });

        return NextResponse.json({
            success: true,
            url,
            path,
            message: "Image uploaded successfully",
        });
    } catch (error) {
        console.error("Upload API error:", error);
        console.error("Error stack:", error instanceof Error ? error.stack : "No stack");

        return NextResponse.json(
            {
                error: "Failed to upload image",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

// DELETE endpoint to remove images
export async function DELETE(request: NextRequest) {
    try {
        // Apply rate limiting
        const rateLimitResponse = await rateLimit(request, uploadLimiter);
        if (rateLimitResponse) {
            return rateLimitResponse;
        }

        const { searchParams } = new URL(request.url);
        const path = searchParams.get("path");

        if (!path) {
            return NextResponse.json(
                { error: "No path provided" },
                { status: 400 }
            );
        }

        // Security: Ensure path is within allowed folders
        const allowedFolders = ["blogs/", "portfolio/", "team/", "testimonials/", "services/"];
        const isAllowed = allowedFolders.some(folder => path.startsWith(folder));

        if (!isAllowed) {
            return NextResponse.json(
                { error: "Invalid path" },
                { status: 403 }
            );
        }

        // Delete from Firebase Storage
        const { deleteImageFromStorage } = await import("@/lib/upload");
        await deleteImageFromStorage(path);

        return NextResponse.json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (error) {
        console.error("Delete API error:", error);

        return NextResponse.json(
            {
                error: "Failed to delete image",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
