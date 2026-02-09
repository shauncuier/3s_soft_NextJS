import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { getPortfolio } from "@/lib/firestore";
import PortfolioList from "@/components/portfolio/PortfolioList";

export const metadata = {
    title: "Our Work | 3S-SOFT Portfolio",
    description: "Explore our portfolio of successful digital solutions delivered to clients across the US, UK and beyond.",
};

// Force real-time data loading (no caching)
export const dynamic = "force-dynamic";

export default async function Portfolio() {
    const portfolio = await getPortfolio();

    return (
        <>
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-5">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-370 mx-auto relative z-10 text-center">
                    <SectionLabel label="Our Work" />
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Digital Projects That{" "}
                        <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Drive Success
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        From startups to enterprises, we&apos;ve helped businesses transform
                        their digital presence and achieve measurable success.
                    </p>
                </div>
            </section>

            {/* Portfolio List (Client Component handles filtering & search) */}
            <PortfolioList initialPortfolio={JSON.parse(JSON.stringify(portfolio))} />

            {/* CTA Section */}
            <section className="bg-linear-to-r from-blue-600 to-purple-700 py-20 px-5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Let&apos;s discuss how we can help transform your business with our
                        digital solutions.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Get Free Consultation
                    </Link>
                </div>
            </section>
        </>
    );
}
