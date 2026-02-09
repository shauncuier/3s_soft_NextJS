"use client";

import { useEffect, useState } from "react";
import { getServices } from "@/lib/firestore";
import { Service } from "@/types/firestore";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { db } from "@/firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        try {
            const data = await getServices();
            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
            toast.error("Failed to load services");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            await deleteDoc(doc(db, "services", id));
            setServices(services.filter((s) => s.id !== id));
            toast.success("Service deleted successfully");
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error("Failed to delete service");
        }
    }

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
                <h1 className="text-3xl font-bold text-white">Services</h1>
                <Link
                    href="/admin/services/new"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    New Service
                </Link>
            </div>

            {services.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-400 mb-4">No services in database yet</p>
                    <Link
                        href="/admin/services/new"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Add your first service →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/admin/services/${service.id}`}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                        >
                                            <FiEdit className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => service.id && handleDelete(service.id)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                        >
                                            <FiTrash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.shortDescription}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                        /{service.slug}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
