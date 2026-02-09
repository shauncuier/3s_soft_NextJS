export const metadata = {
    title: "Terms of Service | 3s-Soft Agreement",
    description:
        "Legal terms and conditions for partnering with 3s-Soft for web development and digital services.",
};

export default function TermsOfService() {
    return (
        <div className="bg-gray-900 min-h-screen pt-24 sm:pt-28 md:pt-38 pb-20 px-4">
            <div className="max-w-[1480px] mx-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Terms of Service</h1>

                    <div className="space-y-10 text-gray-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing <strong>https://3s-soft.com</strong> and engaging with our digital services, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, you must not use our website or services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Services Provided</h2>
                            <p className="mb-4">
                                3S-SOFT provides full-service digital solutions including but not limited to:
                            </p>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>MERN Stack Web Development</li>
                                <li>WordPress Customization</li>
                                <li>eCommerce Product Listing (Amazon, eBay, Etsy, Walmart)</li>
                                <li>SEO and Digital Marketing</li>
                                <li>Graphic Design & Virtual Assistant Services</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. Intellectual Property</h2>
                            <p>
                                Unless otherwise stated in a specific project contract, all original source code, designs, and content developed by 3S-SOFT remain our intellectual property until full payment is received, upon which ownership of the final deliverable is transferred to the client.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. Payment Terms</h2>
                            <p>
                                Project phases, milestones, and payment schedules will be defined in individual service agreements. We typically require a deposit before commencing work. Late payments may result in project delays or suspension of services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Limitation of Liability</h2>
                            <p>
                                3S-SOFT shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services. We do not guarantee specific search engine rankings or sales metrics as these depend on third-party platform algorithms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Governing Law</h2>
                            <p>
                                These terms are governed by the laws of Bangladesh. However, for our international clients in the <strong>US, UK, and Europe</strong>, we adhere to international business standards and contractual obligations agreed upon in writing.
                            </p>
                        </section>

                        <p className="text-sm italic pt-6 border-t border-gray-800">Last Updated: January 26, 2026</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
