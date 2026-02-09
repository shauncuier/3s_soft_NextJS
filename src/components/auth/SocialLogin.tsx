"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export default function SocialLogin() {
    const { googleLogin, loading, setLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    const handleGoogleLogin = async () => {
        setLoading(true);

        try {
            const result = await googleLogin();
            const user = result.user;
            router.push(redirectTo);
            toast.success(`Welcome ${user.displayName} | You Login Successfully`);
        } catch (err) {
            const error = err as FirebaseError;
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center text-gray-400">Loading...</p>;
    }

    return (
        <div className="flex items-center justify-center">
            <button
                onClick={handleGoogleLogin}
                className="btn bg-white text-black border-[#e5e5e5] mt-5 w-3/4"
            >
                <FcGoogle size={20} />
                Login with Google
            </button>
        </div>
    );
}
