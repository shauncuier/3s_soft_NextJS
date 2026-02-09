"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase.config";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { Testimonial } from "@/types/firestore";
import Link from "next/link";
import { FiTrash2, FiStar, FiPlus, FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = async () => {
        try {
            const testimonialsRef = collection(db, "testimonials");
            const q = query(testimonialsRef, orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Testimonial[];
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            toast.error("Failed to load testimonials");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await deleteDoc(doc(db, "testimonials", id));
            setTestimonials(testimonials.filter(t => t.id !== id));
            toast.success("Testimonial deleted successfully");
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            toast.error("Failed to delete testimonial");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                <div className="flex items-center gap-4">
                    <p className="text-gray-400">{testimonials.length} reviews found</p>
                    <Link
                        href="/admin/testimonials/new"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        <FiPlus className="w-5 h-5" />
                        Add Review
                    </Link>
                </div>
            </div>

            {testimonials.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-400 mb-4">No testimonials found. Try adding one or running the migration tool in the Dashboard.</p>
                    <Link
                        href="/admin/testimonials/new"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Add your first review →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-4 h-4 ${i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm italic mb-4">"{t.testimonial}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                                        {t.image ? (
                                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-xs">
                                                {t.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                        <p className="text-gray-400 text-xs">{t.position} at {t.company}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-700 flex justify-end gap-2">
                                <Link
                                    href={`/admin/testimonials/${t.id}`}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                >
                                    <FiEdit className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => t.id && handleDelete(t.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
