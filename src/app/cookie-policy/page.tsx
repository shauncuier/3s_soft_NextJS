export const metadata = {
    title: "Cookie Policy | 3s-Soft Compliance",
    description:
        "Learn how 3s-Soft uses cookies to enhance user experience for our global clients, compliant with GDPR and US regulations.",
};

export default function CookiePolicy() {
    return (
        <div className="bg-gray-900 min-h-screen pt-24 sm:pt-28 md:pt-38 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Cookie Policy</h1>

                <div className="space-y-10 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">1. What are Cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device when you visit a website. They help the website recognize your device and remember your preferences or actions over time. At 3S-SOFT, we use cookies to improve your browsing experience and provide analytics for our digital services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">2. Types of Cookies We Use</h2>
                        <div className="space-y-6">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h3 className="text-xl font-medium text-white mb-2">Essential Cookies</h3>
                                <p>These are necessary for the website to function properly. They enable core features like security, network management, and accessibility. You can disable these in your browser settings, but some parts of the site may stop working.</p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h3 className="text-xl font-medium text-white mb-2">Performance & Analytics</h3>
                                <p>We use tools like Google Analytics to understand how visitors interact with our site. This help us identify which areas are performing well and which need improvement. These cookies collect data in an anonymous form.</p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                <h3 className="text-xl font-medium text-white mb-2">Functionality Cookies</h3>
                                <p>These cookies allow us to remember the choices you make (such as your username or language) to personalize your experience.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">3. Managing Your Preferences</h2>
                        <p className="mb-4">
                            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete specific ones.
                        </p>
                        <ul className="list-disc pl-8 space-y-2">
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Chrome settings</a></li>
                            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Mozilla Firefox settings</a></li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Safari settings</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">4. GDPR & US Compliance</h2>
                        <p>
                            Under the UK/EU GDPR and various US privacy laws, you have the right to be informed about how your data is used. By continuing to use our site, you consent to our use of cookies as described in this policy. We do <strong>not</strong> use cookies to track your behavior across other unrelated websites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-blue-400 mb-4">5. Questions?</h2>
                        <p>
                            If you have any questions about our use of cookies, please contact us at <strong>info@3s-soft.com</strong>.
                        </p>
                    </section>

                    <p className="text-sm italic pt-6 border-t border-gray-800">Last Updated: January 26, 2026</p>
                </div>
            </div>
        </div>
    );
}
