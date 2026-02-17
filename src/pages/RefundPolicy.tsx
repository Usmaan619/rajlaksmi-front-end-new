

const RefundPolicy = () => {
  return (
    <>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 md:py-10 bg-white mb-10">
        {/* Header */}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-300">
          <div className="bg-white border-b border-gray-200 py-8 px-4">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-800">
                  Refund Policy
                </h1>
              </div>
              <p className="text-sm text-gray-500">
                Last Updated: [DD/MM/YYYY]
              </p>
            </div>
            <div className="max-w-5xl mx-auto mt-3">
              <p className="text-gray-600 text-sm md:text-base">
                Once an order is confirmed, Rajlakshmijaviks International will
                not accept return or refund requests. However, in certain
                situations, we are happy to work with our customers to find an
                amicable solution that is fair to all parties.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-10">
                {/* Return & Exchange */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    🔄 Return & Exchange
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
                    <li>
                      Return or exchange will be processed within 5 working
                      days.
                    </li>
                    <li>
                      If a refund is approved, it will be credited within 7-10
                      working days to the original payment method.
                    </li>
                  </ul>
                </section>

                {/* Damaged Product */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    💥 Damaged Product
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
                    <li>
                      Notify Rajlakshmijaviks International within 2 days of
                      delivery via email:{" "}
                      <a
                        href="mailto:rajlaxmiorganicfoods@gmail.com"
                        className="text-green-700 underline"
                      >
                        rajlaxmiorganicfoods@gmail.com
                      </a>
                    </li>
                    <li>
                      Include in the email: order number, invoice image, 1 outer
                      box image, 2 clear product images, and unboxing videos.
                    </li>
                    <li>
                      For multiple-item shipments, only the affected product can
                      be returned and replaced.
                    </li>
                    <li>
                      Replacement will be processed promptly, and we will work
                      with you to provide a fair solution.
                    </li>
                    <li>
                      Email responses will be sent within 24-48 hrs, with full
                      assistance thereafter.
                    </li>
                  </ul>
                </section>

                {/* Missing Product */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    📦 Missing Product
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
                    <li>
                      Notify us within 2 days of delivery via email:{" "}
                      <a
                        href="mailto:rajlaxmiorganicfoods@gmail.com"
                        className="text-green-700 underline"
                      >
                        rajlaxmiorganicfoods@gmail.com
                      </a>
                    </li>
                    <li>
                      Include order number, invoice image, 1 outer box image, 2
                      clear images of the opened box, and unboxing video of all
                      received items.
                    </li>
                    <li>
                      Refund requests cannot be accepted for missing products,
                      but the missing product will be promptly re-sent.
                    </li>
                    <li>
                      Email responses within 24-48 hrs, full assistance provided
                      thereafter.
                    </li>
                  </ul>
                </section>

                {/* Spoiled Product */}
                <section>
                  <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-4">
                    🍲 Spoiled Product
                  </h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-2 ml-2">
                    <li>
                      Notify us within 2 days of delivery via email:{" "}
                      <a
                        href="mailto:rajlaxmiorganicfoods@gmail.com"
                        className="text-green-700 underline"
                      >
                        rajlaxmiorganicfoods@gmail.com
                      </a>
                    </li>
                    <li>
                      Include order number, packaging/manufacture date, and
                      clear images or video of the spoiled product.
                    </li>
                    <li>
                      Returns will not be accepted for variance in taste,
                      texture, color, or aroma, as our products are natural and
                      handmade, so no two batches are identical.
                    </li>
                    <li>Replacement will be done after investigation.</li>
                    <li>
                      Email responses within 24-48 hrs, with full assistance
                      provided thereafter.
                    </li>
                  </ul>
                </section>
              </div>

              {/* Right Column - Sticky Contact */}
              <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-3">
                    Contact
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    For any refund-related queries:
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>
                        Email:{" "}
                        <a
                          href="mailto:rajlaxmiorganicfoods@gmail.com"
                          className="text-green-700 underline"
                        >
                          rajlaxmiorganicfoods@gmail.com
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
