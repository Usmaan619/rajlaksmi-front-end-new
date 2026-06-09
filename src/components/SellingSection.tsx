const stats = [
  {
    value: "546+",
    label: "Registered Riders",
    description:
      "Dedicated delivery partners ensuring your organic food reaches your doorstep fresh across India",
  },
  {
    value: "35k+",
    label: "KG Ghee Delivered",
    description:
      "Pure A2 Gir Cow Bilona Ghee delivered to health-conscious families and businesses nationwide",
  },
  {
    value: "250+",
    label: "Our Products",
    description:
      "A comprehensive range of certified organic food products from ghee and oils to millets and spices",
  },
  {
    value: "17,457+",
    label: "Food Items",
    description:
      "Individual organic food items shipped with care, lab-tested purity, and secure packaging",
  },
];

const SellingSection = () => {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
        {/* Section Context */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#116931] tracking-tight mb-3">
            Rajlakshmi Javiks in Numbers — Our Organic Impact
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-6xl mx-auto leading-relaxed">
            Since 2019, Rajlakshmi Javiks International has grown from a small
            organic food store in Indore to one of India's most trusted online
            organic food brands. Here is a snapshot of our journey in delivering
            pure, certified organic food products to thousands of Indian
            families.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-primary rounded-2xl py-6 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`
                  text-center px-4 py-4
                  md:border-r md:border-white/30
                  ${index === stats.length - 1 ? "md:border-r-0" : ""}
                `}
              >
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/90 text-sm md:text-base font-medium mt-1">
                  {stat.label}
                </p>
                <p className="text-primary-foreground/60 text-[10px] sm:text-xs mt-1 leading-snug hidden sm:block">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellingSection;
