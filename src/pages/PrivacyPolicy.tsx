import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 md:py-10  bg-white mb-10">
        {/* Header */}

        <div className=" bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-300">
          <div className="bg-white border-b border-gray-200 py-8 px-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-800">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                Last Updated: [DD/MM/YYYY]
              </p>
            </div>
            <div className="max-w-5xl mx-auto mt-3">
              <p className="text-gray-600 text-sm md:text-base">
                At Rajlakshmi Javiks, your privacy is important to us. This
                Privacy Policy explains how we collect, use, protect, and share
                your personal information when you visit or make a purchase from
                our website.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-10">
                {/* Information We Collect */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Information We Collect
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    When you interact with our website, we may collect the
                    following information:
                  </p>

                  <h3 className="font-bold text-gray-800 mb-2">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4 ml-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Shipping and billing address</li>
                  </ul>

                  <h3 className="font-bold text-gray-800 mb-2">
                    Order & Payment Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4 ml-2">
                    <li>Order details</li>
                    <li>Payment method (we do not store card details)</li>
                  </ul>

                  <h3 className="font-bold text-gray-800 mb-2">
                    Technical Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Pages visited and interaction data</li>
                  </ul>
                </section>

                {/* How We Use Your Information */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                    <li>Process and deliver your orders</li>
                    <li>Communicate order updates and support responses</li>
                    <li>Improve our website and services</li>
                    <li>Send important service-related messages</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                {/* Cookies & Tracking */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Cookies & Tracking Technologies
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                    <li>Enhance user experience</li>
                    <li>Remember your preferences</li>
                    <li>Analyze website traffic</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-3">
                    You can manage or disable cookies through your browser
                    settings.
                  </p>
                </section>

                {/* Sharing of Information */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Sharing of Information
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    We do not sell or rent your personal data.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                    <li>Delivery partners for order fulfillment</li>
                    <li>Payment gateways for secure transactions</li>
                    <li>Legal authorities if required by law</li>
                  </ul>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Data Security
                  </h2>
                  <p className="text-gray-600 text-sm">
                    We take appropriate security measures to protect your
                    personal information from unauthorized access, misuse, or
                    disclosure.
                  </p>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Third-Party Services
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Our website may include links to third-party websites. We
                    are not responsible for their privacy practices.
                  </p>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Data Retention & Deletion
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                    <li>You may request account deletion at any time.</li>
                    <li>
                      We retain data only as long as required for legal and
                      business purposes.
                    </li>
                  </ul>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    Your Rights & Consent
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
                    <li>Access your personal data</li>
                    <li>Rectify incorrect information</li>
                    <li>Withdraw consent</li>
                    <li>Delete your account</li>
                  </ul>
                </section>
              </div>

              {/* Right Column - Animated Sticky Cards */}
              <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                {/* Contact Information Card */}
                <div
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-lg hover:border-green-300"
                >
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    Contact Information
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    If you have any questions, please contact us:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>Email: support@rajlakshmijaviks.com</li>
                    <li>Address: Indore, Madhya Pradesh, India</li>
                    <li>Phone: +91 12345678</li>
                  </ul>
                </div>

                {/* Your Rights Card */}
                <div
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6
                transition-all duration-300 hover:-translate-y-1
                hover:shadow-lg hover:border-green-300"
                >
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    Your Rights
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>Access your personal data</li>
                    <li>Request correction or deletion</li>
                    <li>Withdraw consent for marketing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
