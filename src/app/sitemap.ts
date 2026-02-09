import { MetadataRoute } from "next";
import { getServices, getPortfolio, getBlogs } from "@/lib/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://3s-soft.com";

    const [services, portfolio, blogs] = await Promise.all([
        getServices(),
        getPortfolio(),
        getBlogs(true)
    ]);

    // Static pages
    const staticPages = [
        "",
        "/about-us",
        "/services",
        "/portfolio",
        "/blogs",
        "/team",
        "/contact",
        "/privacy-policy",
        "/terms-of-service",
        "/cookie-policy",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic service pages
    const servicePages = services.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Dynamic portfolio pages
    const portfolioPages = portfolio.map((item) => ({
        url: `${baseUrl}/portfolio/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Dynamic blog pages
    const blogPages = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...servicePages, ...portfolioPages, ...blogPages];
}
