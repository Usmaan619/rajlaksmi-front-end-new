import { useState } from "react";
import { ChevronLeft, ChevronRight, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Heart, Star, ChevronDown } from "lucide-react";
import productChana from "@/assets/product-chana.jpg";
import productMaize from "@/assets/product-maize.jpg";
import productNutmeg from "@/assets/product-nutmeg.jpg";
import WhyChooseRajlakshmiSection from "@/components/WhyChooseRajlakshmiSection";
import ContactSection from "@/components/ContactSection";
import TestimonialSection from "@/components/TestimonialSection";
import CertificationsBottomSection from "@/components/CertificationsBottomSection";

const allProducts = [
  {
    id: 1,
    name: "Organic Kabuli Chana",
    image: productChana,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Organic Maize Whole",
    image: productMaize,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: "Best Seller",
  },
  {
    id: 3,
    name: "Organic Nutmeg Whole",
    image: productNutmeg,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: "Best Seller",
  },
  {
    id: 4,
    name: "Organic Nutmeg Whole",
    image: productNutmeg,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 5,
    name: "Organic Kabuli Chana",
    image: productChana,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 6,
    name: "Organic Maize Whole",
    image: productMaize,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 7,
    name: "Organic Maize Whole",
    image: productMaize,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 8,
    name: "Organic Nutmeg Whole",
    image: productNutmeg,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 9,
    name: "Organic Kabuli Chana",
    image: productChana,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 10,
    name: "Organic Maize Whole",
    image: productMaize,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 11,
    name: "Organic Kabuli Chana",
    image: productChana,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
  {
    id: 12,
    name: "Organic Nutmeg Whole",
    image: productNutmeg,
    price: 899,
    mrp: 1800,
    discount: "50%Off",
    rating: 4.5,
    weight: "1000g",
    badge: null,
  },
];

const ITEMS_PER_PAGE = 9;

const ProductCard = ({ product }: { product: (typeof allProducts)[0] }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        w-full
        lg:w-[290px]
        h-auto
        lg:h-[448px]
        cursor-pointer
        bg-popover
        border
        border-border
        rounded-[20px]
        overflow-visible

        group
        hover:shadow-card
        transition-all
        duration-300
        p-3
        flex
        flex-col
        gap-[10px]
      "
    >
      {/* Image */}
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

      {/* Content */}
      <div className="space-y-2 flex-1 flex flex-col">
        <h3 className="font-medium text-foreground text-sm line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-primary font-bold text-base">
            ₹{product.price}
          </span>
          <span className="text-muted-foreground line-through text-xs">
            ₹{product.mrp}
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
            {product.weight}
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            className="flex-1 text-[11px] sm:text-xs md:text-sm h-8 sm:h-9"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Cart
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-[11px] sm:text-xs md:text-sm h-8 sm:h-9 bg-white border-border"
            onClick={(e) => e.stopPropagation()}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const FilterContent = () => (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Input
          placeholder="Find your products"
          className="pr-10 bg-white border-border"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Category
        </label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-popover border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="grains">Organic Grains</SelectItem>
            <SelectItem value="flours">Organic Flours</SelectItem>
            <SelectItem value="oils">Organic Oils</SelectItem>
            <SelectItem value="seeds">Organic Seeds</SelectItem>
            <SelectItem value="dryfruits">Dry Fruits</SelectItem>
            <SelectItem value="spices">Organic Spices</SelectItem>
            <SelectItem value="ghee">Organic Ghee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Weight Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Weight
        </label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-popover border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="250g">250g</SelectItem>
            <SelectItem value="500g">500g</SelectItem>
            <SelectItem value="1000g">1000g</SelectItem>
            <SelectItem value="2000g">2000g</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Filter */}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">
          Price Range
        </label>
        <Select defaultValue="all">
          <SelectTrigger className="bg-popover border-border">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0-500">₹0 - ₹500</SelectItem>
            <SelectItem value="500-1000">₹500 - ₹1000</SelectItem>
            <SelectItem value="1000+">₹1000+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="bg-white flex-1 border-border text-muted-foreground"
        >
          Clear
        </Button>
        <Button className="flex-1 bg-primary text-primary-foreground">
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
    

      <main className="flex-1 mt-5">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Title + mobile filter */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
              All Products
            </h2>

            {/* Mobile Filter Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileFilterOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Products */}
            <div className="flex-1">
              <div
                className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-4
    gap-4
    lg:gap-6
    lg:justify-center
    lg:[grid-template-columns:repeat(auto-fit,290px)]
  "
              >
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 text-xs"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28">
                <FilterContent />
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileFilterOpen(false)}
              >
                Close
              </Button>
            </div>
            <FilterContent />
          </div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setMobileFilterOpen(false)} />
        </div>
      )}

      <WhyChooseRajlakshmiSection />
      <ContactSection />
      <TestimonialSection />
      <CertificationsBottomSection className="bg-[#F0FFF0]" />
    </div>
  );
};

export default AllProducts;
