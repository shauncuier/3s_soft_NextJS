import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { IconType } from "react-icons";
import {
    FiLinkedin,
    FiTwitter,
    FiGithub,
    FiFacebook,
    FiLink,
    FiDribbble,
} from "react-icons/fi";
import { getTeamMembers } from "@/lib/firestore";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
    title: "Our Team | Expert Full-Stack Developers & SEO Pros",
    description:
        "Meet the 3S-SOFT team: a global collective of expert MERN stack developers, eCommerce strategists, and digital marketing professionals committed to your success.",
};

type SocialPlatform = "linkedin" | "twitter" | "github" | "dribbble" | "facebook";

const socialIcons: Record<SocialPlatform, IconType> = {
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    github: FiGithub,
    dribbble: FiDribbble,
    facebook: FiFacebook,
};

const getSocialIcon = (platform: string): IconType => socialIcons[platform as SocialPlatform] || FiLink;

export default async function Team() {
    const teamData = await getTeamMembers();

    return (
        <>
            <section className="bg-gray-900 transition-colors duration-300 px-4">
                <div className="max-w-[1480px] min-h-screen mx-auto pt-24 sm:pt-28 md:pt-38 pb-20">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <SectionLabel label={"Meet Our Expert Team"} />
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            The Experts Behind Your Success
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            Our diverse team of skilled professionals brings years of
                            experience and passion to every project, ensuring exceptional
                            results for our clients.
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-10 sm:px-0">
                        {teamData.map((member) => (
                            <figure
                                key={member.id}
                                itemScope
                                itemType="https://schema.org/Person"
                                className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700 overflow-hidden"
                            >
                                {/* Profile Image */}
                                <div className="relative overflow-hidden h-64">
                                    <Image
                                        src={member.image}
                                        alt={`${member.name} - ${member.position} at 3S-SOFT`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Social Links Overlay */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {Object.entries(member.social).map(([platform, url]) => {
                                            if (!url || url === "#") return null;
                                            const IconComponent = getSocialIcon(platform);
                                            return (
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    key={platform}
                                                    href={url}
                                                    itemProp="sameAs"
                                                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
                                                    aria-label={`${member.name}'s ${platform}`}
                                                >
                                                    <IconComponent className="h-4 w-4 text-white" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Content */}
                                <figcaption className="p-6">
                                    <h3
                                        itemProp="name"
                                        className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300"
                                    >
                                        {member.name}
                                    </h3>

                                    <p
                                        itemProp="jobTitle"
                                        className="text-blue-400 font-medium mb-3"
                                    >
                                        {member.position}
                                    </p>

                                    <p
                                        itemProp="description"
                                        className="text-gray-300 text-sm leading-relaxed mb-4"
                                    >
                                        {member.bio}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {member.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-500/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="text-center mt-16">
                        <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-3xl p-10 md:p-12 text-white border border-white/10 shadow-2xl">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                Ready to Work with Our Expert Team?
                            </h3>
                            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                                Let&apos;s discuss your project and see how our talented team can
                                help bring your vision to life.
                            </p>
                            <Link
                                href={"/contact"}
                                className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Start Your Project Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
