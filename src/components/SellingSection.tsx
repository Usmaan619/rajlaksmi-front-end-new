const stats = [
  { value: "546+", label: "Registered Riders" },
  { value: "35k+", label: "KG Ghee Delivered" },
  { value: "250+", label: "Our Products" },
  { value: "17,457+", label: "Food Items" },
];

const SellingSection = () => {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 relative z-10">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellingSection;
