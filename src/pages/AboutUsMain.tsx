import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ChapatiImg from "@/assets/aboutus/quality.webp";

import farmerImage from "@/assets/aboutus/transparency1.webp";
import teamImage from "@/assets/aboutus/transparency2.webp";

import farmerBgImg from "@/assets/aboutus/farmer-bell-left.png";
import firstImg from "@/assets/aboutus/first.webp";
import secImg from "@/assets/aboutus/sec.webp";
import Seo from "@/components/Seo";
import CompetitorComparisonSection from "@/components/CompetitorComparisonSection";

const AboutUsPage = () => {
  const navigate = useNavigate();
  const differentiators = [
    {
      title: "100% Organic & Naturally Grown",
      desc: "All products are grown without synthetic fertilizers, pesticides, or GMOs — sourced from certified organic farms across central India, preserving natural nutrient profiles.",
    },
    {
      title: "Free from Chemicals, Pesticides & Preservatives",
      desc: "We strictly prohibit the use of artificial preservatives, colours, or chemical additives. What you receive is pure food in its most natural, wholesome state.",
    },
    {
      title: "Third-Party Lab Tested for Safety & Quality",
      desc: "Every product batch undergoes rigorous testing at NABL-accredited laboratories for pesticide residues, heavy metals, microbial safety, purity, and moisture content.",
    },
    {
      title: "FSSAI, APEDA & NPOP Certified",
      desc: "Our full range of organic food products holds valid FSSAI, APEDA, and NPOP certifications — giving you the assurance of complete compliance with India's food safety laws.",
    },
    {
      title: "Ethically Sourced from Trusted Organic Farms",
      desc: "We work directly with organic farming communities in Madhya Pradesh, Rajasthan, and Karnataka, ensuring fair trade practices, sustainable agriculture, and complete supply chain traceability.",
    },
    {
      title: "Hygienically Processed, Vacuum-Packed & Dispatched",
      desc: "From processing to packaging, every step follows strict hygiene protocols. Dry fruits and specialty items are vacuum-sealed for maximum freshness on delivery.",
    },
  ];
  return (
    <>
      <Seo
        title="About Us | Rajlakshmi Javiks International — Organic Food Brand Since 2019, Indore"
        description="Learn about Rajlakshmi Javiks International — Indore's trusted source for pure A2 Gir Cow Bilona Ghee, organic pulses, cold-pressed oils, millets, dry fruits, and natural spices since 2019. FSSAI & APEDA certified. Discover our story, mission, and commitment to chemical-free organic food across India."
        url="/about"
      />
      <div className="min-h-screen bg-white">
        {/* Header Section with decorative elements */}
        <section className="text-center py-12 px-4 relative overflow-hidden">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 relative z-10">
            About Rajlakshmi Javiks International
          </h1>
          <p className="text-gray-600 mt-3 text-base md:text-lg relative z-10 max-w-3xl mx-auto">
            Established in 2019 in Indore, Madhya Pradesh — India's premier certified organic food retailer and wholesaler, bringing you pure A2 Gir Cow Bilona Ghee, cold-pressed oils, organic pulses, millets, dry fruits, and natural spices. Purity you can trust, quality you can verify.
          </p>
        </section>

        {/* About Rajlakshmi Javiks - with image on RIGHT */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="flex-1 order-2 md:order-1">
                <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-700 text-base leading-relaxed mb-5">
                  Established in 2019 in Indore, Madhya Pradesh, Rajlakshmi
                  Javiks International has grown to become one of India's most
                  trusted retail traders and wholesalers of premium organic and
                  natural food products. We specialize in providing the highest
                  quality <strong>A2 Gir Cow Bilona Ghee</strong> made using the
                  ancient Vedic churning method, along with a diverse range of
                  <strong> cold-pressed oils, organic dry fruits, whole grain millets,
                  chemical-free pulses, natural spices, and artisanal homemade products</strong>.
                  All sourced directly from certified organic farms across India.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-5">
                  Our commitment to authentic, lab-tested quality has earned us
                  consistent 4+ star ratings and a loyal base of over 17,000
                  health-conscious customers across India. We hold <strong>FSSAI certification</strong>,
                  <strong> APEDA certification</strong>, and comply with the
                  <strong> NPOP (National Programme for Organic Production)</strong> standards,
                  giving every customer complete confidence in the purity and
                  traceability of everything they purchase from us.
                </p>
                <p className="text-gray-700 text-base leading-relaxed mb-8">
                  We take pride in sourcing directly from nature — working
                  alongside farming communities in Madhya Pradesh, Rajasthan,
                  and Karnataka to ensure that every product reaching your
                  doorstep is 100% pure, preservative-free, and full of natural
                  nutritional goodness. From our <strong>PAN India delivery network</strong>
                  to our transparent lab report system, we make organic food
                  accessible, affordable, and trustworthy for every Indian family.
                </p>
                <Button
                  aria-label="Explore Our Products"
                  className="bg-[#116931] hover:bg-green-700 text-white rounded-md px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
                >
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
                      src={firstImg}
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
                    src={secImg}
                    alt="Organic products"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                Who We Are — India's Trusted Organic Food Brand
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-5">
                Rajlakshmi Javiks International is more than just a brand — it
                is a promise of health, wellness, and transparency. Headquartered
                at 11, Manish Bag Colony Road, Navlakha, Indore, Madhya Pradesh,
                we serve thousands of health-conscious consumers, families,
                restaurants, and B2B wholesale partners across India with
                authentically sourced, naturally processed organic food products.
              </p>
              <p className="text-gray-700 text-base leading-relaxed mb-5">
                Whether it's our <strong>Organic Kashmiri Saffron (Kesar)</strong>,
                our traditionally churned <strong>A2 Gir Cow Bilona Ghee</strong>,
                our stone-cleaned <strong>organic toor dal and moong dal</strong>,
                or our <strong>cold-pressed Kacchi Ghani mustard oil</strong>,
                every product is processed under hygienic, controlled conditions
                and quality-checked before dispatch for PAN India delivery.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                We believe that the food you eat directly impacts your health,
                energy, and longevity. That belief drives us to maintain the
                highest standards of organic purity in every product category
                — from daily staples like wheat and rice to specialty items
                like Medjool dates, chia seeds, and organic raw honey.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="bg-gradient-to-br from-green-50 to-white py-16 px-4 mt-12">
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
                  <p className="text-gray-700 text-base font-semibold leading-relaxed mb-2">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
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
                  <p className="text-gray-700 text-base font-semibold leading-relaxed mb-2">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
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
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  To make 100% pure, certified organic food products accessible
                  and affordable for every Indian family — from premium A2 Gir
                  Cow Bilona Ghee to organic pulses, millets, cold-pressed oils,
                  and natural spices — while supporting ethical farming practices,
                  maintaining transparent quality standards, and delivering food
                  that nourishes both people and the planet.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We are committed to growing with our farming communities,
                  maintaining full supply chain traceability, and continually
                  raising the bar for organic food quality across India.
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
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  To become India's most trusted household name in certified
                  organic food — a brand that every health-conscious family
                  across India recognizes for uncompromising purity,
                  sustainable sourcing, and transparent quality practices.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We envision a future where chemical-free, naturally grown food
                  is the norm, not the exception — and where Rajlakshmi Javiks
                  leads that transformation from our roots in Indore to every
                  corner of India and beyond.
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
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{
              backgroundImage: `url(${ChapatiImg})`,
            }}
          ></div>

          <div className="max-w-4xl mx-auto text-center relative z-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#116931] mb-6">
              Our Quality Promise
            </h2>
            <p className="text-[#676767] text-lg leading-relaxed mb-5">
              Quality at Rajlakshmi Javiks is not just a label — it's our
              foundation. From farm to your kitchen, every product goes through
              multi-stage quality checks: farm-level organic compliance,
              post-harvest testing for pesticide residues and heavy metals,
              NABL-accredited laboratory purity testing, hygienic processing
              under food-safe conditions, and vacuum-sealed packaging for
              maximum freshness on delivery.
            </p>
            <p className="text-[#676767] text-lg leading-relaxed mb-4">
              Our FSSAI license, APEDA certification, and NPOP compliance are
              not just certifications — they are the backbone of every
              commitment we make to our customers. We ensure freshness, purity,
              and authenticity in every pack we deliver, from our A2 Bilona
              Ghee to our organic spices and dry fruits.
            </p>

            <button
              aria-label="View Certifications"
              onClick={() => navigate(`/certifications`)}
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

        {/* Competitor Comparison */}
        <CompetitorComparisonSection />

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
                  aria-label="Shop Now"
                  onClick={() => navigate(`/product`)}
                  className="bg-[#116931] hover:bg-green-700 text-white rounded-md px-8 py-5 text-lg 
transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Shop Now
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
  const navigate = useNavigate();

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
                aria-label="Contact Us"
                onClick={() => navigate(`/contact`)}
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
