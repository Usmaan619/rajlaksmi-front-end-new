import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Seo from "@/components/Seo";

import fassaiImg from "@/assets/bottomCertified/fssaiLogo.png";
import labtestedImg from "@/assets/bottomCertified/labtested.png";
import organicLogoImg from "@/assets/bottomCertified/organicLogo.png";
import premiumLogoImg from "@/assets/bottomCertified/premiumLogo.png";

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
];

const ITEMS_PER_PAGE = 6;

const Certifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleCerts = certifications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
          <h1 className="text-2xl md:text-3xl font-bold text-[#116931]">
            Certifications & Quality Assurance
          </h1>
          <p className="text-[hsl(140,40%,40%)] mt-1">
            Your Trust, Our Responsibility
          </p>
        </section>

        {/* Certification Cards */}
        <section className="px-6 md:px-16 lg:px-24 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCerts.map((cert, index) => (
              <div
                key={index}
                className="border border-[hsl(140,40%,80%)] rounded-2xl p-6 hover:shadow-lg transition-shadow bg-white"
              >
                <div className="w-16 h-16 rounded-full bg-[hsl(140,40%,92%)] flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-10 h-10 object-contain"
                  />
                </div>

                <h3 className="font-semibold text-foreground text-lg mb-2 truncate">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {cert.description}
                </p>
                <button
                  aria-label="View Certificate"
                  className="border border-[#116931] text-[#116931] text-sm px-4 py-1.5 rounded-md hover:bg-[#116931] hover:text-white transition-colors"
                >
                  View Certificate
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                aria-label="Previous Page"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full border border-[hsl(140,40%,80%)] flex items-center justify-center text-[#116931] disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-muted-foreground">Previous</span>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  aria-label={`Page ${i + 1}`}
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`text-sm px-1 ${currentPage === i + 1 ? "font-bold text-foreground" : "text-muted-foreground"}`}
                >
                  {i + 1}
                </button>
              ))}
              <span className="text-sm text-muted-foreground">Next</span>
              <button
                aria-label="Next Page"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full border border-[#116931] flex items-center justify-center text-[#116931] disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* How We Maintain Quality */}
        <section className="mx-6 md:mx-16 lg:mx-24 mb-20 rounded-3xl overflow-hidden bg-[hsl(140,30%,95%)] ">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-[#116931] mb-4">
                How We Maintain Quality
              </h2>
              <p className="text-sm text-foreground mb-4">
                At Rajlakshmi Javiks, certifications are supported by our
                internal quality control practices:
              </p>
              <ul className="text-sm text-foreground space-y-1.5 mb-6 list-disc list-inside">
                <li>Careful sourcing from trusted farms</li>
                <li>Multi-stage quality inspection</li>
                <li>Hygienic processing and packaging</li>
                <li>Batch-wise quality checks</li>
                <li>Continuous monitoring and improvement</li>
              </ul>
              <div>
                <button
                  aria-label="Read More About Our Quality Control"
                  className="bg-[#116931] text-white text-sm px-5 py-2 rounded-md hover:bg-[hsl(140,60%,25%)] transition-colors"
                >
                  Read more about our quality control
                </button>
              </div>
            </div>
            <div className="relative min-h-[250px] md:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop"
                alt="Fresh organic vegetables and produce"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Certifications;
