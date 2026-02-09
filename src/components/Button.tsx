import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

interface ButtonProps {
    label: string;
    href: string;
}

const Button = ({ label, href }: ButtonProps) => {
    return (
        <Link
            href={href}
            className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 px-8 py-4 font-semibold flex items-center gap-2 transition duration-300 cursor-pointer text-lg"
        >
            {label === "Go Back Home" && <FaHome />}
            {label}
            {label === "Explore Our Services" && <FaArrowRightLong />}
        </Link>
    );
};

export default Button;
