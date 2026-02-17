import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChapatiImg from "@/assets/aboutus/chapati-aboutis.png";
import farmerImage from "@/assets/WhyChooseRajlakshmiSection/1.png";
import teamImage from "@/assets/WhyChooseRajlakshmiSection/2.png";
import farmerBgImg from "@/assets/aboutus/farmer-bell-left.png";
const AboutUsPage = () => {
  const differentiators = [
    {
      title: "100% Organic & Naturally Grown",
    },
    {
      title: "Free from chemicals, pesticides & preservatives",
    },
    {
      title: "Lab tested for safety and quality",
    },
    {
      title: "Lab tested for safety and quality",
    },
    {
      title: "Ethically sourced from trusted farms",
    },
    {
      title: "Hygienically processed & packed",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50/30 to-white">
        {/* Header Section with decorative elements */}
        <section className="text-center py-12 px-4 relative overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 relative z-10">
            Certifications & Quality Assurance
          </h1>
          <p className="text-gray-600 mt-3 text-base md:text-lg relative z-10">
            Your Trust, Our Responsibility
          </p>
        </section>

        {/* About Rajlakshmi Javiks - with image on RIGHT */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-green-50/40 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                  About Rajlakshmi Javiks
                </h2>
                <p className="text-gray-700 text-base leading-relaxed mb-5">
                  At Rajlakshmi Javiks, we are committed to delivering pure,
                  organic, and chemical-free food products to every household.
                  Our journey began with a simple mission: to provide families
                  with healthy, natural, and traditionally processed food —
                  grown with care and delivered with trust.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-8">
                  We believe that good health starts with pure food. That's why
                  all our products are carefully sourced from organic farms,
                  free from preservatives, chemicals, and artificial additives.
                </p>
                <Button className="bg-[#01722C] hover:bg-green-700 text-white rounded-md px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all">
                  Explore Our Products
                </Button>
              </div>

              <div className="flex-1 flex justify-center order-1 md:order-2">
                <div className="relative">
                  {/* Decorative elements around image */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 border-4 border-green-400 rounded-full opacity-30"></div>
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>

                  <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative z-10">
                    <img
                      src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop"
                      alt="Rajlakshmi Javiks founders"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Are - image on LEFT */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 flex justify-center order-1">
              <div className="relative">
                {/* Decorative leaf elements */}
                <div className="absolute -top-6 -right-6 text-6xl opacity-20">
                  🌿
                </div>
                <div className="absolute -bottom-4 -left-4 text-5xl opacity-15">
                  🌾
                </div>

                <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop"
                    alt="Organic products"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-5">
                Rajlakshmi Javiks is an organic food brand focused on providing
                healthy and pure food products. We are a team of passionate
                individuals who believe in promoting health and wellness through
                organic, chemical-free products.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Every product we offer is carefully selected, processed
                hygienically, and quality-checked to ensure purity, nutrition,
                and authentic taste.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-[#f1fdf1]  to-white py-16 px-4 mt-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-12 text-center">
              What Makes Rajlakshmi Javiks Different
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {differentiators.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base font-medium leading-relaxed">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {differentiators.slice(3, 6).map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 
hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base font-medium leading-relaxed">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-sm text-center mt-10 max-w-3xl mx-auto">
              We don't believe in shortcuts. Our focus is on long-term health,
              transparency, and trust.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <div className="bg-white">
          <section className="max-w-5xl mx-auto px-6 py-16 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 
hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-5">
                  Our Mission
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To support ethical farming, maintain quality standards, and
                  deliver food products that nourish both people and the planet.
                </p>
              </div>

              <div
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 
hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-5">
                  Our Vision
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To make pure, safe, and sustainable organic food accessible to
                  every household while promoting a healthier way of living.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Quality Promise - with background image */}
        <section className="relative py-20 px-4  overflow-hidden">
          {/* Background overlay */}
          <div className="absolute inset-0  z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url(${ChapatiImg})`,
            }}
          ></div>

          <div className="max-w-4xl mx-auto text-center relative z-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#01722C] mb-6">
              Our Quality Promise
            </h2>
            <p className="text-[#676767] text-lg leading-relaxed mb-5">
              Quality at Rajlakshmi Javiks is not just a label — it's our
              foundation. From farm to your kitchen, every product goes through
              rigorous quality checks.
            </p>
            <p className="text-[#676767] text-lg leading-relaxed mb-4 font-semibold">
              We ensure freshness, purity, and authenticity in every pack we
              deliver.
            </p>

            <button
              className="
        px-6
        py-2
        rounded-md
        border
        border-[#1B7A3A]
        text-[#1B7A3A]
        text-sm
        font-medium
        bg-transparent
        hover:bg-[#1B7A3A]
        hover:text-white
        transition
        duration-300
      "
            >
              View Certifications
            </button>
          </div>
        </section>

        {/* Transparency & Customer Trust */}

        <TransparencySection />

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-white rounded-2xl shadow-md border border-gray-200 py-14 px-6 md:px-12 text-center 
transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-5">
                Let’s Grow Healthier Together
              </h2>

              <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of families who trust Rajlakshmi Javiks for their
                daily organic food needs. Experience purity, quality, and care
                in every product.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-green-700 hover:bg-green-800 text-white rounded-md px-8 py-5 text-lg 
transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Shop Now
                </Button>

                <Button
                  variant="ghost"
                  className="border border-green-700 text-green-700 hover:bg-green-50 rounded-md px-8 py-5 text-lg 
  transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link to="/certifications">Explore Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const TransparencySection = () => {
  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Background decorative image */}
      <img
        src={farmerBgImg}
        alt="farmer background"
        className="
    absolute
    bottom-0
    left-0
    w-[200px]
    sm:w-[280px]
    lg:w-[480px]
    h-auto
    object-contain
    opacity-60
    pointer-events-none
    select-none
  "
      />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Content */}
          <div className="space-y-5 text-center lg:text-left order-2 lg:order-1">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              Transparency & Customer Trust
            </h2>

            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              We believe customers deserve complete honesty. That’s why we
              openly share information about sourcing, quality testing, and
              certifications. Our support team is always available to answer
              your questions and guide you in choosing the right products.
            </p>

            <div className="pt-2">
              <Button
                variant="outline"
                className="bg-white border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-md px-6"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right - Overlapping Images */}
          <div className="relative w-full max-w-xl mx-auto h-[320px] sm:h-[380px] lg:h-[420px] order-1 lg:order-2">
            {/* Team image - back */}
            <div className="absolute top-0 right-0 w-[67%]">
              <img
                src={teamImage}
                alt="Rajlakshmi team"
                className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3] 
transition-all duration-500 hover:scale-105"
              />
            </div>

            {/* Farmer image - front */}
            <div className="absolute bottom-0 left-0 w-[40%] z-10">
              <img
                src={farmerImage}
                alt="Rajasthani farmer"
                className="w-full h-full object-cover rounded-2xl shadow-xl aspect-[3/4] 
transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
