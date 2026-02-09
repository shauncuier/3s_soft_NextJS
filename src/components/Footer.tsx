import Link from "next/link";
import Image from "next/image";
import { FaGlobe, FaHeart, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";
import { MdWhatsapp } from "react-icons/md";
import { getServices } from "@/lib/firestore";

const Footer = async () => {
    const currentYear = new Date().getFullYear();
    const services = await getServices();

    const quickLinks = [
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Team", to: "/team" },
        { label: "Blogs", to: "/blogs" },
        { label: "Portfolio", to: "/portfolio" },
        { label: "About", to: "/about-us" },
        { label: "Contact", to: "/contact" },
    ];

    return (
        <footer className="bg-gradient-to-br from-black to-gray-900 text-white transition-colors duration-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="">
                        <Link href="/">
                            <Image
                                src="/assets/logo.jpg"
                                alt="3S-SOFT - Expert MERN & SEO Services Logo"
                                className="rounded-full inline-block"
                                width={60}
                                height={60}
                            />
                        </Link>

                        <p className="text-gray-300 leading-relaxed mt-4 mb-8">
                            Your complete digital solutions partner. We help businesses go
                            from idea to online success with innovative technology and
                            result-driven strategies.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.linkedin.com/company/3s-soft/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-800 hover:from-sky-800 hover:to-sky-400 rounded-full flex items-center justify-center transition duration-300"
                            >
                                <FiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href="https://wa.me/8801835927634"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 rounded-full flex items-center justify-center transition duration-300"
                            >
                                <MdWhatsapp className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/3s.soft.bd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-800 hover:from-blue-800 hover:to-blue-400 rounded-full flex items-center justify-center transition duration-300"
                            >
                                <FiFacebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/3ssoft/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-br from-pink-400 via-pink-800 to-purple-800 hover:from-purple-800 hover:via-pink-800 hover:to-pink-400 rounded-full flex items-center justify-center transition duration-300"
                            >
                                <FiInstagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-blue-300">
                            Our Services
                        </h3>
                        <ul className="space-y-3">
                            {services.slice(0, 6).map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/services"
                                    className="text-blue-300 hover:text-blue-200 transition-colors duration-300 text-sm font-medium"
                                >
                                    View All Services →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-blue-300">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.to}
                                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-blue-300">
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <IoMdMail
                                    size={20}
                                    className="text-blue-300 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <a
                                        href="mailto:contact@3s-soft.com"
                                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        info@3s-soft.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhone
                                    size={20}
                                    className="text-blue-300 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <a
                                        href="tel:+8801835927634"
                                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        +880 1835 927634
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaLocationDot
                                    size={20}
                                    className=" text-blue-300 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <div className="text-gray-300 text-sm">
                                        Chittagong, Bangladesh
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaGlobe
                                    size={20}
                                    className="text-blue-300 mt-0.5 flex-shrink-0"
                                />
                                <div>
                                    <a
                                        href="https://www.3s-soft.com"
                                        className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        www.3s-soft.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © {currentYear} 3S-SOFT. All rights reserved.
                        </div>

                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                            <Link
                                href="/privacy-policy"
                                className="hover:text-white transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms-of-service"
                                className="hover:text-white transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="hover:text-white transition-colors duration-300"
                            >
                                Cookie Policy
                            </Link>
                        </div>

                        <div className="flex items-center text-gray-400 text-sm">
                            Made with <FaHeart className="h-4 w-4 text-red-500 mx-1" /> in
                            Bangladesh
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
