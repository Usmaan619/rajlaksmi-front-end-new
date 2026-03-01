import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBlogs } from "@/api/blog.service";
import { useNavigate } from "react-router-dom";

import productRice from "@/assets/product-rice.jpg";

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlogs({ limit: 5 });
        if (res.success) {
          setBlogs(res.blogs);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#01722C]">
            Blogs
          </h2>
          <button
            onClick={() => navigate("/blog")}
            className="text-[#01722C] font-medium hover:underline"
          >
            View all
          </button>
        </div>

        {/* Mobile: Horizontal Scroll | Tablet: 3 Grid | Desktop: 5 Grid */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory
                     md:grid md:grid-cols-3
                     lg:grid-cols-5
                     md:gap-6 md:overflow-visible"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[260px] bg-card rounded-[20px] border p-[15px] space-y-3"
                >
                  <Skeleton className="h-[160px] w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : blogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="min-w-[260px] max-w-[280px] md:min-w-0 md:max-w-full snap-start bg-card rounded-[20px] border p-[15px] flex flex-col shadow-soft hover:shadow-card transition-shadow duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={blog.image || productRice}
                      alt={blog.title}
                      className="w-full h-[160px] object-cover rounded-xl"
                    />
                    <Badge
                      className={`absolute top-2 left-2 bg-forest text-white text-xs font-medium px-3 py-1 rounded-full`}
                    >
                      {blog.category || "Organic"}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 mt-3">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1 line-clamp-1">
                      {blog.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                      {blog.description || "Explore healthy living tips..."}
                    </p>

                    <p className="text-xs text-muted-foreground mb-3">
                      By {blog.author || "Admin"} |{" "}
                      {blog.created_at
                        ? new Date(blog.created_at).toLocaleDateString()
                        : "Aug 12, 2026"}
                    </p>

                    <button className="mt-auto text-[#01722C] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
