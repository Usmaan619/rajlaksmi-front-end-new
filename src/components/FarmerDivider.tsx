import farmerImg from "@/assets/category/farmer.png";

const FarmerDivider = () => {
  return (
    <div className="relative w-full  overflow-visible">
      <img
        src={farmerImg}
        alt="farmer illustration"
        className="
          pointer-events-none
          select-none
          absolute
          right-0
          top-1/2
          -translate-y-1/3
          w-[160px]
          sm:w-[210px]
          md:w-[240px]
          lg:w-[282px]
          opacity-40
          z-40
        "
      />
    </div>
  );
};

export default FarmerDivider;
