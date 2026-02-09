import Link from "next/link";
import Image from "next/image";
import { HiOutlineLightBulb, HiOutlineSparkles } from "react-icons/hi2";
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
import { LuHeartHandshake } from "react-icons/lu";
import SectionLabel from "@/components/SectionLabel";
import Button from "@/components/Button";

export const metadata = {
    title: "About 3S-SOFT | Your Partner for Digital Growth",
    description:
        "3S-SOFT is a premium digital agency headquartered in Bangladesh, delivering scalable MERN stack web development and eCommerce managed services to global clients.",
};

export default function AboutUs() {
    const coreServices = [
        {
            icon: FaCode,
            title: "MERN Stack Web Development",
            gradient: "from-blue-500 to-purple-600",
        },
        {
            icon: FaWordpress,
            title: "WordPress Theme Customization",
            gradient: "from-green-500 to-teal-600",
        },
        {
            icon: FaShoppingCart,
            title: "Product Listing for eCommerce",
            gradient: "from-orange-500 to-red-600",
        },
        {
            icon: FaBullseye,
            title: "Lead Generation & Market Research",
            gradient: "from-purple-500 to-pink-600",
        },
        {
            icon: FaSearch,
            title: "Digital Marketing & SEO",
            gradient: "from-pink-500 to-rose-600",
        },
        {
            icon: FaFacebook,
            title: "Social Media Marketing",
            gradient: "from-cyan-500 to-blue-600",
        },
        {
            icon: FaPaintBrush,
            title: "Graphic Design",
            gradient: "from-yellow-500 to-orange-600",
        },
        {
            icon: FaHeadphones,
            title: "Virtual Assistant Services",
            gradient: "from-indigo-500 to-purple-600",
        },
    ];

    return (
        <>
            <section className="bg-linear-to-b from-[#0f172a] to-[#1e293b] text-white px-4">
                <div className="max-w-370 min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
                    {/* Header */}
                    <div className="text-center">
                        <SectionLabel label={"About 3s-soft"} />
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            3S-SOFT | Who We Are & Our Digital Legacy
                        </h1>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            We&apos;re a passionate team of creators and developers dedicated to
                            building impactful digital solutions that inspire, solve problems,
                            and make the web a better place.
                        </p>
                    </div>

                    {/* Who We Are */}
                    <div className="grid md:grid-cols-2 gap-12 my-15">
                        <div className="">
                            <h3 className="text-3xl font-semibold mb-4">About 3s-soft</h3>
                            <p className="text-gray-300 leading-relaxed">
                                <strong className="text-blue-400">3s-Soft</strong> is a
                                full-service digital agency proudly based in Bangladesh,
                                committed to delivering top-notch web and digital solutions. We
                                specialize in modern MERN stack web development, WordPress
                                customization, and comprehensive eCommerce listing services for
                                platforms like Amazon, eBay, Etsy, and Walmart. With a dedicated
                                team of experienced developers, creative designers, and
                                strategic marketers, we work hand-in-hand with businesses to
                                build engaging websites, streamline operations, and maximize
                                online visibility. Whether you&apos;re launching a startup or scaling
                                an existing business, 3s-Soft is here to help you grow and
                                thrive in the digital space.
                            </p>
                        </div>
                        <Image
                            src="/assets/about-us.jpg"
                            alt="3S-SOFT Digital Agency - Expert MERN Stack & eCommerce Team in Bangladesh"
                            width={600}
                            height={400}
                            className="rounded-2xl shadow-lg"
                        />
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div className="rounded-xl p-8 shadow-md shadow-gray-600 bg-black/30 border border-gray-700">
                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <HiOutlineLightBulb className="text-4xl text-white" />
                            </div>

                            <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                            <p className="text-gray-300">
                                To empower businesses with powerful and user-centric digital
                                solutions that drive measurable results.
                            </p>
                        </div>
                        <div className="rounded-xl p-8 shadow-md shadow-gray-600 bg-black/30 border border-gray-700">
                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <HiOutlineSparkles className="text-4xl text-white" />
                            </div>

                            <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                            <p className="text-gray-300">
                                To be a global leader in web development, eCommerce services,
                                and virtual support through constant innovation.
                            </p>
                        </div>
                    </div>

                    {/* Core Services */}
                    <div className="text-center mb-20">
                        <h3 className="text-3xl font-semibold">What We Offer</h3>
                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
                            {coreServices.map((service, index) => {
                                const IconComponent = service.icon;
                                return (
                                    <Link key={index} href={"/services"}>
                                        <div className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden relative">
                                            {/* Icon Header */}
                                            <div className="p-6 pb-0 flex flex-col items-center">
                                                <div
                                                    className={`w-16 h-16 rounded-2xl bg-linear-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <IconComponent className="h-8 w-8 text-white" />
                                                </div>

                                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                            </div>

                                            {/* Hover Effect Overlay */}
                                            <div
                                                className={`absolute inset-x-0 bottom-0 h-1 bg-linear-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                                            ></div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="flex flex-col items-center justify-center rounded-xl p-8 shadow-md shadow-gray-600 bg-black/30 border border-gray-700">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            <LuHeartHandshake className="text-4xl text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">
                            Why Clients Trust 3s-Soft?
                        </h3>
                        <p className="text-gray-300 max-w-3xl mx-auto text-center">
                            We&apos;re committed to delivering quality, speed, and long-term value.
                            Our solutions are not just functional — they&apos;re designed to make
                            your business thrive in the digital world.
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-10 flex flex-col items-center justify-center">
                        <h4 className="text-xl md:text-2xl font-semibold mb-2">
                            Let&apos;s build something great together
                        </h4>
                        <p className="text-gray-400 mb-4">
                            Tell us about your project and we&apos;ll make it happen.
                        </p>
                        <div className="">
                            <Button label={"Contact Us"} href={"/contact"} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
