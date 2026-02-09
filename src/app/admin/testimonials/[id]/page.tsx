"use client";

import { useState, useEffect, FormEvent, use } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { updateTestimonial } from "@/lib/firestore";
import { Testimonial } from "@/types/firestore";
import Link from "next/link";
import { FiArrowLeft, FiSave, FiStar, FiImage, FiLink } from "react-icons/fi";
import toast from "react-hot-toast";
import ImageUpload from "@/components/ImageUpload";
import RichTextEditor from "@/components/RichTextEditor";

interface EditTestimonialPageProps {
    params: Promise<{ id: string }>;
}

export default function EditTestimonial({ params }: EditTestimonialPageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imagePath, setImagePath] = useState<string>("");
    const [imageInputMode, setImageInputMode] = useState<"upload" | "url">("upload");
    const [formData, setFormData] = useState({
        name: "", position: "", company: "", image: "", rating: 5, testimonial: "", project: "",
    });

    useEffect(() => {
        async function fetchTestimonial() {
            try {
                const docRef = doc(db, "testimonials", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as Testimonial;
                    setFormData({
                        name: data.name, position: data.position, company: data.company,
                        image: data.image, rating: data.rating, testimonial: data.testimonial,
                        project: data.project || "",
                    });
                    if (data.image && !data.image.includes("firebasestorage")) setImageInputMode("url");
                } else {
                    toast.error("Testimonial not found");
                    router.push("/admin/testimonials");
                }
            } catch (error) {
                console.error("Error fetching testimonial:", error);
                toast.error("Failed to load testimonial");
            } finally { setLoading(false); }
        }
        fetchTestimonial();
    }, [id, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateTestimonial(id, { ...formData, rating: Number(formData.rating) });
            toast.success("Testimonial updated successfully!");
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Error updating testimonial:", error);
            toast.error("Failed to update testimonial");
        } finally { setSaving(false); }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/testimonials" className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"><FiArrowLeft className="w-5 h-5" /></Link>
                <h1 className="text-3xl font-bold text-white">Edit Testimonial</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" /></div>
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Position *</label><input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Company *</label><input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" /></div>
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Associated Project</label><input type="text" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" /></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Rating *</label><div className="flex gap-2">{[1, 2, 3, 4, 5].map((star) => (<button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className={`p-2 rounded-lg ${star <= formData.rating ? "text-yellow-400" : "text-gray-600"}`}><FiStar className={`w-8 h-8 ${star <= formData.rating ? "fill-current" : ""}`} /></button>))}<span className="ml-4 text-gray-400 self-center">{formData.rating}/5</span></div></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Testimonial Content *</label><RichTextEditor value={formData.testimonial} onChange={(value) => setFormData({ ...formData, testimonial: value })} placeholder="Client's testimonial..." minHeight="200px" /></div>
                    <div><label className="block text-sm font-medium text-gray-300 mb-2">Client Photo</label>
                        <div className="flex gap-2 mb-4">
                            <button type="button" onClick={() => setImageInputMode("upload")} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${imageInputMode === "upload" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}><FiImage className="w-4 h-4" />Upload</button>
                            <button type="button" onClick={() => setImageInputMode("url")} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${imageInputMode === "url" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}><FiLink className="w-4 h-4" />URL</button>
                        </div>
                        {imageInputMode === "upload" && <ImageUpload folder="testimonials" currentImageUrl={formData.image} onUploadComplete={(url, path) => { setFormData({ ...formData, image: url }); setImagePath(path); }} onDelete={() => { setFormData({ ...formData, image: "" }); setImagePath(""); }} aspectRatio="square" seoName={formData.name} />}
                        {imageInputMode === "url" && <div className="space-y-4"><input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="https://example.com/photo.jpg" />{formData.image && <div className="flex justify-center"><div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600 bg-gray-900"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`; }} /></div></div>}</div>}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Link href="/admin/testimonials" className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600">Cancel</Link>
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"><FiSave className="w-5 h-5" />{saving ? "Saving..." : "Update"}</button>
                </div>
            </form>
        </div>
    );
}
