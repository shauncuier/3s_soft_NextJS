export default function PortfolioLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
            <div className="container mx-auto px-6">
                {/* Header Skeleton */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="h-12 bg-gray-700 rounded-lg w-72 mx-auto mb-4 animate-pulse" />
                    <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
                </div>

                {/* Filter Tabs Skeleton */}
                <div className="flex justify-center gap-4 mb-12">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 bg-gray-700 rounded-lg w-32 animate-pulse" />
                    ))}
                </div>

                {/* Portfolio Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse">
                            {/* Image Skeleton */}
                            <div className="h-64 bg-gray-700" />

                            {/* Content Skeleton */}
                            <div className="p-6 space-y-3">
                                <div className="h-4 bg-gray-700 rounded w-20" />
                                <div className="h-6 bg-gray-700 rounded w-full" />
                                <div className="h-4 bg-gray-700 rounded w-full" />
                                <div className="h-4 bg-gray-700 rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
