import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import { BsShieldLock } from "react-icons/bs";
import { SlScreenSmartphone } from "react-icons/sl";
import { GoGlobe } from "react-icons/go";
import { LuPalette, LuZap, LuUsers } from "react-icons/lu";
import { FaAward, FaRegClock } from "react-icons/fa";

const features = [
    {
        icon: SlScreenSmartphone,
        title: "Fully Responsive",
        description:
            "Perfect experience on mobile, tablet & desktop devices with adaptive layouts.",
        color: "text-blue-500",
    },
    {
        icon: LuPalette,
        title: "Light & Dark Themes",
        description:
            "Beautiful design systems with both light and dark mode support for user preference.",
        color: "text-purple-400",
    },
    {
        icon: LuZap,
        title: "Fast & Optimized",
        description:
            "Lightning-fast performance with optimized code and advanced caching strategies.",
        color: "text-yellow-500",
    },
    {
        icon: LuUsers,
        title: "User-Friendly",
        description:
            "Intuitive interfaces designed with user experience and accessibility in mind.",
        color: "text-green-500",
    },
    {
        icon: GoGlobe,
        title: "SEO Optimized",
        description:
            "Built-in SEO best practices to help your site rank higher in search results.",
        color: "text-cyan-500",
    },
    {
        icon: BsShieldLock,
        title: "Secure & Reliable",
        description:
            "Enterprise-level security measures and robust architecture for peace of mind.",
        color: "text-rose-400",
    },
    {
        icon: FaRegClock,
        title: "24/7 Support",
        description:
            "Round-the-clock technical support and maintenance for uninterrupted operations.",
        color: "text-indigo-400",
    },
    {
        icon: FaAward,
        title: "Quality Assured",
        description:
            "Rigorous testing and quality assurance processes ensure flawless delivery.",
        color: "text-pink-500",
    },
];

const FeaturesSection = () => {
    return (
        <div className="bg-[#111827] py-20 px-5">
            <section className="max-w-[1480px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center">
                    <SectionLabel label={"Designed With Users in Mind"} />
                    <h2 className="text-4xl sm:text-5xl font-bold">Why Our Solutions Stand Out</h2>
                    <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-300">
                        We care about every detail — and it shows in our beautiful UI/UX
                        designs. Our websites and apps are built with excellence in mind.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group text-center p-8 rounded-2xl border border-gray-700 hover:border-gray-600 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-gray-800 to-gray-700"
                            >
                                {/* Icon */}
                                <div className="mb-6">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        <IconComponent className={`h-8 w-8 ${feature.color}`} />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Effect */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div
                                        className={`w-12 h-1 mx-auto rounded-full bg-gradient-to-r ${feature.color.includes("blue")
                                                ? "from-blue-400 to-blue-600"
                                                : feature.color.includes("purple")
                                                    ? "from-purple-400 to-purple-600"
                                                    : feature.color.includes("yellow")
                                                        ? "from-yellow-400 to-yellow-600"
                                                        : feature.color.includes("green")
                                                            ? "from-green-400 to-green-600"
                                                            : feature.color.includes("cyan")
                                                                ? "from-cyan-400 to-cyan-600"
                                                                : feature.color.includes("red")
                                                                    ? "from-red-400 to-red-600"
                                                                    : feature.color.includes("indigo")
                                                                        ? "from-indigo-400 to-indigo-600"
                                                                        : "from-pink-400 to-pink-600"
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/* Bottom CTA */}
                <div className="text-center mt-16 relative">
                    <div className="bg-gradient-to-r from-blue-700 to-purple-800 rounded-3xl p-12 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Ready to Experience the Difference?
                        </h3>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join hundreds of satisfied clients who trust 3S-SOFT for their
                            digital transformation journey.
                        </p>
                        <Link
                            href={"/contact"}
                            className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesSection;
