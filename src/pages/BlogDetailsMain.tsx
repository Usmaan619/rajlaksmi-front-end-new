import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Clock, User, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import LogoImg from "@/assets/logo/RAJLAXMI-JAVIK-png.png";
import { getBlogBySlug } from "@/api/blog.service";

const BlogDetail = () => {
  const { id: slug } = useParams(); // Using 'id' param as 'slug' based on routes
  const [blog, setBlog] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;
      setIsLoading(true);
      // 2-second delay for skeleton
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const [res] = await Promise.all([getBlogBySlug(slug), delay]);

        if (res.success) {
          setBlog(res.blog);
          setRelatedArticles(res.relatedArticles || []);
        }
      } catch (err) {
        console.error("Failed to fetch blog detail:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <main className="flex-1">
          <article className="w-full max-w-[1650px] mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
              <div className="w-full lg:w-[70%] space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-80 w-full rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
              <div className="w-full lg:w-[30%] space-y-6">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </article>
        </main>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
        <Link to="/blog">
          <Button>Back to Blogs</Button>
        </Link>
      </div>
    );
  }

  // Parse content if it's JSON
  let content = blog.content;
  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch (e) {
      content = { intro: blog.content, sections: [] };
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Article Section */}
        <article className="w-full max-w-[1650px] mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
            {/* Main Article Content */}
            <div className="w-full lg:w-[70%]">
              {/* Article Header */}
              <header className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>

                {/* Article Meta Information */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1.5">
                    <span className="font-medium">By {blog.author}</span>
                  </span>
                  <span className="hidden sm:inline">·</span>
                  <time dateTime={blog.created_at}>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </time>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />{" "}
                    {blog.read_time || "5 min read"}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              <figure className="mb-6">
                {blog.image_url ? (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-80 bg-muted rounded-lg" />
                )}
              </figure>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {content?.intro}
                </p>

                {/* Article Sections */}
                {content?.sections?.map((section: any, idx: number) => (
                  <section key={idx} className="mb-8" id={`section-${idx}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      {section.text}
                    </p>

                    {section.benefits && Array.isArray(section.benefits) && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Benefits:
                        </h3>
                        <ul className="space-y-2.5">
                          {section.benefits.map(
                            (benefit: string, bIdx: number) => (
                              <li
                                key={bIdx}
                                className="flex items-start gap-2.5 text-gray-700"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"
                                  style={{ marginTop: "0.5rem" }}
                                />
                                <span>{benefit}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}

                {/* Key Takeaways Box */}
                {content?.keyTakeaways &&
                  Array.isArray(content.keyTakeaways) &&
                  content.keyTakeaways.length > 0 && (
                    <aside className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-100 rounded-2xl p-6 md:p-8 my-10 shadow-md">
                      <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 text-[#01722C] flex items-center gap-2">
                        Key Takeaways
                      </h3>
                      <ul className="space-y-3">
                        {content.keyTakeaways.map(
                          (point: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-foreground"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#01722C] mt-2 shrink-0" />
                              <span className="font-medium">{point}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </aside>
                  )}

                {/* Static Sections */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-[#01722C] mb-3">
                    Sustainable Health with Rajlakshmi Javiks
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Our commitment to organic quality ensures that you get the
                    most nutritional value from every bite. Whether it's the
                    pure A2 Ghee or our hand-picked pulses, we prioritize your
                    wellness and the planet's health.
                  </p>
                </section>

                {/* Call-to-Action Section */}
                <section className="bg-[#F0FFF0] text-[#01722C] rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-3">
                    Experience Pure Organic Food with Rajlakshmi Javiks
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    Discover our wide range of naturally grown and lab-tested
                    organic food products, carefully sourced for quality and
                    purity.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/products">
                      <Button className="bg-[#01722C] hover:bg-[#01722C] text-white rounded-xl px-7 py-3 font-semibold text-base shadow-sm transition-all duration-300">
                        Shop Organic Products
                      </Button>
                    </Link>

                    <Link to="/products">
                      <Button className="bg-[#F0FFF0] text-[#01722C] hover:text-white border border-[#01722C]  rounded-xl px-7 py-3 font-semibold text-base transition-all duration-300">
                        Explore Categories
                      </Button>
                    </Link>
                  </div>
                </section>

                {/* Author Bio */}
                <aside className="bg-white border border-gray-200 rounded-2xl p-8 mb-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <img
                      src={LogoImg}
                      alt="Rajlakshmi Javiks"
                      className="w-20 h-20 rounded-full object-cover border border-gray-200 p-2 bg-white flex-shrink-0"
                    />

                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-[#1C7C3A] mb-3">
                        About the Author
                      </h4>

                      <p className="text-gray-600 text-base leading-relaxed max-w-3xl">
                        Rajlakshmi Javiks is an organic food brand committed to
                        promoting healthy living through clean, natural, and
                        sustainable food choices.
                      </p>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-[30%] flex-shrink-0">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Need Help Section */}
                <nav
                  className="bg-green-600 text-white rounded-lg p-6"
                  aria-label="Table of contents"
                >
                  <h4 className="text-lg font-bold mb-4">Need Help?</h4>
                  <p className="text-sm mb-4 leading-relaxed">
                    Can't find what you are looking for? We are here to help
                    you. Contact us and we'll get back to you as soon as
                    possible.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">☎ +91 745 0532 522</p>
                    <p className="text-sm font-semibold">
                      ✉ contact@rajlakshmiijaviks.com
                    </p>
                  </div>
                </nav>

                {/* Related Articles Widget */}
                {relatedArticles.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">
                      RELATED ARTICLES
                    </h4>
                    <div className="space-y-4">
                      {relatedArticles.map((article) => (
                        <Link
                          to={`/blog/${article.slug}`}
                          key={article.id}
                          className="flex items-start gap-3 group"
                        >
                          {article.image_url ? (
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-green-600 font-semibold mb-1 uppercase tracking-wider">
                              {article.category}
                            </p>
                            <p className="text-sm font-bold text-gray-900 group-hover:text-green-600 line-clamp-2 mb-1">
                              {article.title}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {new Date(
                                article.created_at,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      to="/blog"
                      className="block text-center text-sm text-green-600 font-semibold border-2 border-green-600 rounded-md px-4 py-2 hover:bg-green-600 hover:text-white transition-colors"
                      style={{ marginTop: "1rem" }}
                    >
                      View all
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </article>

        {/* Bottom Related Grid */}
        {relatedArticles.length > 0 && (
          <section className="px-4 sm:px-6 md:px-8 lg:px-12 mx-auto pb-16 mb-10">
            <h3 className="text-2xl font-bold mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
              {relatedArticles.slice(0, 5).map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <article className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 h-full">
                    <div className="relative p-3 pb-0">
                      <div className="relative overflow-hidden rounded-xl">
                        {article.image_url ? (
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-40 object-cover"
                          />
                        ) : (
                          <div className="w-full h-40 bg-muted" />
                        )}
                        <Badge className="absolute top-2 left-2 bg-forest text-white text-xs font-medium px-3 py-1 rounded-full">
                          {article.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-heading font-bold text-lg text-foreground mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {article.description}
                      </p>
                      <span className="text-forest font-medium text-sm flex items-center gap-1">
                        Read more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BlogDetail;
