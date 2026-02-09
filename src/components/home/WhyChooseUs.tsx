"use client";

import SectionLabel from "@/components/SectionLabel";
import {
    FaAward,
    FaCheckCircle,
    FaGlobe,
    FaHeart,
    FaUsers,
} from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";
import CountUp from "react-countup";

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: FaAward,
            title: "Proven Expertise",
            description:
                "Multiple industries experience with cutting-edge technologies and best practices.",
        },
        {
            icon: FaUsers,
            title: "Personalized Service",
            description:
                "One-on-one attention with dedicated project managers for every client.",
        },
        {
            icon: FaGlobe,
            title: "Transparent Communication",
            description:
                "Clear project updates, honest timelines, and open communication channels.",
        },
        {
            icon: FaCheckCircle,
            title: "On-Time Delivery",
            description:
                "Consistent track record of delivering projects on schedule without compromising quality.",
        },
        {
            icon: BiTrendingUp,
            title: "Affordable Pricing",
            description:
                "Competitive rates with guaranteed quality and no hidden costs or surprises.",
        },
        {
            icon: FaHeart,
            title: "Client Success Focus",
            description:
                "Your success is our priority - we go above and beyond to ensure your satisfaction.",
        },
    ];
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300 py-20 px-5">
            <section className="max-w-[1480px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center">
                    <SectionLabel label={"Why Clients Choose 3S-SOFT"} />
                    <h2 className="text-4xl sm:text-5xl font-bold">Your Trusted Digital Partner</h2>
                    <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-300">
                        We&apos;re more than just a service provider — we&apos;re your strategic
                        partner in digital success. Here&apos;s why businesses choose 3S-SOFT for
                        their growth journey.
                    </p>
                </div>
                {/* Reasons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-15">
                    {reasons.map((reason, index) => {
                        const IconComponent = reason.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                                    {reason.title}
                                </h3>

                                <p className="text-gray-300 leading-relaxed">
                                    {reason.description}
                                </p>

                                {/* Check Mark */}
                                <div className="mt-6 flex items-center text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <FaCheckCircle className="h-5 w-5 mr-2" />
                                    <span className="text-sm font-medium">Guaranteed</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-700">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Our Track Record Speaks for Itself
                        </h3>
                        <p className="text-gray-300 max-w-2xl mx-auto">
                            Numbers don&apos;t lie — here&apos;s what we&apos;ve achieved together with our
                            amazing clients.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                <CountUp end={500} enableScrollSpy />+
                            </div>
                            <div className="text-gray-300 font-medium">
                                Projects Completed
                            </div>
                            <div className="text-sm text-gray-400 mt-1">
                                Across all industries
                            </div>
                        </div>

                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                <CountUp end={98} enableScrollSpy />%
                            </div>
                            <div className="text-gray-300 font-medium">
                                Client Satisfaction
                            </div>
                            <div className="text-sm text-gray-400 mt-1">Average rating</div>
                        </div>

                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-rose-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                <CountUp end={5} enableScrollSpy />+
                            </div>
                            <div className="text-gray-300 font-medium">Years Experience</div>
                            <div className="text-sm text-gray-400 mt-1">In the industry</div>
                        </div>

                        <div className="text-center group">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                <CountUp end={24} enableScrollSpy />/
                                <CountUp end={7} enableScrollSpy />
                            </div>
                            <div className="text-gray-300 font-medium">Support Available</div>
                            <div className="text-sm text-gray-400 mt-1">
                                Always here for you
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyChooseUs;
