export const metadata = {
    title: "Privacy Policy | 3s-Soft Data Protection",
    description:
        "Comprehensive Privacy Policy for 3s-Soft, outlining how we handle data for our US, UK, and international clients.",
};

export default function PrivacyPolicy() {
    return (
        <div className="bg-gray-900 min-h-screen pt-24 sm:pt-28 md:pt-38 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Privacy Policy</h1>

                <div className="space-y-10 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            3S-SOFT (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <strong>https://3s-soft.com</strong> and use our services. We comply with global data protection standards, including the <strong>General Data Protection Regulation (GDPR)</strong> for our UK/EU clients and various <strong>US State Privacy Laws</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Information We Collect</h2>
                        <div className="ml-4 space-y-4">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-2 underline decoration-blue-500/50">A. Personal Data</h3>
                                <p>We collect personally identifiable information that you voluntarily provide, such as your name, email address, phone number, and professional details when you contact us for a quote or project discussion.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-2 underline decoration-blue-500/50">B. Technical Data</h3>
                                <p>Our servers automatically collect information like your IP address, browser type, operating system, and the specific pages you view on our site. This helps us optimize performance for our global audience.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. UK / EU GDPR Rights</h2>
                        <p className="mb-4">If you are a resident of the UK or the European Economic Area (EEA), you have specific rights under the GDPR:</p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li>The right to access, update, or delete the information we have on you.</li>
                            <li>The right of rectification.</li>
                            <li>The right to object to our processing of your data.</li>
                            <li>The right of restriction.</li>
                            <li>The right to data portability.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. US State Privacy Rights</h2>
                        <p>
                            Residents of certain US states (such as California under the CCPA/CPRA) have the right to request information about our collection and use of personal data over the past 12 months, the right to &quot;opt-out&quot; of the sale of personal data (we do <strong>not</strong> sell your data), and the right to non-discrimination for exercising these rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Data Retention & Security</h2>
                        <p>
                            We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected. We implement industry-standard technical and organizational security measures, including SSL encryption, to protect your data from unauthorized access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">6. Contact Our Privacy Team</h2>
                        <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl">
                            <p className="mb-2">For any privacy-related inquiries or to exercise your rights, contact us at:</p>
                            <p className="font-bold text-white">Email: info@3s-soft.com</p>
                            <p className="font-bold text-white">Subject: Data Privacy Request</p>
                        </div>
                    </section>

                    <p className="text-sm italic pt-6 border-t border-gray-800">Last Updated: January 26, 2026</p>
                </div>
            </div>
        </div>
    );
}
