import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { getCategories, Category } from "@/api/category.service";
import HeaderProfile from "./Header/HeaderProfile";

const categoryOrder = [
  "PULSES",
  "MILLET",
  "RICE  WHEAT",
  "MASALA",
  "SWEETS",
  "HONEY",
  "DRY FRUITS",
  "SEEDS",
  "OTHER ITEMS",
  "OILS  GHEE",
  "RLJ PRODUCTS",
  "HOME MADE AACHAR",
  "KHAKHRA",
  "KHAPLI WHEAT KHAKHRA (EMMER WHEAT)",
  "MILLETS KHAKHRA",
  "FASTING / UPVAS SPECIAL - GLUTEN FREE KHAKHRA",
  "ROASTED MILLET DRY BHAKRI",
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res.success && res.data) {
          const sorted = [...res.data].sort((a, b) => {
            const indexA = categoryOrder.indexOf(a.category_name);
            const indexB = categoryOrder.indexOf(b.category_name);
            const finalIndexA = indexA === -1 ? 999 : indexA;
            const finalIndexB = indexB === -1 ? 999 : indexB;
            return finalIndexA - finalIndexB;
          });
          setCategories(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    {
      name: "Categories",
      href: "/categories",
      submenu:
        categories.length > 0
          ? categories.map((cat) => ({
              name: cat.category_name,
              href: `/categories?category=${encodeURIComponent(cat.category_name)}`,
            }))
          : [
              {
                name: "Organic Grains",
                href: "/categories?category=Organic Grains",
              },
              {
                name: "Organic Flours",
                href: "/categories?category=Organic Flours",
              },
              {
                name: "Organic Oils",
                href: "/categories?category=Organic Oils",
              },
              {
                name: "Organic Seeds",
                href: "/categories?category=Organic Seeds",
              },
              { name: "Dry Fruits", href: "/categories?category=Dry Fruits" },
              {
                name: "Organic Spices",
                href: "/categories?category=Organic Spices",
              },
              {
                name: "Organic Ghee",
                href: "/categories?category=Organic Ghee",
              },
              { name: "Superfoods", href: "/categories?category=Superfoods" },
            ],
    },
    { name: "B2B", href: "/b2b" },
    { name: "Certifications", href: "/certifications" },
    {
      name: "Track Order",
      href: "https://panel.shipmozo.com/track-order/LBYfQgGFRljv1A249H87",
    },
    { name: "Contact Us", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-popover shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 lg:w-12 lg:h-12  rounded-full flex items-center justify-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={RLJLOGOJAVIK}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium text-sm outline-none">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover border-border max-h-[70vh] overflow-y-auto">
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link to={subItem.href} className="cursor-pointer">
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary transition-colors font-medium text-sm ${location.pathname === item.href ? "text-primary border-b-2 border-primary" : ""}`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex items-center relative"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-1.5 rounded-full border border-border bg-popover text-sm focus:outline-none focus:ring-1 focus:ring-primary w-40 lg:w-60 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-foreground hover:text-primary hover:bg-accent relative"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:text-primary hover:bg-accent relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#f4b42b] text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <HeaderProfile />

            {/* Mobile Menu Button - Wrapped in Sheet */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-foreground ml-1"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85%] sm:max-w-sm p-0 flex flex-col"
              >
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <img src={RLJLOGOJAVIK} alt="Logo" className="w-8 h-8" />
                    <span>Rajlakshmi Javik</span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="flex flex-col px-2">
                    {navigation.map((item) =>
                      item.submenu ? (
                        <Accordion
                          type="single"
                          collapsible
                          key={item.name}
                          className="w-full"
                        >
                          <AccordionItem
                            value={item.name}
                            className="border-none"
                          >
                            <AccordionTrigger className="px-4 py-2 hover:no-underline font-medium text-foreground hover:bg-accent rounded-md transition-colors">
                              {item.name}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-6 flex flex-col gap-1 mt-1">
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className="px-4 py-2 text-muted-foreground hover:text-primary transition-colors text-sm rounded-md hover:bg-accent/50"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="px-4 py-2 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ),
                    )}
                  </nav>

                  <div className="px-4 pt-6 border-t mt-6 flex flex-col gap-4">
                    <form
                      onSubmit={handleSearch}
                      className="relative flex items-center"
                    >
                      <Input
                        placeholder="Search products..."
                        className="pr-10 bg-accent/30 border-none rounded-full h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 text-muted-foreground"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>

                    {isAuthenticated ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 px-3 py-3 bg-accent/30 rounded-xl">
                          <Avatar className="h-10 w-10 border border-primary/20">
                            <AvatarImage
                              src={user?.profile_image}
                              alt={user?.full_name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {user?.full_name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold truncate max-w-[150px]">
                              {user?.full_name}
                            </span>
                            <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            variant="outline"
                            className="w-full justify-start rounded-xl h-11"
                          >
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          className="w-full justify-start rounded-xl h-11"
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-primary justify-start rounded-xl h-11">
                          <User className="h-4 w-4 mr-2" />
                          Login / Register
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
