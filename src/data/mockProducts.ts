import { Product } from "@/types/product";
import gheeImage from "@/assets/category-ghee.jpg";
import oilImage from "@/assets/category-oils.jpg";
import flourImage from "@/assets/category-flours.jpg";
import spiceImage from "@/assets/category-spices.jpg";
import seedImage from "@/assets/category-seeds.jpg";
import dryfruitImage from "@/assets/category-dryfruits.jpg";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    product_name: "A2 Gir Cow Bilona Ghee",
    price: 1200,
    mrp: 1500,
    product_del_price: 1500,
    discount: 20,
    rating: 4.9,
    product_images: JSON.stringify([gheeImage]),
    weight_options: JSON.stringify([
      { weight: "500ml", price: 1200 },
      { weight: "1L", price: 2300 }
    ]),
    category_id: 1,
    category_name: "OILS  GHEE",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 102,
    product_name: "Cold Pressed Mustard Oil",
    price: 350,
    mrp: 450,
    product_del_price: 450,
    discount: 22,
    rating: 4.7,
    product_images: JSON.stringify([oilImage]),
    weight_options: JSON.stringify([
      { weight: "1L", price: 350 },
      { weight: "5L", price: 1650 }
    ]),
    category_id: 1,
    category_name: "OILS  GHEE",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 103,
    product_name: "Premium Khapli Flour",
    price: 180,
    mrp: 220,
    product_del_price: 220,
    discount: 18,
    rating: 4.8,
    product_images: JSON.stringify([flourImage]),
    weight_options: JSON.stringify([
      { weight: "1kg", price: 180 },
      { weight: "5kg", price: 850 }
    ]),
    category_id: 2,
    category_name: "RICE  WHEAT",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 104,
    product_name: "Pure Turmeric Powder",
    price: 120,
    mrp: 160,
    product_del_price: 160,
    discount: 25,
    rating: 4.6,
    product_images: JSON.stringify([spiceImage]),
    weight_options: JSON.stringify([
      { weight: "250g", price: 120 },
      { weight: "500g", price: 220 }
    ]),
    category_id: 3,
    category_name: "MASALA",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 105,
    product_name: "Organic Flax Seeds",
    price: 90,
    mrp: 110,
    product_del_price: 110,
    discount: 15,
    rating: 4.5,
    product_images: JSON.stringify([seedImage]),
    weight_options: JSON.stringify([
      { weight: "200g", price: 90 },
      { weight: "500g", price: 200 }
    ]),
    category_id: 4,
    category_name: "SEEDS",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 106,
    product_name: "California Almonds",
    price: 450,
    mrp: 550,
    product_del_price: 550,
    discount: 18,
    rating: 4.9,
    product_images: JSON.stringify([dryfruitImage]),
    weight_options: JSON.stringify([
      { weight: "250g", price: 450 },
      { weight: "500g", price: 850 }
    ]),
    category_id: 5,
    category_name: "DRY FRUITS",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 107,
    product_name: "Millet Mix Flours",
    price: 260,
    mrp: 320,
    product_del_price: 320,
    discount: 19,
    rating: 4.7,
    product_images: JSON.stringify([flourImage]),
    weight_options: JSON.stringify([
      { weight: "1kg", price: 260 },
      { weight: "2kg", price: 500 }
    ]),
    category_id: 6,
    category_name: "MILLET",
    STATUS: "active",
    created_at: new Date().toISOString()
  },
  {
    id: 108,
    product_name: "Natural Forest Honey",
    price: 480,
    mrp: 600,
    product_del_price: 600,
    discount: 20,
    rating: 4.8,
    product_images: JSON.stringify([dryfruitImage]),
    weight_options: JSON.stringify([
      { weight: "500g", price: 480 },
      { weight: "1kg", price: 900 }
    ]),
    category_id: 7,
    category_name: "HONEY",
    STATUS: "active",
    created_at: new Date().toISOString()
  }
];
