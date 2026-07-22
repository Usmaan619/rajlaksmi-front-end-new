import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

import fassaiImg from "@/assets/bottomCertified/fssaiLogo.png";
import labtestedImg from "@/assets/bottomCertified/labtested.png";
import organicLogoImg from "@/assets/bottomCertified/organicLogo.png";
import premiumLogoImg from "@/assets/bottomCertified/premiumLogo.png";

import IndiaOrganicLogo from "@/assets/certified/100_ Naturals.webp";
import Usda from "@/assets/certified/GUARANTED ORIGINAL.webp";
import Apeda from "@/assets/certified/APEDA.webp";
import impandexpot from "@/assets/certified/ICE.webp";
import NPOP from "@/assets/certified/npop.webp";

import weMaintainImg from "@/assets/labreport/WeMaintain.webp";

const certifications = [
  {
    image: organicLogoImg,
    title: "Organic Certification",
    description:
      "This certification confirms that our products are grown using natural and sustainable farming practices without the use of harmful chemicals.",
  },
  {
    image: labtestedImg,
    title: "Lab Tested Quality Certification",
    description:
      "Our products are tested in certified laboratories to ensure they meet safety, hygiene, and quality benchmarks before reaching you.",
  },
  {
    image: fassaiImg,
    title: "FSSAI Certification",
    description:
      "We are compliant with the Food Safety and Standards Authority of India (FSSAI) guidelines.",
  },
  {
    image: premiumLogoImg,
    title: "Premium Quality Certification",
    description:
      "Our processing and packaging follow strict quality control procedures.",
  },
  {
    image: IndiaOrganicLogo,
    title: "100% Natural & Organic",
    description:
      "This certification confirms that our products are grown using purely natural and sustainable farming practices.",
  },
  {
    image: Usda,
    title: "Guaranteed Original",
    description:
      "A mark of authenticity guaranteeing that our products are 100% original and naturally sourced.",
  },
  {
    image: Apeda,
    title: "APEDA Certified",
    description:
      "Certified by APEDA, ensuring our products meet stringent export-quality standards for the global market.",
  },
  {
    image: impandexpot,
    title: "Import & Export Certified",
    description:
      "Our Import-Export certification reflects our compliance with international trade regulations.",
  },
  {
    image: NPOP,
    title: "NPOP Certification",
    description:
      "Certified under the National Programme for Organic Production (NPOP) by the Government of India.",
  },
];

