import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import productChana from "@/assets/product-chana.jpg";
import productMaize from "@/assets/product-maize.jpg";
import productNutmeg from "@/assets/product-nutmeg.jpg";
import productRice from "@/assets/product-rice.jpg";
import productOil from "@/assets/product-oil.jpg";

import bgPattern from "@/assets/ourproductwithcategory/ourProductWithCategory.png";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Organic Kabuli Chana",
    image: productChana,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 2,
    name: "Organic Maize whole",
    image: productMaize,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 3,
    name: "Organic Nutmeg Whole",
    image: productNutmeg,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 4,
    name: "Organic Idli Rice",
    image: productRice,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 5,
    name: "Cold Pressed Oil",
    image: productOil,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 6,
    name: "Cold Pressed Oil",
    image: productOil,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 4,
    name: "Organic Idli Rice",
    image: productRice,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 5,
    name: "Cold Pressed Oil",
    image: productOil,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
  {
    id: 6,
    name: "Cold Pressed Oil",
    image: productOil,
    price: 899,
    originalPrice: 1800,
    discount: "50%OFF",
    rating: 4.5,
    unit: "1000gm",
  },
];

const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      className="w-[290px] h-[448px] cursor-pointer bg-popover border border-border rounded-[20px] overflow-visible
 group hover:shadow-card transition-all duration-300 p-[20px] flex flex-col gap-[10px]"
    >
      <div className="relative">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-popover shadow-soft flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="space-y-2 flex-1">
        <h3 className="font-medium text-foreground text-sm line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-primary font-bold text-base">
            ₹{product.price}
          </span>
          <span className="text-muted-foreground line-through text-xs">
            ₹{product.originalPrice}
          </span>
          <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
            {product.discount}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-2 py-1 rounded-md border text-xs"
          >
            {product.unit}
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-golden text-golden" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1 mt-auto">
          <Button
            size="sm"
            className="flex-1 text-xs h-8"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Cart
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8"
            onClick={(e) => e.stopPropagation()}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

const RelatedProduct = () => {
  const [api, setApi] = useState<CarouselApi>();
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [api]);

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const startAutoplay = () => {
    if (!api) return;
    autoplayRef.current = setInterval(() => {
      api.scrollNext();
    }, 3000);
  };

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
    <section className="py-12  lg:py-16 bg-gradient-to-b from-[#EBF4EE] to-white relative overflow-hidden mb-5">
      <div className="mx-auto px-10 relative z-10">
        <h2 className="text-3xl font-bold text-[#01722C] mb-6">
          Related Products
        </h2>

        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="pl-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-auto mr-4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
