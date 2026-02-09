import { NextRequest, NextResponse } from "next/server";
import { validateImageFile } from "@/lib/validation";
import { uploadLimiter, rateLimit } from "@/lib/rate-limit";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import sharp from "sharp";

// Generate SEO-friendly filename
function generateFilename(originalName: string, folder: string): string {
    const ext = ".webp"; // Always convert to WebP for best compression
    const nameWithoutExt = path.basename(originalName, path.extname(originalName))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 50);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${nameWithoutExt}-${timestamp}-${random}${ext}`;
}

// Optimize image using sharp
async function optimizeImage(buffer: Buffer, originalType: string): Promise<Buffer> {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Resize if too large (max 1920px width)
    let pipeline = image;
    if (metadata.width && metadata.width > 1920) {
        pipeline = pipeline.resize(1920, null, {
            withoutEnlargement: true,
            fit: "inside",
        });
    }

    // Convert to WebP with good quality and compression
    return pipeline
        .webp({
            quality: 80,
            effort: 4, // Compression effort (0-6, higher = smaller file but slower)
        })
        .toBuffer();
}

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

        // Get file buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Log original size
        const originalSize = buffer.length;

        // Optimize image
        const optimizedBuffer = await optimizeImage(buffer, file.type);
        const optimizedSize = optimizedBuffer.length;

        console.log(`Image optimized: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${((1 - optimizedSize / originalSize) * 100).toFixed(0)}% reduction)`);

        // Generate optimized filename (WebP)
        const filename = generateFilename(file.name, folder);

        // Create upload directory path
        const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true });

        // Write optimized file to disk
        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, optimizedBuffer);

        // Generate public URL
        const url = `/uploads/${folder}/${filename}`;
        const storagePath = `uploads/${folder}/${filename}`;

        return NextResponse.json({
            success: true,
            url,
            path: storagePath,
            message: "Image uploaded and optimized successfully",
            originalSize: `${(originalSize / 1024).toFixed(1)}KB`,
            optimizedSize: `${(optimizedSize / 1024).toFixed(1)}KB`,
        });
    } catch (error) {
        console.error("Upload API error:", error);

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
        const imagePath = searchParams.get("path");

        if (!imagePath) {
            return NextResponse.json(
                { error: "No path provided" },
                { status: 400 }
            );
        }

        // Security: Ensure path is within allowed folders
        const allowedFolders = ["uploads/blogs/", "uploads/portfolio/", "uploads/team/", "uploads/testimonials/", "uploads/services/"];
        const isAllowed = allowedFolders.some(folder => imagePath.startsWith(folder));

        if (!isAllowed) {
            return NextResponse.json(
                { error: "Invalid path" },
                { status: 403 }
            );
        }

        // Delete file from disk
        const fullPath = path.join(process.cwd(), "public", imagePath);
        await unlink(fullPath);

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
