import Footer from "@/components/Footer";
import Header from "@/components/Header";

const ShippingPolicy = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 md:py-10 bg-white mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-300">
          
          {/* Page Header */}
          <div className="border-b border-gray-200 py-4 md:py-6 px-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
                  Shipping & Delivery Policy
                </h1>
                <p className="text-sm text-gray-500">
                  Last Updated: 16/02/2026
                </p>
              </div>
            </div>
            <div className="max-w-5xl mx-auto mt-4">
              <p className="text-gray-600 text-sm md:text-base">
                At Rajlakshmijaviks International, we strive to deliver your
                orders quickly and safely. Please review our shipping policies
                below.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* Left Column - Policy Content */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                
                {/* Processing Time */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                    ⏱️ Processing Time
                  </h2>
                  <ul className="space-y-3 text-gray-600 text-sm md:text-base ml-6 list-disc">
                    <li>All orders will be delivered within 5-10 working days.</li>
                    <li>Orders are not shipped or delivered on weekends or public holidays.</li>
                    <li>During high order volumes, shipments may be delayed. We will notify you via email or phone.</li>
                  </ul>
                </section>

                {/* Shipping Confirmation & Tracking */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                    📬 Shipping Confirmation & Order Tracking
                  </h2>
                  <ul className="space-y-3 text-gray-600 text-sm md:text-base ml-6 list-disc">
                    <li>
                      You will receive a shipment confirmation email once your order has shipped, 
                      including a tracking number and link to track your package.
                    </li>
                    <li>
                      Track your order anytime through your account dashboard or the tracking link 
                      provided in your confirmation email.
                    </li>
                  </ul>
                </section>

                {/* Damages */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                    💥 Damages & Lost Packages
                  </h2>
                  <ul className="space-y-3 text-gray-600 text-sm md:text-base ml-6 list-disc">
                    <li>Rajlakshmijaviks International is not responsible for products damaged or lost during shipping.</li>
                    <li>Contact the shipment carrier or our support team within 48 hours to file a claim.</li>
                    <li>Please save all packaging materials and damaged goods before filing a claim.</li>
                  </ul>
                </section>

                {/* Undeliverable Packages */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4 flex items-center gap-3">
                    📦 Undeliverable Packages
                  </h2>
                  <div className="bg-gray-50 border-l-4 border-green-400 pl-4 pr-6 py-4 rounded-r-lg">
                    <p className="text-gray-700 text-sm md:text-base">
                      If a package is returned as undeliverable due to incorrect address or incomplete 
                      information, additional shipping charges may apply for reshipping.
                    </p>
                  </div>
                </section>
              </div>

              {/* Right Column - Sticky Contact Card */}
              <div className="space-y-6 lg:sticky lg:top-24 self-start">
                <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg border border-green-100 p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
                    Need Help?
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-600 text-center mb-4 font-medium">
                      Contact us for shipping queries
                    </p>
                    <div className="space-y-3">
                      <a
                        href="mailto:rajlaxmiorganicfoods@gmail.com"
                        className="block p-3 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 text-center"
                      >
                        <span className="font-semibold text-gray-800">📧 Email</span>
                        <div className="text-xs text-green-700 mt-1">
                          rajlaxmiorganicfoods@gmail.com
                        </div>
                      </a>
                      <a
                        href="tel:+918769115905"
                        className="block p-3 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 text-center"
                      >
                        <span className="font-semibold text-gray-800">📞 Phone</span>
                        <div className="text-xs text-green-700 mt-1">+91 8769115905</div>
                      </a>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs text-gray-600 text-center">
                      <div>🕒 Mon-Sat: 10:00 AM – 8:00 PM</div>
                    </div>
                  </div>
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

export default ShippingPolicy;
