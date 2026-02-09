import { IconType } from "react-icons";
import { User, UserCredential } from "firebase/auth";

// Services
export interface Service {
    slug: string;
    icon: IconType;
    title: string;
    description: string;
    gradient: string;
    features: string[];
    fullContent: string;
    seoTitle: string;
    seoDescription: string;
}

// Blog
export interface Blog {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverImage: string;
    author: string;
    date: string;
    content: string;
    readTime?: string;
}

// Portfolio
export interface PortfolioItem {
    slug: string;
    title: string;
    category: string;
    image: string;
    description: string;
    client?: string;
    technologies?: string[];
    liveUrl?: string;
    features?: string[];
}

// Team
export interface TeamMember {
    name: string;
    role: string;
    image: string;
    bio: string;
    social?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
        facebook?: string;
    };
}

// Testimonial
export interface Testimonial {
    name: string;
    role: string;
    company: string;
    image: string;
    content: string;
    rating: number;
}

// Auth Context
export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    registerUser: (email: string, password: string) => Promise<UserCredential>;
    updateUser: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    googleLogin: () => Promise<UserCredential>;
    logoutUser: () => Promise<void>;
}

// Component Props
export interface PageTitleProps {
    title: string;
    subtitle?: string;
}

export interface ButtonProps {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export interface SectionLabelProps {
    label: string;
    className?: string;
}

// Page params for dynamic routes
export interface SlugParams {
    params: Promise<{ slug: string }>;
}
