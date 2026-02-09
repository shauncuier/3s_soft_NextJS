"use client";

import { HiOutlineSparkles } from "react-icons/hi2";
import Button from "@/components/Button";
import Link from "next/link";
import CountUp from "react-countup";

const Hero = () => {
    return (
        <section className="relative min-h-screen pt-24 sm:pt-28 md:pt-38 xl:pt-44 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex flex-col justify-between items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Animated Background Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400/10 rounded-full blur-xl animate-pulse delay-500"></div>

            <div className="flex flex-col justify-center items-center text-center z-40">
                <div className="mb-10">
                    <span className="flex items-center gap-2 bg-white/20 font-medium text-sm px-4 py-2 rounded-full text-white">
                        <HiOutlineSparkles size={18} className="text-yellow-400" />
                        Your Complete Digital Solutions Partner
                    </span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8 transition-all duration-500">
                    3S-SOFT | Professional
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 ml-4">
                        MERN Stack Development
                    </span>
                    <span className="block mt-2 text-2xl sm:text-3xl font-medium text-blue-200">
                        & Digital Excellence Partner
                    </span>
                </h1>

                <p className="text-lg md:text-2xl max-w-3xl mb-6 text-blue-100">
                    We help businesses go from idea to online success with innovative
                    digital solutions, expert development, and result-driven marketing
                    strategies.
                </p>

                <p className="max-w-2xl mb-10 text-blue-200">
                    Whether you&apos;re a solo entrepreneur or an established brand, our expert
                    team supports your growth every step of the way — with innovation,
                    integrity, and impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-14">
                    <Button label={"Explore Our Services"} href={"/services"} />

                    <Link
                        href={"/contact"}
                        className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-semibold border border-white/20 cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105"
                    >
                        Get Free Quote
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-300">
                    <div>
                        <p className="text-3xl font-bold text-white">
                            <CountUp end={500} enableScrollSpy />+
                        </p>
                        <p className="text-sm mt-1 text-blue-200">Projects Delivered</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">
                            <CountUp end={98} enableScrollSpy />%
                        </p>
                        <p className="text-sm mt-1 text-blue-200">Client Satisfaction</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">
                            <CountUp end={24} enableScrollSpy />/
                            <CountUp end={7} enableScrollSpy />
                        </p>
                        <p className="text-sm mt-1 text-blue-200">Support Available</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">
                            <CountUp end={8} enableScrollSpy />+
                        </p>
                        <p className="text-sm mt-1 text-blue-200">Years Experience</p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce my-14">
                <div className="w-[30px] h-[50px] border-2 border-gray-500 rounded-full flex items-center justify-center">
                    <div className="w-[4px] h-[9px] bg-white rounded-full animate-pulse mb-2" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
