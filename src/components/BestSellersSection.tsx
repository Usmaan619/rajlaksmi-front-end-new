import { useState } from "react";
import { Heart, Star, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import productOil from "@/assets/product-oil.jpg";
import productMaize from "@/assets/product-maize.jpg";
import productNutmeg from "@/assets/product-nutmeg.jpg";
import productRice from "@/assets/product-rice.jpg";

const products = [
  {
    id: 1,
    name: "Organic Oil",
    image: productOil,
    price: 899,
    originalPrice: 1800,
    discount: 50,
    rating: 4.5,
    unit: "1000ml",
    units: ["500ml", "1000ml", "2L"],
  },
  {
    id: 2,
    name: "Organic Maize whole",
    image: productMaize,
    price: 89,
    originalPrice: 180,
    discount: 50,
    rating: 4.5,
    unit: "1000gm",
    units: ["500gm", "1000gm", "2kg"],
  },
  {
    id: 3,
    name: "Organic Nutmeg Whole",
    image: productNutmeg,
    price: 899,
    originalPrice: 1800,
    discount: 50,
    rating: 4.5,
    unit: "1000gm",
    units: ["250gm", "500gm", "1000gm"],
  },
  {
    id: 4,
    name: "Organic Idli Rice",
    image: productRice,
    price: 89,
    originalPrice: 180,
    discount: 50,
    rating: 4.5,
    unit: "1000gm",
    units: ["500gm", "1000gm", "5kg"],
  },
];

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(product.unit);
  const [showUnits, setShowUnits] = useState(false);

  return (
    <Card
      className="
        w-full
        lg:w-[290px]
        h-auto
        lg:h-[448px]
        p-3 sm:p-4
        rounded-2xl
        border
        bg-popover
        flex
        flex-col
        gap-2
        overflow-hidden
        group
        hover:shadow-lg
        transition-shadow
      "
    >
      {/* Image */}
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-medium text-sm sm:text-base line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2 mt-1">
          <span className="text-base sm:text-lg font-bold">
            ₹{product.price}
          </span>

          <span className="text-xs sm:text-sm line-through text-gray-400">
            ₹{product.originalPrice}
          </span>

          <span className="bg-green-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded">
            {product.discount}% OFF
          </span>
        </div>

        {/* Unit + Rating */}
        <div className="flex items-center justify-between mt-2">
          <div className="relative">
            <button
              onClick={() => setShowUnits(!showUnits)}
              className="flex items-center gap-1 border rounded px-2 py-1 text-[11px] sm:text-xs"
            >
              {selectedUnit}
              <ChevronDown className="h-3 w-3" />
            </button>

            {showUnits && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow z-10">
                {product.units.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => {
                      setSelectedUnit(unit);
                      setShowUnits(false);
                    }}
                    className="block w-full px-3 py-1 text-xs hover:bg-gray-100"
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs sm:text-sm">{product.rating}</span>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-2 mt-auto">
        <button className="flex-1 border border-[hsl(140,60%,30%)] text-[hsl(140,60%,30%)] text-xs py-1.5 rounded-md hover:bg-[hsl(140,60%,30%)] hover:text-white transition-colors font-medium">
          Add to Cart
        </button>
        <button className="flex-1 bg-[hsl(140,60%,30%)] text-white text-xs py-1.5 rounded-md hover:bg-[hsl(140,60%,25%)] transition-colors font-medium">
          Buy Now
        </button>
      </div>
    </Card>
  );
};

const BestSellersSection = () => {
  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
            Best Sellers
          </h2>
        </div>

        {/* Grid */}
        <div
          className="
  grid
  grid-cols-2
  sm:grid-cols-3
  md:grid-cols-4
  gap-4 sm:gap-6
  lg:[grid-template-columns:repeat(auto-fit,290px)]
"
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
