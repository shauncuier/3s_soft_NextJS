// Input validation and sanitization utilities
// Implements best security practices for user input handling

// HTML sanitization - removes potentially dangerous HTML/script tags
export function sanitizeHtml(input: string): string {
    if (!input) return "";

    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
}

// SQL injection prevention - escape special characters
export function sanitizeSql(input: string): string {
    if (!input) return "";

    return input
        .replace(/'/g, "''")
        .replace(/;/g, "")
        .replace(/--/g, "")
        .replace(/\/\*/g, "")
        .replace(/\*\//g, "");
}

// Remove script tags and event handlers
export function removeScripts(input: string): string {
    if (!input) return "";

    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/data:text\/html/gi, "");
}

// Sanitize filename for safe storage
export function sanitizeFilename(filename: string): string {
    if (!filename) return "file";

    // Remove path traversal attempts
    const basename = filename.replace(/^.*[\\\/]/, "");

    // Remove dangerous characters
    return basename
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/\.{2,}/g, ".")
        .substring(0, 255); // Limit length
}

// Email validation with strict regex
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

// URL validation
export function isValidUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
    } catch {
        return false;
    }
}

// Phone number validation (international format)
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s()-]/g, ""));
}

// Slug validation (URL-safe)
export function isValidSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug) && slug.length <= 200;
}

// Sanitize text input (general purpose)
export function sanitizeText(input: string, maxLength: number = 1000): string {
    if (!input) return "";

    return removeScripts(input)
        .trim()
        .substring(0, maxLength);
}

// Validate and sanitize contact form data
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

export function validateContactForm(data: ContactFormData): {
    valid: boolean;
    errors: Record<string, string>;
    sanitized?: ContactFormData;
} {
    const errors: Record<string, string> = {};

    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        errors.name = "Name must be at least 2 characters";
    } else if (data.name.length > 100) {
        errors.name = "Name is too long (max 100 characters)";
    }

    // Validate email
    if (!data.email || !isValidEmail(data.email)) {
        errors.email = "Please provide a valid email address";
    }

    // Validate phone (optional but must be valid if provided)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.phone = "Please provide a valid phone number";
    }

    // Validate service
    const validServices = [
        "Web Development",
        "WordPress",
        "Product Listing",
        "Lead Generation",
        "Digital Marketing",
        "SEO",
        "Social Media",
        "Graphic Design",
        "Virtual Assistant",
        "Other"
    ];
    if (!data.service || !validServices.includes(data.service)) {
        errors.service = "Please select a valid service";
    }

    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters";
    } else if (data.message.length > 5000) {
        errors.message = "Message is too long (max 5000 characters)";
    }

    // Check for spam patterns
    const spamPatterns = [
        /\b(viagra|cialis|casino|lottery|prize)\b/i,
        /\b(click here|buy now|limited time)\b/i,
        /(http|https):\/\/.*\.(ru|cn|tk)/i, // Suspicious domains
    ];

    const combinedText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
    for (const pattern of spamPatterns) {
        if (pattern.test(combinedText)) {
            errors.message = "Your message contains suspicious content";
            break;
        }
    }

    if (Object.keys(errors).length > 0) {
        return { valid: false, errors };
    }

    // Sanitize all fields
    const sanitized: ContactFormData = {
        name: sanitizeText(data.name, 100),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.replace(/[\s()-]/g, ""),
        service: data.service,
        message: sanitizeText(data.message, 5000),
    };

    return { valid: true, errors: {}, sanitized };
}

// Validate image file
export function validateImageFile(file: File): {
    valid: boolean;
    error?: string;
} {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

    if (!allowedTypes.includes(file.type)) {
        return {
            valid: false,
            error: "Invalid file type. Only JPEG, PNG, WebP, and AVIF are allowed.",
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: `File too large. Maximum size is ${maxSize / 1024 / 1024}MB.`,
        };
    }

    // Check filename
    const sanitizedName = sanitizeFilename(file.name);
    if (sanitizedName !== file.name) {
        return {
            valid: false,
            error: "Invalid filename. Please use only letters, numbers, and basic punctuation.",
        };
    }

    return { valid: true };
}

// CSRF token generation and validation
export function generateCsrfToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
}

export function validateCsrfToken(token: string, sessionToken: string): boolean {
    if (!token || !sessionToken) return false;

    // Constant-time comparison to prevent timing attacks
    if (token.length !== sessionToken.length) return false;

    let result = 0;
    for (let i = 0; i < token.length; i++) {
        result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i);
    }

    return result === 0;
}

// Password strength validation
export function validatePasswordStrength(password: string): {
    valid: boolean;
    errors: string[];
    strength: "weak" | "medium" | "strong";
} {
    const errors: string[] = [];
    let strength: "weak" | "medium" | "strong" = "weak";

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        errors.push("Password must contain at least one special character");
    }

    // Calculate strength
    if (errors.length === 0) {
        if (password.length >= 12 && /[^a-zA-Z0-9]/.test(password)) {
            strength = "strong";
        } else {
            strength = "medium";
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        strength,
    };
}
