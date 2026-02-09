export default function BlogsLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
            <div className="container mx-auto px-6">
                {/* Header Skeleton */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="h-12 bg-gray-700 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
                    <div className="h-6 bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
                </div>

                {/* Blog Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 animate-pulse">
                            {/* Image Skeleton */}
                            <div className="h-48 bg-gray-700" />

                            {/* Content Skeleton */}
                            <div className="p-6 space-y-4">
                                <div className="h-4 bg-gray-700 rounded w-24" />
                                <div className="h-6 bg-gray-700 rounded w-full" />
                                <div className="h-4 bg-gray-700 rounded w-full" />
                                <div className="h-4 bg-gray-700 rounded w-3/4" />

                                <div className="flex items-center gap-4 pt-4">
                                    <div className="h-4 bg-gray-700 rounded w-20" />
                                    <div className="h-4 bg-gray-700 rounded w-16" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
