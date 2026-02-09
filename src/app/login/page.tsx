"use client";

import React, { FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SectionLabel from "@/components/SectionLabel";
import SocialLogin from "@/components/auth/SocialLogin";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

export default function Login() {
    const { loginUser, loading, setLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/";

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            const result = await loginUser(email, password);
            const user = result.user;
            router.push(redirectTo);
            toast.success(`Welcome ${user.displayName} | You Login Successfully`);
        } catch (err) {
            const error = err as FirebaseError;
            const msg = error?.message || "Login failed due to unknown error";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <section className="bg-gray-900 transition-colors duration-300 px-4">
            <div className="max-w-[1480px] mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
                <div className="text-center mb-5">
                    <SectionLabel label={"Login in 3s-soft"} />
                </div>
                <div className="max-w-3xl mx-auto bg-black/20 border shadow-sm shadow-blue-200 rounded-2xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex-1 hidden sm:flex items-center justify-center relative h-96 sm:h-auto">
                            <Image
                                src="/assets/login-image.jpg"
                                alt="3s-Soft User Login Illustration"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 py-10 px-5">
                            <div className="mb-5">
                                <div className="flex gap-2 items-center mb-5">
                                    <Image
                                        src="/assets/logo.jpg"
                                        alt="3s-Soft Official Logo"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-lg font-medium">3S-SOFT</h3>
                                </div>
                                <h4 className="text-3xl font-bold">Welcome Back</h4>
                                <p className="mt-1 text-sm text-gray-400">
                                    Please enter your details . . .
                                </p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input focus:border focus:border-blue-500 outline-none focus:outline-none mt-1 bg-white/20 w-full"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label className="text-sm font-semibold">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="input focus:border focus:border-blue-500 outline-none focus:outline-none mt-1 bg-white/20 w-full"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="text-sm font-medium py-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 cursor-pointer"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <div className="divider mb-0">OR</div>
                            <SocialLogin />
                            <p className="text-sm text-center mt-5">
                                Don&apos;t have an Account?{" "}
                                <Link href={"/register"} className="font-medium text-blue-400">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
