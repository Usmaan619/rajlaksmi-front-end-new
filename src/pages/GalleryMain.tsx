import React from "react";
import "./gallery-main.css";
import gallery1 from "@/assets/gallery/gallery1.webp";
import gallery2 from "@/assets/gallery/gallery2.webp";
import gallery3 from "@/assets/gallery/gallery3.webp";
import gallery4 from "@/assets/gallery/gallery4.webp";
import gallery5 from "@/assets/gallery/gallery5.webp";
import gallery6 from "@/assets/gallery/gallery6.webp";
import gallery7 from "@/assets/gallery/gallery7.webp";
import gallery8 from "@/assets/gallery/gallery8.webp";
import gallery9 from "@/assets/gallery/gallery9.webp";
import gallery10 from "@/assets/gallery/gallery10.webp";
import gallery11 from "@/assets/gallery/gallery11.webp";
import Seo from "@/components/Seo";
import FAQSection from "@/components/FAQSection";

const GheeShowcase = () => {
  const images = [
    {
      id: 1,
      src: gallery1,
      alt: "Gir cow farmer caring for cows at Rajlakshmi Javiks gaushala",
      size: "large",
    },
    {
      id: 2,
      src: gallery2,
      alt: "Traditional Gir cow farming at Rajlakshmi Javiks gaushala",
      size: "medium",
    },
    {
      id: 3,
      src: gallery3,
      alt: "Pure A2 Cow Ghee jar placed on a wooden surface",
      size: "small",
    },
    {
      id: 4,
      src: gallery4,
      alt: "A2 Cow Ghee product jar by Rajlakshmi Javiks",
      size: "small",
    },
    {
      id: 5,
      src: gallery5,
      alt: "Customer holding pure A2 Cow Ghee jar",
      size: "medium",
    },
    {
      id: 6,
      src: gallery8,
      alt: "Traditional Indian cooking using A2 Cow Ghee",
      size: "large",
    },
    {
      id: 7,
      src: gallery6,
      alt: "Healthy Gir cows at Rajlakshmi Javiks gaushala",
      size: "small",
    },
    {
      id: 8,
      src: gallery7,
      alt: "Rustic presentation of pure A2 Cow Ghee jar",
      size: "small",
    },
    {
      id: 9,
      src: gallery9,
      alt: "Home cooking with pure A2 Cow Ghee in Indian kitchen",
      size: "medium",
    },
    {
      id: 10,
      src: gallery10,
      alt: "Rural gaushala environment with Gir cows at Rajlakshmi Javiks",
      size: "large",
    },
    {
      id: 11,
      src: gallery11,
      alt: "Using A2 Cow Ghee for healthy everyday cooking",
      size: "medium",
    },
  ];

  return (
    <>
      <Seo
        title="Gallery | Rajlakshmi Javiks – A2 Cow Ghee Journey"
        description="Explore Rajlakshmi Javiks's gallery showcasing our Gaushala, Gir cows, traditional bilona ghee making process, and farm-to-home purity."
        url="/gallery"
      />
      <div className="min-h-screen bg-white flex flex-col">
        <div className="min-h-[30vh] bg-[#F0FFF0] flex items-center justify-center py-12 md:py-16 px-4 pt-28 md:pt-36">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#01722C] mb-6 tracking-tight">
            Rajlakshmi Javiks - A2 Cow Ghee Gallery
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Take a visual journey through our Gaushala, witnessing the traditional bilona ghee making process and our healthy Gir cows.
          </p>
        </div>
      </div>
      
      <div className="gallery-showcase-container flex-1 pb-10">
        <div className="gallery-grid-container">
          {images?.map((image, index) => (
            <div key={image.id} className={`gallery-grid-item ${image.size}`}>
              <div className="gallery-image-wrapper bg-gray-100">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  loading={index < 4 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  decoding="async"
                  width={image.size === "large" ? "1200" : "800"}
                  height={image.size === "large" ? "1200" : "800"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-[120px] md:pb-[160px] bg-white w-full">
        <FAQSection />
      </div>
      </div>
    </>
  );
};

export default GheeShowcase;
