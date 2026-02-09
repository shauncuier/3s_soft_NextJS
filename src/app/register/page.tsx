"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SectionLabel from "@/components/SectionLabel";
import SocialLogin from "@/components/auth/SocialLogin";
import toast from "react-hot-toast";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

export default function Register() {
    const { registerUser, updateUser, setUser, loading, setLoading } = useAuth();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (!imageFile) return;

        const formData = new FormData();
        formData.append("image", imageFile);

        setUploading(true);
        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                formData
            );
            const url = res.data.data.display_url;
            setImageUrl(url);
        } catch (err) {
            console.error("Image upload failed:", err);
        }
        setUploading(false);
    };

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const regExLength = /.{6,}/;
        // Validate password
        if (!regExLength.test(password)) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            const result = await registerUser(email, password);
            const user = result.user;

            await updateUser({ displayName: name, photoURL: imageUrl ?? undefined });
            setUser({ ...user, displayName: name, photoURL: imageUrl } as User);
            toast.success("Account Create Successfully");
            router.push("/");
        } catch (err) {
            console.error("Caught error:", err);
            const error = err as FirebaseError;
            const code = error.code;
            let errMsg = error.message || "Registration failed";
            if (code === "auth/email-already-in-use") {
                errMsg = "Email already in use. Please log in.";
            }
            setError(errMsg);
            toast.error(errMsg);
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
            <div className="max-w-[1480px] min-h-screen mx-auto pt-30 pb-20">
                <div className="text-center mb-5">
                    <SectionLabel label={"Create Your Account in 3s-soft"} />
                </div>
                <div className="max-w-4xl mx-auto bg-black/20 border shadow-sm shadow-blue-200 rounded-2xl overflow-hidden">
                    <div className="flex">
                        <div className="flex-1 hidden sm:flex items-center justify-center relative">
                            <Image
                                src="/assets/register-image.jpg"
                                alt="3s-Soft Account Registration Illustration"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 py-10 px-5">
                            <div className="mb-5">
                                <div className="flex gap-2 items-center mb-5">
                                    <Image
                                        src="/assets/logo.jpg"
                                        alt="3s-Soft Official Brand Logo"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-lg font-medium">3S-SOFT</h3>
                                </div>
                                <h4 className="text-3xl font-bold">Welcome 3S-SOFT</h4>
                                <p className="mt-1 text-sm text-gray-400">
                                    Please enter your details . . .
                                </p>
                            </div>
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label className="text-sm font-semibold">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="input mt-1 bg-white/20 w-full"
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input mt-1 bg-white/20 w-full"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="text-sm font-semibold">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="input mt-1 bg-white/20 w-full"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                <div className="mb-8">
                                    <label className="text-sm font-semibold">
                                        Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="image"
                                        onChange={handleImageUpload}
                                        className="file-input mt-1 bg-white/20 w-full"
                                    />
                                    {uploading && (
                                        <p className="text-sm text-blue-400 mt-2">Uploading...</p>
                                    )}
                                    {imageUrl && (
                                        <Image
                                            src={imageUrl}
                                            alt="Uploaded"
                                            width={80}
                                            height={80}
                                            className="mt-3 object-cover rounded-full"
                                        />
                                    )}
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="text-sm font-medium py-4 w-full sm:w-3/4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-sm hover:from-blue-700 hover:to-blue-800 transition duration-300 transform hover:scale-105 cursor-pointer"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="divider mb-0">OR</div>
                            <SocialLogin />
                            <div className="flex items-center justify-center mt-5">
                                <p className="text-sm">
                                    Already have an Account?{" "}
                                    <Link href={"/login"} className="font-medium text-blue-400">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
