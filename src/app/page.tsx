import Hero from "@/components/home/Hero";
import FeaturesSection from "@/components/home/FeaturesSection";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import StructuredData from "@/components/StructuredData";

export const metadata = {
    title: "Scalable Digital Solutions for Global Success",
    description:
        "3S-SOFT is a full-service digital agency providing expert MERN stack development, eCommerce managed services, SEO, and professional virtual assistants for US and UK businesses.",
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "3S-SOFT",
    "url": "https://3s-soft.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://3s-soft.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};

export default function Home() {
    return (
        <>
            <StructuredData data={websiteSchema} id="website-schema" />
            <Hero />
            <ServicesSection />
            <PortfolioSection />
            <FeaturesSection />
            <Testimonials />
            <WhyChooseUs />
        </>
    );
}
