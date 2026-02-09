import SectionLabel from "@/components/SectionLabel";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { getPortfolio } from "@/lib/firestore";
import PortfolioGallery from "./PortfolioGallery";

const PortfolioSection = async () => {
    const portfolio = await getPortfolio();

    // Extract unique categories
    const categories = ["All", ...Array.from(new Set(portfolio.map(item => item.category)))];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 px-5 transition-colors duration-300">
            <section className="max-w-[1480px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <SectionLabel label="Our Portfolio" />
                    <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                        Our Recent{" "}
                        <span className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-600 dark:text-gray-300">
                        Explore our portfolio of successful digital solutions delivered to
                        clients across the US, UK and beyond.
                    </p>
                </div>

                {/* Portfolio Gallery (Client Component) */}
                <PortfolioGallery
                    initialPortfolio={JSON.parse(JSON.stringify(portfolio))}
                    categories={categories}
                />

                {/* View All Button */}
                <div className="flex justify-center mt-12">
                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        View All Projects
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PortfolioSection;
