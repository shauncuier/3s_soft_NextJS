import Link from "next/link";
import { Metadata } from "next";
import { getServices, getServiceBySlug } from "@/lib/firestore";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";
import { FaArrowLeft, FaCheckCircle, FaCode, FaWordpress, FaShoppingCart, FaBullseye, FaSearch, FaFacebook, FaPaintBrush, FaHeadphones } from "react-icons/fa";
import { notFound } from "next/navigation";
import StructuredData from "@/components/StructuredData";

interface PageParams {
    params: Promise<{ slug: string }>;
}

const iconMap: Record<string, any> = {
    FaCode,
    FaWordpress,
    FaShoppingCart,
    FaBullseye,
    FaSearch,
    FaFacebook,
    FaPaintBrush,
    FaHeadphones,
};

// Generate static params for all services
export async function generateStaticParams() {
    const services = await getServices();
    return services.map((service) => ({
        slug: service.slug,
    }));
}

// Generate metadata for each service
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        return {
            title: "Service Not Found",
        };
    }

    return {
        title: service.seoTitle,
        description: service.seoDescription,
        alternates: {
            canonical: `/services/${slug}`,
        },
        openGraph: {
            title: service.seoTitle,
            description: service.seoDescription,
            url: `https://3s-soft.com/services/${slug}`,
            type: "website",
        }
    };
}

export default async function ServiceDetails({ params }: PageParams) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const IconComponent = iconMap[service.icon] || FaCode;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.seoDescription,
        "provider": {
            "@type": "Organization",
            "name": "3S-SOFT",
            "url": "https://3s-soft.com"
        },
        "areaServed": ["US", "UK", "Global"],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": service.title,
            "itemListElement": service.features.map((feature) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": feature
                }
            }))
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen pt-24 pb-20 px-4">
            <StructuredData data={serviceSchema} id={`service-schema-${service.slug}`} />
            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/services"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
                >
                    <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to All Services
                </Link>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                    <div
                        className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shrink-0 shadow-2xl shadow-blue-500/20`}
                    >
                        <IconComponent className="h-10 w-10 md:h-16 md:w-16 text-white" />
                    </div>
                    <div>
                        <SectionLabel label="Service Details" />
                        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
                            {service.title}
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                            {service.shortDescription}
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Description */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-6 font-semibold">Service Overview</h2>
                        <div
                            className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed
                                prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400
                                prose-strong:text-white prose-ul:list-disc prose-ol:list-decimal"
                            dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                        />

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-white mb-6 font-semibold">
                                Key Features & Capability
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
                                    >
                                        <FaCheckCircle className="text-blue-500 mt-1 mr-3 shrink-0" />
                                        <span className="text-gray-200 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-xl">
                            <h3 className="text-xl font-bold text-white mb-4">
                                Ready to get started?
                            </h3>
                            <p className="text-gray-400 mb-8">
                                Take the next step towards digital excellence. Let&apos;s discuss how
                                our {service.title} can help your business grow.
                            </p>
                            <div className="space-y-4">
                                <Button
                                    label="Contact Us Now"
                                    href="/contact"
                                />
                                <p className="text-center text-sm text-gray-500">
                                    Free consultation and project audit included.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
