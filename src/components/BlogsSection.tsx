import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import productChana from "@/assets/product-chana.jpg";
import dealGhee from "@/assets/deal-ghee.jpg";
import productRice from "@/assets/product-rice.jpg";
import heroGhee from "@/assets/hero-ghee.jpg";

const blogs = [
  {
    id: 1,
    category: "Food Tips",
    categoryColor: "bg-forest text-white",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productRice,
  },
  {
    id: 2,
    category: "Health Benefits",
    categoryColor: "bg-forest text-white",
    title: "A2 Ghee",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: dealGhee,
  },
  {
    id: 3,
    category: "Sustainability",
    categoryColor: "bg-forest text-white",
    title: "Kabuli Chana",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productChana,
  },
  {
    id: 4,
    category: "Organic Living",
    categoryColor: "bg-forest text-white",
    title: "A2 Ghee",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: heroGhee,
  },
  {
    id: 5,
    category: "Sustainability",
    categoryColor: "bg-forest text-white",
    title: "Kabuli Chana",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productChana,
  },
];

const BlogsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
            Blogs
          </h2>
        </div>

        {/* Mobile: Horizontal Scroll | Tablet: 3 Grid | Desktop: 5 Grid */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory
                     md:grid md:grid-cols-3
                     lg:grid-cols-5
                     md:gap-6 md:overflow-visible"
        >
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="min-w-[260px] max-w-[280px] md:min-w-0 md:max-w-full snap-start bg-card rounded-[20px] border p-[15px] flex flex-col shadow-soft hover:shadow-card transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[160px] object-cover rounded-xl"
                />
                <Badge
                  className={`absolute top-2 left-2 ${blog.categoryColor} text-xs font-medium px-3 py-1 rounded-full`}
                >
                  {blog.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 mt-3">
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {blog.description}
                </p>

                <p className="text-xs text-muted-foreground mb-3">
                  By {blog.author} | {blog.date}
                </p>

                <button className="mt-auto text-[#01722C] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="rounded-md px-8 py-2 border-[#01722C] text-[#01722C] hover:bg-[#01722C] hover:text-white transition-colors"
          >
            View all
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
