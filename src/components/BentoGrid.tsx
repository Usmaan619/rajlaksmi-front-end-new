const BentoGrid = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Large card - spans 2 cols and 2 rows */}
        <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-[hsl(120,60%,40%)] to-[hsl(65,80%,55%)] min-h-[200px]" />

        {/* Top middle card */}
        <div className="rounded-3xl bg-gradient-to-br from-[hsl(100,50%,45%)] to-[hsl(75,70%,50%)] min-h-[120px]" />

        {/* Right tall card - spans 2 rows */}
        <div className="md:row-span-2 rounded-3xl bg-gradient-to-b from-[hsl(110,55%,42%)] to-[hsl(60,75%,52%)] min-h-[200px]" />

        {/* Bottom middle card */}
        <div className="rounded-3xl bg-gradient-to-br from-[hsl(90,55%,48%)] to-[hsl(70,65%,55%)] min-h-[120px]" />
      </div>
    </section>
  );
};

export default BentoGrid;
