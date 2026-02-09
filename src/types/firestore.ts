// Firestore Types
export interface Blog {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    author: string;
    tags: string[];
    readTime: string;
    createdAt: Date;
    publishedAt: Date;
    published: boolean;
}

export interface PortfolioItem {
    id?: string;
    title: string;
    slug: string;
    category: string;
    client: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    link: string;
    featured: boolean;
    results: string;
    scope: string[];
    seo?: {
        title: string;
        description: string;
    };
}

export interface TeamMember {
    id?: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    skills: string[];
    order?: number; // For managing display sequence
    social: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        facebook?: string;
        dribbble?: string;
    };
}

export interface ContactSubmission {
    id?: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    createdAt: Date;
    status: "new" | "read" | "replied";
}

export interface Service {
    id?: string;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
    features: string[];
    benefits: string[];
    process: { step: string; description: string }[];
    gradient?: string;
    seoTitle?: string;
    seoDescription?: string;
}

// Admin whitelist - add your email here
export const ADMIN_EMAILS = [
    "admin@3s-soft.com",
    "3ssoft.bd@gmail.com",
];

export interface Testimonial {
    id?: string;
    name: string;
    position: string;
    company: string;
    image: string;
    rating: number;
    testimonial: string;
    project: string;
    createdAt: Date;
}
