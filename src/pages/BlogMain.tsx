import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

import productChana from "@/assets/product-chana.jpg";
import dealGhee from "@/assets/deal-ghee.jpg";
import productRice from "@/assets/product-rice.jpg";
import heroGhee from "@/assets/hero-ghee.jpg";
import productOil from "@/assets/product-oil.jpg";
import productMaize from "@/assets/product-maize.jpg";

import blogImg from "@/assets/blog/blogheader.png";

const allBlogs = [
  {
    id: 1,
    category: "Food Tips",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productRice,
  },
  {
    id: 2,
    category: "Health Benefits",
    title: "A2 Ghee",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: dealGhee,
  },
  {
    id: 3,
    category: "Sustainability",
    title: "Kabuli Chana",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productChana,
  },
  {
    id: 4,
    category: "Food Tips",
    title: "Cold Pressed Oil",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "15 Aug 2026",
    image: productOil,
  },
  {
    id: 5,
    category: "Organic Living",
    title: "Maize Flour",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "18 Aug 2026",
    image: productMaize,
  },
  {
    id: 6,
    category: "Health Benefits",
    title: "Pure A2 Ghee",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "20 Aug 2026",
    image: heroGhee,
  },
  {
    id: 7,
    category: "Food Tips",
    title: "Organic Rice",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "22 Aug 2026",
    image: productRice,
  },
  {
    id: 8,
    category: "Sustainability",
    title: "Natural Spices",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "25 Aug 2026",
    image: productChana,
  },
  {
    id: 9,
    category: "Organic Living",
    title: "Farm Fresh Ghee",
    description:
      "Explore the use of essential oils in skincare for various benefits and natural remedies.",
    author: "Rajlakshmi Javiks",
    date: "28 Aug 2026",
    image: dealGhee,
  },
];

const categories = [
  "All",
  "Food Tips",
  "Health Benefits",
  "Sustainability",
  "Organic Living",
];

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const blogsPerPage = 10;

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage,
  );

  const SidebarContent = () => (
    <>
      {/* Search */}
      <div className="bg-card rounded-xl p-4 shadow-soft">
        <h4 className="font-heading font-bold text-foreground mb-3">
          Search articles
        </h4>
        <div className="relative">
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-card rounded-xl p-4 shadow-soft">
        <h4 className="font-heading font-bold text-foreground mb-3">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Badge
              key={cat}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/10"
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <h4 className="font-heading font-bold text-foreground mb-3">
          Recent Posts
        </h4>
        <div className="space-y-2">
          {allBlogs.slice(0, 3).map((blog) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {blog.title}
            </Link>
          ))}
        </div>
        <Button
          className="w-full mt-4 bg-primary text-primary-foreground"
          onClick={() => {
            setSelectedCategory("All");
            setSearchQuery("");
            setCurrentPage(1);
            setIsFilterOpen(false);
          }}
        >
          Apply Filters
        </Button>
      </div>

      {/* Newsletter */}
      <div className="bg-primary rounded-xl p-5 text-primary-foreground">
        <h4 className="font-heading font-bold mb-2">
          Stay Updated with Healthy Living Tips
        </h4>
        <p className="text-sm opacity-90 mb-4">
          Get weekly organic food tips and exclusive offers.
        </p>
        <Input
          placeholder="Your email"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          className="mb-3 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/60"
        />
        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
          Subscribe
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
     
      <main className="flex-1 ">
        {/* Hero Section */}
        <section className="py-10 md:py-14 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Our Blog
              </h1>
              <p className="text-muted-foreground max-w-xl mb-6">
                Stay informed with expert tips, organic food guides, health
                benefits, and updates from the world of natural living. Our blog
                is designed to help you make better food choices for you and
                your family.
              </p>

              <Link to="/products">
                <Button
                  variant="outline"
                  className="rounded-md border-foreground text-foreground hover:bg-foreground hover:text-background"
                >
                  Explore all Articles
                </Button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="w-full">
              <img
                src={blogImg}
                alt="Blog header"
                className="w-full h-[220px] md:h-[300px] lg:h-[360px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 mx-auto pb-16">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Blog Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {paginatedBlogs.map((blog) => (
                  <Link to={`/blog/${blog.id}`} key={blog.id}>
                    <article className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 h-full">
                      <div className="relative p-3 pb-0">
                        <div className="relative overflow-hidden rounded-xl">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-40 object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-forest text-white text-xs font-medium px-3 py-1 rounded-full">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                          {blog.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {blog.description}
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          By {blog.author} | {blog.date}
                        </p>
                        <span className="text-forest font-medium text-sm flex items-center gap-1">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">
                    Previous
                  </span>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="icon"
                      className={`w-9 h-9 rounded-md ${currentPage === i + 1 ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <span
                    className="text-sm text-muted-foreground ml-2 cursor-pointer"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                  >
                    Next <ChevronRight className="w-4 h-4 inline" />
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-6">
              <SidebarContent />
            </aside>
          </div>
        </section>

        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background overflow-y-auto p-6 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-bold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div
              className="bg-white rounded-2xl shadow-md border border-gray-200 py-14 px-6 md:px-12 text-center 
transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-5">
                Explore Our Organic Products
              </h2>

              <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Reading is just the beginning — experience purity in every
                product.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-green-700 hover:bg-green-800 text-white rounded-md px-8 py-5 text-lg 
transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Shop Now
                </Button>

                <Button
                  variant="ghost"
                  className="border border-green-700 text-green-700 hover:bg-green-50 rounded-md px-8 py-5 text-lg 
  transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link to="/certifications">Explore Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blogs;
