import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import SectionLabel from "@/components/SectionLabel";
import { FaExternalLinkAlt, FaArrowLeft, FaCheckCircle, FaTools } from "react-icons/fa";
import { getPortfolio, getPortfolioBySlug } from "@/lib/firestore";
import { notFound } from "next/navigation";
import StructuredData from "@/components/StructuredData";

interface PageParams {
    params: Promise<{ slug: string }>;
}

// Generate static params for all portfolio items
export async function generateStaticParams() {
    const data = await getPortfolio();
    return data.map((project) => ({
        slug: project.slug,
    }));
}

// Generate metadata for each portfolio item
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { slug } = await params;
    const project = await getPortfolioBySlug(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    const title = project.seo?.title || `${project.title} | 3S-SOFT Portfolio`;
    const description = project.seo?.description || project.description;

    return {
        title: title,
        description: description,
        alternates: {
            canonical: `/portfolio/${slug}`,
        },
        openGraph: {
            title: title,
            description: description,
            images: [project.image],
            url: `https://3s-soft.com/portfolio/${slug}`,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [project.image],
        }
    };
}

export default async function PortfolioDetails({ params }: PageParams) {
    const { slug } = await params;
    const project = await getPortfolioBySlug(slug);

    if (!project) {
        notFound();
    }

    const projectSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "author": {
            "@type": "Organization",
            "name": "3S-SOFT",
            "url": "https://3s-soft.com"
        },
        "description": project.description,
        "image": project.image,
        "url": `https://3s-soft.com/portfolio/${slug}`,
        "screenshot": project.image,
        "softwareHelp": "https://3s-soft.com/contact"
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <StructuredData data={projectSchema} id={`project-schema-${project.slug}`} />
            {/* Project Hero */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="100vw"
                        className="object-cover opacity-30 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-[1480px] mx-auto px-5 w-full">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-8 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>
                    <SectionLabel label={project.category} />
                    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white mb-6">
                        {project.title}
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-xl text-blue-400 font-medium">{project.client}</span>
                        <span className="text-gray-500 text-xl">|</span>
                        <span className="text-xl text-green-400 font-medium">{project.results}</span>
                    </div>
                </div>
            </section>

            {/* Project Details Content */}
            <section className="py-12 md:py-20 px-5">
                <div className="max-w-[1480px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
                    {/* Left Column: Description */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 font-semibold">Project Overview</h2>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {project.longDescription || project.description}
                            </p>
                        </div>

                        {project.scope && project.scope.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6 font-semibold">Execution Scope</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.scope.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-gray-300">
                                            <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action */}
                        {project.link && project.link !== "#" && (
                            <div className="pt-6">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Visit Live Project
                                    <FaExternalLinkAlt />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-12">
                        {/* Technologies */}
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-700">
                            <div className="flex items-center gap-3 mb-6">
                                <FaTools className="text-blue-500 text-2xl" />
                                <h3 className="text-xl font-bold text-white font-semibold">Technologies Used</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies?.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-gray-700 text-gray-200 text-sm font-medium rounded-xl border border-gray-600"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Client Info Card */}
                        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-3xl border border-blue-500/20">
                            <h3 className="text-white font-bold text-2xl mb-4">Ready for results like these?</h3>
                            <p className="text-blue-200/70 mb-8">
                                Let&apos;s collaborate on your next project and build something extraordinary together.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center py-4 bg-white text-blue-900 font-bold rounded-2xl hover:bg-blue-50 transition-colors"
                            >
                                Start a Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
