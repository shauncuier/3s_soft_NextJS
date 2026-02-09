"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to console in development
        console.error("Application error:", error);

        // TODO: Send error to error tracking service (e.g., Sentry)
        // logErrorToService(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <div className="flex flex-col items-center text-center">
                    {/* Error Icon */}
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
                        <FiAlertTriangle className="w-10 h-10 text-red-500" />
                    </div>

                    {/* Error Title */}
                    <h1 className="text-3xl font-bold text-white mb-3">
                        Oops! Something went wrong
                    </h1>

                    {/* Error Description */}
                    <p className="text-gray-400 mb-6">
                        We encountered an unexpected error. Don&apos;t worry, our team has been notified and we&apos;re working on it.
                    </p>

                    {/* Error Details (Development Only) */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="w-full bg-gray-900 rounded-lg p-4 mb-6 text-left">
                            <p className="text-xs text-red-400 font-mono break-all">
                                {error.message}
                            </p>
                            {error.digest && (
                                <p className="text-xs text-gray-500 mt-2">
                                    Error ID: {error.digest}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button
                            onClick={reset}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <FiRefreshCw className="w-5 h-5" />
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            <FiHome className="w-5 h-5" />
                            Go Home
                        </Link>
                    </div>

                    {/* Support Link */}
                    <p className="text-sm text-gray-500 mt-6">
                        Need help?{" "}
                        <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
