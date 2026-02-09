import { FiLoader } from "react-icons/fi";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
            <div className="text-center">
                <FiLoader className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
                <p className="text-white text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
}
