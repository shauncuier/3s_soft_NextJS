/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features for Next.js 16
    experimental: {
        optimizeCss: true,
    },

    // Image optimization
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.freepik.com",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "3s-soft.com",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },

    // Enable compression
    compress: true,

    // Optimize bundle
    poweredByHeader: false,

    // Security headers for better SEO and security
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
