"use client";

import { useState, useEffect } from "react";

const ProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-100/10 z-10">
            <div
                className="h-full bg-gradient-to-r from-blue-600 via-pink-500 to-purple-500 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
};

export default ProgressBar;
