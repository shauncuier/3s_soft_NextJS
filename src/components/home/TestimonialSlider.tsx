"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import { FaQuoteRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Testimonial } from "@/types/firestore";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
    if (testimonials.length === 0) return null;

    return (
        <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            keyboard={true}
            autoplay={{
                delay: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            }}
            loop={testimonials.length > 1}
            modules={[Navigation, Pagination, Autoplay, Keyboard]}
            className="mySwiper max-w-4xl bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 mt-15"
        >
            {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id} className="px-6 md:px-15 py-12 md:py-16">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FaQuoteRight className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
                            <FaStar key={i} className="text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-xl italic my-6 font-light text-white text-center">
                        &quot;{testimonial.testimonial}&quot;
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-15 h-15 rounded-full ring-3 ring-blue-900 overflow-hidden relative">
                            <Image
                                src={testimonial.image}
                                alt={testimonial.name}
                                fill
                                sizes="60px"
                                className="object-cover rounded-full"
                                priority={false}
                            />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                            <h5 className="text-base font-medium text-blue-400">
                                {testimonial.position}
                            </h5>
                            <p className="text-sm text-gray-400">{testimonial.company}</p>
                        </div>
                    </div>
                    {/* Project Tag */}
                    {testimonial.project && (
                        <div className="mt-6 text-center">
                            <span className="inline-block bg-blue-900/30 text-blue-400 px-4 py-2 rounded-full text-sm font-medium">
                                {testimonial.project}
                            </span>
                        </div>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TestimonialSlider;
