import SectionLabel from "@/components/SectionLabel";
import { getTestimonials } from "@/lib/firestore";
import TestimonialSlider from "./TestimonialSlider";

const Testimonials = async () => {
    const testimonials = await getTestimonials();

    if (testimonials.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 transition-colors duration-300 py-20 px-5">
            <section className="max-w-[1480px] mx-auto">
                <div className="flex flex-col items-center justify-center text-center">
                    <SectionLabel label={"Client Success Stories"} />
                    <h2 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">What Our Clients Say About Us</h2>
                    <p className="text-xl md:w-3/4 lg:w-1/2 mx-auto mt-5 text-gray-300">
                        Don&apos;t just take our word for it. Here&apos;s what our satisfied clients
                        have to say about their experience working with 3S-SOFT.
                    </p>
                </div>

                <TestimonialSlider testimonials={JSON.parse(JSON.stringify(testimonials))} />
            </section>
        </div>
    );
};

export default Testimonials;
