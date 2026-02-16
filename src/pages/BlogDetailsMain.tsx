import { useParams, Link } from "react-router-dom";
import { ArrowRight, Clock, User, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import productChana from "@/assets/product-chana.jpg";
import dealGhee from "@/assets/deal-ghee.jpg";
import productRice from "@/assets/product-rice.jpg";
import heroGhee from "@/assets/hero-ghee.jpg";
import LogoImg from "@/assets/logo/RAJLAXMI-JAVIK-png.png";

const blogsData = [
  {
    id: 1,
    category: "Food Tips",
    title: "Why Organic Food is Better for Your Health",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "August 13, 2025",
    readTime: "5 min read",
    image: productRice,
    content: {
      intro:
        "Organic food has become an essential part of healthy living for many families today. With increasing awareness about food safety, nutrition, and sustainability, people are turning towards organic products as a cleaner and more natural choice. In this article, we explore why organic food is better for your health and how it supports long-term wellness.",
      sections: [
        {
          title: "What is Organic Food?",
          text: "Organic food is produced using natural farming methods without the use of synthetic chemicals, pesticides, or genetically modified organisms (GMOs). These foods are grown in healthy soil and processed with care to retain their natural goodness.",
          benefits: [
            "Free from harmful chemicals — Organic foods are grown without synthetic pesticides or chemical fertilizers, reducing the risk of harmful residues in your diet.",
            "Rich in Nutrients — Studies suggest that organic food may contain higher levels of essential nutrients such as antioxidants.",
            "Better for Digestion — Natural farming practices help maintain the food's natural structure, making it easier to digest.",
            "Supports Immunity — Choosing clean, chemical-free food helps strengthen the immune system over time.",
          ],
        },
        {
          title: "Organic Food & Environmental Health",
          text: "Organic farming supports soil health, reduces water pollution, and promotes biodiversity. Choosing organic is not only beneficial for your own health but also for the planet.",
        },
      ],
      keyTakeaways: [
        "Organic food is grown naturally without harmful chemicals",
        "It supports long-term health and immunity",
        "Better for digestion and overall wellness",
        "Environment-friendly farming practices",
      ],
    },
  },
  {
    id: 2,
    category: "Health Benefits",
    title: "The Amazing Benefits of A2 Ghee",
    description:
      "Discover why A2 Ghee is considered a superfood in traditional medicine.",
    author: "Rajlakshmi Javiks",
    date: "August 15, 2025",
    readTime: "4 min read",
    image: dealGhee,
    content: {
      intro:
        "A2 Ghee has been a staple in traditional Indian households for centuries. Made from the milk of indigenous cow breeds, it offers numerous health benefits that modern science is now beginning to validate.",
      sections: [
        {
          title: "What Makes A2 Ghee Special?",
          text: "A2 Ghee is made from A2 milk, which contains the A2 beta-casein protein. Unlike regular ghee made from A1 milk, A2 Ghee is easier to digest and offers superior nutritional benefits.",
          benefits: [
            "Rich in healthy fats and fat-soluble vitamins A, D, E, and K.",
            "Contains conjugated linoleic acid (CLA) which supports metabolism.",
            "Promotes gut health and aids digestion.",
            "Strengthens bones and supports brain function.",
          ],
        },
      ],
      keyTakeaways: [
        "A2 Ghee is made from indigenous cow milk",
        "Rich in vitamins and healthy fats",
        "Better digestibility than regular ghee",
        "Supports overall wellness traditionally",
      ],
    },
  },
  {
    id: 3,
    category: "Sustainability",
    title: "Sustainable Farming and Kabuli Chana",
    description: "Learn about sustainable practices in chana farming.",
    author: "Rajlakshmi Javiks",
    date: "August 18, 2025",
    readTime: "6 min read",
    image: productChana,
    content: {
      intro:
        "Kabuli Chana, also known as chickpeas, is one of the most sustainable crops to grow. Its cultivation enriches soil health and requires minimal water compared to other crops.",
      sections: [
        {
          title: "Why Kabuli Chana is Sustainable",
          text: "Chickpeas are nitrogen-fixing crops, meaning they naturally enrich the soil with essential nutrients, reducing the need for chemical fertilizers.",
          benefits: [
            "Nitrogen-fixing properties improve soil health naturally.",
            "Requires significantly less water than other protein crops.",
            "High protein content makes it a sustainable meat alternative.",
            "Versatile crop that supports crop rotation practices.",
          ],
        },
      ],
      keyTakeaways: [
        "Chickpeas are naturally sustainable crops",
        "They improve soil health through nitrogen fixation",
        "High protein, low environmental impact",
        "Perfect for sustainable farming practices",
      ],
    },
  },
];

const relatedArticles = [
  {
    id: 1,
    category: "Food Tips",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productRice,
  },
  {
    id: 2,
    category: "Food Tips",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: productChana,
  },
  {
    id: 3,
    category: "Food Tips",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: heroGhee,
  },
  {
    id: 3,
    category: "Food Tips",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: heroGhee,
  },
  {
    id: 3,
    category: "Food Tips",
    title: "Daal",
    description:
      "Explore the use of essential oils in skincare for various benefits.",
    author: "Rajlakshmi Javiks",
    date: "12 Aug 2026",
    image: heroGhee,
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === Number(id)) || blogsData[0];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

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
                  <time dateTime={blog.date}>{blog.date}</time>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {blog.readTime}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              <figure className="mb-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </figure>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                {/* Introduction */}
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {blog.content.intro}
                </p>

                {/* Article Sections */}
                {blog.content.sections.map((section, idx) => (
                  <section key={idx} className="mb-8" id={`section-${idx}`}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-700 text-base leading-relaxed mb-4">
                      {section.text}
                    </p>

                    {section.benefits && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Health Benefits of Organic Food:
                        </h3>
                        <ul className="space-y-2.5">
                          {section.benefits.map((benefit, bIdx) => (
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
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>
                ))}

                {/* Key Takeaways Box */}
                <aside className="bg-gradient-to-br  to-emerald-50 border-2 rounded-2xl p-6 md:p-8 my-10 shadow-md hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 text-[#01722C] flex items-center gap-2">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {blog.content.keyTakeaways.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-foreground"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#01722C] mt-2 shrink-0" />
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </aside>

                {/* Organic Food & Environmental Health Section */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-[#01722C]-900 mb-3">
                    Organic Food & Environmental Health
                  </h2>
                  <p className="text-gray-700 text-base leading-relaxed">
                    Organic farming supports soil health, reduces water
                    pollution, and promotes biodiversity. Choosing organic is
                    not only beneficial for your own health but also for the
                    planet.
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

                <section className="bg-[#F0FFF0] text-[#01722C] rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-3">
                    Start Your Organic Journey Today{" "}
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    Make healthier choices for you and your family with
                    Rajlakshmi Javiks’ pure and natural food products.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/products">
                      <Button className="bg-[#01722C] hover:bg-[#01722C] text-white rounded-xl px-7 py-3 font-semibold text-base shadow-sm transition-all duration-300">
                        Shop Now
                      </Button>
                    </Link>

                    <Link to="/contact">
                      <Button className="bg-[#F0FFF0] text-[#01722C] hover:text-white border border-[#01722C]  rounded-xl px-7 py-3 font-semibold text-base transition-all duration-300">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </section>
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
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    RELATED ARTICLES
                  </h4>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link
                        to={`/blog/${article.id}`}
                        key={article.id}
                        className="flex items-start gap-3 group"
                      >
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-green-600 font-semibold mb-1">
                            {article.category}
                          </p>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-green-600 line-clamp-2 mb-1">
                            {article.description.slice(0, 50)}...
                          </p>
                          <p className="text-xs text-gray-500">
                            {article.author} · {article.date}
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
              </div>
            </aside>
          </div>
        </article>

        {/* Related Articles Grid */}
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 mx-auto pb-16 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mt-8">
            {relatedArticles.slice(0, 5).map((article) => (
              <Link to={`/blog/${article.id}`} key={article.id}>
                <article className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 h-full">
                  <div className="relative p-3 pb-0">
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-40 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-forest text-white text-xs font-medium px-3 py-1 rounded-full">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {article.description}
                    </p>

                    <p className="text-xs text-muted-foreground mb-3">
                      By {article.author} | {article.date}
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
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
