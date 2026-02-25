import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import RLJLOGOJAVIK from "@/assets/logo/RAJLAXMI-JAVIK-png.png"; // logo import karo

const navigation = [
  { name: "Home", href: "/" },
  { name: "All Products", href: "/products" },
  {
    name: "Categories",
    href: "/categories",
    submenu: [
      { name: "Organic Grains", href: "/categories" },
      { name: "Organic Flours", href: "/categories" },
      { name: "Organic Oils", href: "/categories" },
      { name: "Organic Seeds", href: "/categories" },
      { name: "Dry Fruits", href: "/categories" },
      { name: "Organic Spices", href: "/categories" },
      { name: "Organic Ghee", href: "/categories" },
      { name: "Superfoods", href: "/categories" },
    ],
  },
  { name: "B2B", href: "/b2b" },
  { name: "Certifications", href: "/certifications" },
  { name: "Track Order", href: "/track-order" },
  { name: "Contact Us", href: "/contact" },
];

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

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
              {/* <span className="font-heading font-bold text-secondary-foreground text-lg lg:text-xl header-logo"></span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium text-sm">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-popover border-border">
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
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-foreground hover:text-primary hover:bg-accent"
            >
              <Search className="h-5 w-5" />
            </Button>
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
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/login" className="hidden sm:block">
              <Button className="bg-primary hover:bg-forest-light text-primary-foreground gap-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navigation.map((item) =>
                item.submenu ? (
                  <div key={item.name} className="flex flex-col">
                    <span className="px-4 py-2 font-medium text-foreground">
                      {item.name}
                    </span>
                    <div className="pl-8 flex flex-col">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="py-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-2 text-foreground hover:text-primary hover:bg-accent transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ),
              )}
              <div className="px-4 pt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button size="sm" className="flex-1 bg-primary">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
