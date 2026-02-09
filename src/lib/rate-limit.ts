// Rate limiting utility using in-memory store
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

class RateLimiter {
    private requests: Map<string, RateLimitEntry> = new Map();
    private readonly windowMs: number;
    private readonly maxRequests: number;

    constructor(windowMs: number = 60000, maxRequests: number = 5) {
        this.windowMs = windowMs;
        this.maxRequests = maxRequests;

        // Clean up old entries every 5 minutes
        setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }

    check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
        const now = Date.now();
        const entry = this.requests.get(identifier);

        // No previous requests or window expired
        if (!entry || now > entry.resetTime) {
            const resetTime = now + this.windowMs;
            this.requests.set(identifier, { count: 1, resetTime });
            return { allowed: true, remaining: this.maxRequests - 1, resetTime };
        }

        // Within rate limit
        if (entry.count < this.maxRequests) {
            entry.count++;
            this.requests.set(identifier, entry);
            return { allowed: true, remaining: this.maxRequests - entry.count, resetTime: entry.resetTime };
        }

        // Rate limit exceeded
        return { allowed: false, remaining: 0, resetTime: entry.resetTime };
    }

    reset(identifier: string): void {
        this.requests.delete(identifier);
    }

    private cleanup(): void {
        const now = Date.now();
        for (const [key, entry] of this.requests.entries()) {
            if (now > entry.resetTime) {
                this.requests.delete(key);
            }
        }
    }
}

// Create rate limiter instances for different endpoints
export const contactFormLimiter = new RateLimiter(60000, 3); // 3 requests per minute
export const uploadLimiter = new RateLimiter(60000, 10); // 10 uploads per minute
export const apiLimiter = new RateLimiter(60000, 30); // 30 API calls per minute
export const authLimiter = new RateLimiter(900000, 5); // 5 login attempts per 15 minutes

// Helper function to get client identifier (IP address)
export function getClientIdentifier(request: Request): string {
    // Try to get real IP from headers (for proxies/load balancers)
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip"); // Cloudflare

    const ip = cfConnectingIp || realIp || forwarded?.split(",")[0] || "unknown";
    return ip.trim();
}

// Rate limit middleware for API routes
export async function rateLimit(
    request: Request,
    limiter: RateLimiter = apiLimiter
): Promise<Response | null> {
    const identifier = getClientIdentifier(request);
    const { allowed, remaining, resetTime } = limiter.check(identifier);

    if (!allowed) {
        const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
        return new Response(
            JSON.stringify({
                error: "Too many requests",
                message: "Rate limit exceeded. Please try again later.",
                retryAfter,
            }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": retryAfter.toString(),
                    "X-RateLimit-Limit": limiter["maxRequests"].toString(),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": new Date(resetTime).toISOString(),
                },
            }
        );
    }

    // Add rate limit headers to successful requests
    return null; // Null means request is allowed
}

// Helper to add rate limit headers to responses
export function addRateLimitHeaders(
    response: Response,
    limiter: RateLimiter,
    identifier: string
): Response {
    const entry = limiter["requests"].get(identifier);
    if (!entry) return response;

    const headers = new Headers(response.headers);
    headers.set("X-RateLimit-Limit", limiter["maxRequests"].toString());
    headers.set("X-RateLimit-Remaining", (limiter["maxRequests"] - entry.count).toString());
    headers.set("X-RateLimit-Reset", new Date(entry.resetTime).toISOString());

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}
