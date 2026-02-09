import Link from "next/link";
import Button from "@/components/Button";

export const metadata = {
    title: "404 - Page Not Found | 3S-SOFT",
    description: "The page you are looking for could not be found.",
};

export default function NotFound() {
    return (
        <section className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button label="Go Back Home" href="/" />
                    <Link
                        href="/contact"
                        className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-semibold border border-white/20 cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105 text-white"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
}