const Certifications = () => {
  return (
    <>
      <Seo
        title="Our Certifications | Rajlakshmi Javiks International – Organic & Quality Certified"
        description="View our organic certifications, FSSAI compliance, and lab testing quality assurance. We prioritize transparency and safety for all our organic food products."
        url="/certifications"
      />
      <div className="min-h-screen bg-white ">
        {/* Header */}
        <section className="px-6 py-10 md:px-16 lg:px-24">
          <h1 className="text-2xl md:text-3xl font-bold text-[#116931] mb-4">
            Certifications & Quality Assurance
          </h1>
          <p className="text-[hsl(140,40%,40%)] font-medium text-lg mb-6">
            Your Trust, Our Responsibility
          </p>
          <div className="max-w-7xl space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              At Rajlakshmi Javiks, we believe that organic is not just a
              label—it is a firm commitment to purity, sustainability, and
              transparency. In an era where food safety is paramount, we ensure
              that every single product bearing our name undergoes a rigorous
              validation process. Our extensive array of certifications is a
              testament to our unwavering dedication to providing you and your
              family with completely natural, chemical-free, and ethically
              sourced <Link to="/products" className="text-green-700 hover:underline">food products</Link>.
            </p>
            <p>
              From the very soil where our seeds are sown to the final packaging
              facility, every step of our supply chain is meticulously
              monitored. We partner exclusively with certified organic farming
              clusters across India, ensuring no synthetic pesticides, harmful
              herbicides, or genetically modified organisms (GMOs) ever touch
              our crops. Furthermore, our state-of-the-art processing units
              comply with strict international hygiene standards, guaranteeing
              that the natural nutritional profile and authentic flavors of our
              <Link to="/categories" className="text-green-700 hover:underline"> grains, spices, oils, and dry fruits</Link> are preserved. We invite you
              to explore our certifications and lab reports below, offering you
              absolute peace of mind with every purchase.
            </p>
          </div>
        </section>

        {/* Certification Cards */}
        <section className="px-6 md:px-16 lg:px-24 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="border border-[hsl(140,40%,80%)] rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="w-16 h-16 rounded-2xl bg-[hsl(140,40%,92%)] flex items-center justify-center mb-4 overflow-hidden p-2">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <h3 className="font-semibold text-foreground text-lg mb-2 truncate">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {cert.description}
                </p>

              </div>
            ))}
          </div>
        </section>

        {/* How We Maintain Quality */}
        <section className="mx-6 md:mx-16 lg:mx-24 mb-16 rounded-3xl overflow-hidden bg-[hsl(140,30%,95%)] shadow-md">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-[#116931] mb-4">
                How We Maintain Uncompromising Quality
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-6 leading-relaxed">
                At Rajlakshmi Javiks, our prestigious certifications are deeply
                supported by our rigorous internal quality control practices. We
                don't just meet standards; we consistently strive to exceed
                them.
              </p>
              <ul className="text-sm md:text-base text-gray-700 space-y-3 mb-8 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-[#116931] font-bold">✓</span>
                  <strong>Careful Sourcing:</strong> Direct procurement from
                  verified, traditional farming communities utilizing
                  sustainable crop rotation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#116931] font-bold">✓</span>
                  <strong>Multi-stage Quality Inspection:</strong> Every batch
                  is visually and scientifically inspected upon arrival at our
                  facility.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#116931] font-bold">✓</span>
                  <strong>Hygienic Processing:</strong> We utilize
                  state-of-the-art cold-pressing and stone-grinding machinery to
                  prevent heat degradation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#116931] font-bold">✓</span>
                  <strong>Batch-wise Quality Checks:</strong> Strict third-party
                  laboratory testing is conducted to screen for heavy metals,
                  pesticides, and bacterial contamination.
                </li>
              </ul>
              <div>
                <button
                  aria-label="Read More About Our Quality Control"
                  className="bg-[#116931] text-white text-sm md:text-base font-semibold px-6 py-3 rounded-lg hover:bg-[hsl(140,60%,25%)] transition-colors shadow-sm"
                >
                  Read our full quality manual
                </button>
              </div>
            </div>
            <div className="relative min-h-[300px] md:min-h-full">
              <img
                src={weMaintainImg}
                alt="Fresh organic vegetables and produce"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* AEO / SEO FAQ Section */}
        <section className="px-6 md:px-16 lg:px-24 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#116931] text-center mb-10">
              Frequently Asked Questions (Certifications & Quality)
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-[hsl(140,40%,80%)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  What does your Organic Certification mean?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Our Organic Certification ensures that the food you consume is
                  grown entirely without the use of synthetic fertilizers,
                  chemical pesticides, or bioengineered genes (GMOs). It
                  guarantees that the land has been managed sustainably,
                  focusing on soil health and natural biodiversity, providing
                  you with food that is authentically pure and safe.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[hsl(140,40%,80%)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  Are your products FSSAI certified?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Yes, absolutely. We hold valid FSSAI (Food Safety and
                  Standards Authority of India) licenses. This statutory
                  certification ensures that all our manufacturing, processing,
                  packaging, and distribution operations adhere to the strict,
                  legally mandated food safety and hygiene protocols set by the
                  Government of India. <Link to="/contact" className="text-green-700 hover:underline">Contact us</Link> if you need more info.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[hsl(140,40%,80%)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  How can I verify the lab testing of your products?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  We believe in total transparency. Every product batch is sent
                  to NABL-accredited, third-party laboratories to be tested for
                  over 100+ parameters, including pesticide residues and heavy
                  metals. You can access the specific batch's Lab Report by
                  scanning the QR code on our packaging or by visiting the 'Lab
                  Reports' section on our website.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[hsl(140,40%,80%)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  Do your certifications apply to your B2B wholesale supplies as
                  well?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Yes. Whether you are purchasing a single retail packet or a
                  massive 500kg <Link to="/b2b" className="text-green-700 hover:underline">wholesale shipment</Link>, the organic integrity and
                  quality certifications remain exactly the same. We provide our
                  wholesale partners with all necessary digital and physical
                  copies of our certifications and lab reports to help them
                  build trust with their own consumer base.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-[hsl(140,40%,80%)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                  Are your products safe for babies and toddlers?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Because our products are 100% certified organic and rigorously
                  lab-tested to ensure the complete absence of harmful
                  chemicals, heavy metals, and adulterants, they are generally
                  considered exceptionally safe and highly beneficial for young
                  children and toddlers. However, we always recommend consulting
                  with your pediatrician regarding specific dietary
                  introductions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Certifications;
