"use client";

import { useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log critical error
        console.error("Critical application error:", error);

        // TODO: Send to error tracking service
        // logCriticalError(error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
                    <div className="max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiAlertTriangle className="w-10 h-10 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-3">
                            Critical Error
                        </h1>
                        <p className="text-gray-400 mb-6">
                            A critical error occurred. Please refresh the page or contact support if the problem persists.
                        </p>
                        <button
                            onClick={reset}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
