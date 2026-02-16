import farmerImg from "@/assets/exclusive/exclusiveFarmer.svg";

const FarmerDividerExclusive = () => {
  return (
    <div className="relative w-full overflow-visible">
      {/* Farmer Illustration */}
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
    opacity-50
    z-50
    w-[160px]
    sm:w-[220px]
    md:w-[300px]
    lg:w-[447px]
    h-auto
    lg:h-[230px]
  "
      />
    </div>
  );
};

export default FarmerDividerExclusive;
