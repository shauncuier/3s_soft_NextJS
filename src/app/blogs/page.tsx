import Link from "next/link";
import Image from "next/image";
import SectionLabel from "@/components/SectionLabel";
import { FaUserEdit, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { getBlogs } from "@/lib/firestore";
import { Blog } from "@/types/firestore";

export const metadata = {
    title: "Expert Digital Insights | 3S-SOFT Blog",
    description:
        "Explore expert articles on MERN stack development, SEO audits, Amazon selling strategies, and digital transformation tips from the 3S-SOFT team.",
    alternates: {
        canonical: "/blogs",
    },
};

export default async function Blogs() {
    const blogs = await getBlogs(true);

    return (
        <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-colors duration-300 px-4">
            <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <SectionLabel label={"Read Our Blogs"} />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Expert Insights | Web Dev, SEO & Digital Strategy
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Discover insightful articles from our expert team. Learn practical
                        tips, explore fresh ideas, and stay inspired.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog: Blog) => (
                        <article
                            className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl flex flex-col overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2"
                            key={blog.id}
                        >
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-56">
                                <Image
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <span className="absolute bottom-4 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Blog Post
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Meta Info */}
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                                    <span className="flex items-center gap-1.5">
                                        <FaUserEdit className="text-blue-400" /> {blog.author}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FaCalendarAlt className="text-blue-400" />
                                        {blog.publishedAt?.toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                                    {blog.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                    {blog.excerpt || blog.content?.split("\n")[0]}
                                </p>

                                {/* Read More Button */}
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                                >
                                    Read Article <FaArrowRight className="text-xs" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
