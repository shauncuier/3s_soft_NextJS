import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/login", "/register"],
            },
        ],
        sitemap: "https://3s-soft.com/sitemap.xml",
    };
}
