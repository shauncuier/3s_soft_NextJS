import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { getServices } from "@/lib/firestore";
import {
    FaCode,
    FaWordpress,
    FaShoppingCart,
    FaBullseye,
    FaSearch,
    FaFacebook,
    FaPaintBrush,
    FaHeadphones,
} from "react-icons/fa";

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

const ServicesSection = async () => {
    const services = await getServices();

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300 py-20 px-5">
            <section className="max-w-[1480px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center">
                    <SectionLabel label={"Our Core Services"} />
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Expert Digital Solutions for Global Success
                    </h2>
                    <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-300">
                        We deliver result-driven MERN stack development, eCommerce optimization, and strategic SEO services tailored for startups and established brands in the US, UK, and worldwide.
                    </p>
                </div>
                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-15">
                    {services.map((service, index) => {
                        const IconComponent = iconMap[service.icon] || FaCode;
                        return (
                            <Link key={index} href={`/services/${service.slug}`}>
                                <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden relative h-full">
                                    {/* Icon Header */}
                                    <div className="p-6 pb-0 flex flex-col items-center">
                                        <div
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient || 'from-blue-500 to-purple-600'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 text-center">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div
                                        className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${service.gradient || 'from-blue-500 to-purple-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                    ></div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default ServicesSection;
