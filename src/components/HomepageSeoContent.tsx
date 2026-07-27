import { Link } from "react-router-dom";

/**
 * HomepageSeoContent — A dedicated, keyword-rich, crawlable content section
 * placed at the bottom of the homepage to boost overall page word count,
 * target long-tail SEO queries, and provide comprehensive AEO (Answer Engine
 * Optimization) content that AI search engines and featured snippets can
 * extract and surface directly.
 *
 * This is a senior SEO best practice: adding genuine, user-useful informational
 * content that simultaneously serves as a topical authority signal for Google,
 * Bing, and AI-powered answer engines (ChatGPT Search, Perplexity, Google SGE).
 */
const HomepageSeoContent = () => {
  return (
    <section className="bg-[#F7FBF7] py-14 lg:py-20 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main SEO Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#116931] tracking-tight font-serif mb-4">
            Rajlakshmi Javiks International — Your Trusted Source for Pure Organic Food in India
          </h2>
          <div className="h-1 w-24 bg-[#116931]/20 mx-auto rounded-full" />
        </div>

        {/* Introduction Paragraph — High-volume keyword targeting */}
        <div className="prose prose-green max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-5 mb-14">
          <p>
            Welcome to <strong>Rajlakshmi Javiks International</strong>, one of India's most trusted names in premium organic food products. Established in <strong>2019 in Indore, Madhya Pradesh</strong>, we are a certified retail trader and wholesaler dedicated to bringing you <strong>100% pure, chemical-free, and lab-tested organic food</strong> sourced directly from the farms of rural India. Whether you are looking to <strong>buy A2 Gir Cow Bilona Ghee online</strong>, order <strong>organic pulses and millets</strong>, or explore our extensive collection of <strong>cold-pressed oils, dry fruits, seeds, and natural spices</strong>, Rajlakshmi Javiks is your one-stop organic food store with <strong>PAN India delivery</strong> and <strong>cash on delivery</strong> options.
          </p>

          <p>
            At Rajlakshmi Javiks, every product in our catalogue is carefully curated to meet the highest standards of purity, nutritional value, and authenticity. Our product range includes <strong>A2 Gir Cow Ghee made using the traditional Vedic Bilona process</strong>, <strong>organic Kashmiri Saffron (Kesar)</strong>, <strong>cold-pressed mustard oil (Kacchi Ghani)</strong>, <strong>organic turmeric powder with high curcumin content</strong>, <strong>whole grain millets like Ragi, Jowar, and Bajra</strong>, <strong>premium almonds, cashews, and walnuts</strong>, <strong>chemical-free rice and wheat</strong>, and many more certified organic groceries. All our food items carry <strong>FSSAI certification</strong>, <strong>APEDA certification</strong>, and are produced under the <strong>NPOP (National Programme for Organic Production)</strong> guidelines.
          </p>
        </div>

        {/* Structured AEO Content Grid — Answer Engine Optimization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-14">

          {/* AEO Block 1: What is A2 Bilona Ghee */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#116931] mb-3">
              What is A2 Gir Cow Bilona Ghee?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              <strong>A2 Gir Cow Bilona Ghee</strong> is a premium variety of clarified butter prepared using the ancient <strong>Vedic Bilona churning method</strong>. Unlike industrial ghee made from mixed milk, our Bilona Ghee is crafted exclusively from the <strong>A2 protein-rich milk of indigenous Gir cows</strong> that are grass-fed and raised humanely on organic farms. The process involves converting whole milk into curd, hand-churning (bilona) the curd to extract makkhan (butter), and then slow-cooking this butter over a mild flame until it turns into golden, aromatic ghee with a characteristic granular texture.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              This traditional method preserves the <strong>CLA (Conjugated Linoleic Acid)</strong>, <strong>fat-soluble vitamins A, D, E, and K</strong>, and <strong>butyric acid</strong> — all of which are essential for gut health, strong immunity, healthy joints, and radiant skin. A2 Bilona Ghee is also naturally free from <strong>A1 casein protein</strong>, making it easier to digest for people who experience discomfort with regular dairy products.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              When you <strong>buy A2 Gir Cow Ghee from Rajlakshmi Javiks</strong>, you receive a product that is <strong>lab-tested for purity</strong>, free from preservatives, and packaged with care to retain freshness. Available in 500ml, 1 litre, 5 kg, and 15 kg tins for both household and wholesale requirements, our ghee is delivered across India with secure packaging.
            </p>
          </div>

          {/* AEO Block 2: Why Choose Organic Food */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#116931] mb-3">
              Why Should You Switch to Organic Food Products?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Organic food is grown without the use of <strong>synthetic pesticides, chemical fertilizers, genetically modified organisms (GMOs), or artificial growth hormones</strong>. By choosing organic, you ensure that the food on your plate is <strong>free from harmful residues</strong> that are commonly found in conventionally farmed produce. Studies have shown that organic food contains <strong>up to 60% more antioxidants</strong>, higher levels of essential minerals like iron, magnesium, and zinc, and a richer concentration of vitamins compared to non-organic alternatives.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Switching to organic food from Rajlakshmi Javiks means you are investing in your family's long-term health. Our <strong>organic pulses (toor dal, moong dal, chana dal)</strong>, <strong>organic millets (ragi flour, jowar atta, bajra atta)</strong>, and <strong>organic spices (haldi, jeera, dhaniya, red chilli powder)</strong> are sourced from certified organic farms across Madhya Pradesh, Rajasthan, and Karnataka. Each product is <strong>third-party lab tested</strong> and carries authentic organic certifications that you can verify.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Beyond personal health benefits, organic farming supports <strong>soil conservation, water purity, and biodiversity</strong>. When you buy organic food online from Rajlakshmi Javiks, you are not just nourishing your body — you are supporting sustainable farming communities and contributing to a healthier planet for future generations.
            </p>
          </div>

          {/* AEO Block 3: Cold-Pressed Oils */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#116931] mb-3">
              What Are Cold-Pressed Oils and Why Are They Better?
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              <strong>Cold-pressed oils</strong> are extracted from seeds and nuts using a traditional <strong>wooden Kacchi Ghani press (Kolhu)</strong> at room temperature without applying any external heat. This gentle extraction process ensures that the oil retains its <strong>natural flavour, aroma, colour, and complete nutritional profile</strong> — including essential fatty acids (Omega-3, Omega-6, Omega-9), vitamin E, and natural antioxidants that are typically destroyed during industrial refining.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              At Rajlakshmi Javiks, we offer a premium range of cold-pressed oils including <strong>cold-pressed mustard oil (Sarson ka Tel)</strong>, <strong>cold-pressed groundnut oil (Mungfali ka Tel)</strong>, <strong>cold-pressed coconut oil (Nariyal ka Tel)</strong>, <strong>cold-pressed sesame oil (Til ka Tel)</strong>, and <strong>cold-pressed flaxseed oil (Alsi ka Tel)</strong>. Unlike refined oils that undergo chemical bleaching and deodorising, our oils are <strong>100% natural, unrefined, and free from trans fats</strong>.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cold-pressed oils are recommended by nutritionists and Ayurvedic practitioners for <strong>heart health, improved digestion, better cholesterol management, and natural skin nourishment</strong>. They are ideal for daily Indian cooking, tempering (tadka), deep frying, and even external application for hair and skin care. Order cold-pressed oils online from Rajlakshmi Javiks and experience the difference that purity makes.
            </p>
          </div>

          {/* AEO Block 4: Organic Dry Fruits */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg sm:text-xl font-bold text-[#116931] mb-3">
              Premium Organic Dry Fruits — Natural Energy, No Additives
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Dry fruits are nature's most nutrient-dense snacks, providing concentrated energy, essential vitamins, minerals, and healthy fats in every handful. At Rajlakshmi Javiks, we source our dry fruits from the <strong>finest organic orchards across Kashmir, Afghanistan, and California</strong>, ensuring that every almond, walnut, cashew, and raisin meets our stringent quality standards.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Our organic dry fruits range includes <strong>California almonds (Badam)</strong>, <strong>premium cashews (Kaju)</strong>, <strong>Chilean walnuts (Akhrot)</strong>, <strong>Afghani raisins (Kishmish)</strong>, <strong>Medjool dates (Khajoor)</strong>, <strong>dried figs (Anjeer)</strong>, <strong>pistachios (Pista)</strong>, and <strong>organic apricots (Khubani)</strong>. All our dry fruits are <strong>naturally dried without sulphur or artificial preservatives</strong>, ensuring that you receive them in their purest, most wholesome form.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Whether you are looking for healthy snacking options, ingredients for traditional Indian sweets and desserts, or nutritious additions to your breakfast granola, Rajlakshmi Javiks offers <strong>wholesale and retail dry fruit packs</strong> that are perfect for families, fitness enthusiasts, and gift-giving occasions. All dry fruits are available in <strong>vacuum-sealed packaging</strong> to ensure maximum freshness upon delivery.
            </p>
          </div>
        </div>

        {/* Product Categories Overview — Internal Linking + Keyword Density */}
        <div className="mb-14">
          <h3 className="text-xl sm:text-2xl font-bold text-[#116931] mb-6 text-center">
            Explore Our Complete Range of Organic Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Organic Pulses & Lentils",
                desc: "Premium organic toor dal, moong dal, chana dal, masoor dal, urad dal, and rajma — all stone-cleaned, chemical-free, and sourced from certified organic farms. Rich in plant-based protein, dietary fibre, and essential minerals for daily nutrition.",
                link: "/categories?category=PULSES",
              },
              {
                title: "Organic Millets & Ancient Grains",
                desc: "Rediscover the nutritional power of ancient Indian grains — ragi (finger millet), jowar (sorghum), bajra (pearl millet), foxtail millet, barnyard millet, and little millet. Gluten-free, diabetic-friendly, and perfect for weight management.",
                link: "/categories?category=MILLET",
              },
              {
                title: "Pure A2 Ghee & Organic Oils",
                desc: "From our signature Bilona A2 Gir Cow Ghee to cold-pressed mustard, coconut, groundnut, and sesame oils — every drop is extracted naturally without chemicals. Heart-healthy, rich in good fats, and ideal for authentic Indian cooking.",
                link: "/categories?category=OILS%20%20GHEE",
              },
              {
                title: "Organic Spices & Masalas",
                desc: "Hand-picked and sun-dried organic turmeric (haldi), cumin (jeera), coriander (dhaniya), red chilli, black pepper, cinnamon, and custom masala blends. No fillers, no artificial colours — just pure, potent, and aromatic spices from Madhya Pradesh.",
                link: "/categories?category=MASALA",
              },
              {
                title: "Premium Dry Fruits & Seeds",
                desc: "Almonds, cashews, walnuts, raisins, dates, figs, chia seeds, flax seeds, pumpkin seeds, and sunflower seeds — all naturally dried, sulphur-free, and packed with omega fatty acids, antioxidants, and plant-based protein for active lifestyles.",
                link: "/categories?category=DRY%20FRUITS",
              },
              {
                title: "Organic Rice, Wheat & Grains",
                desc: "Handpicked organic basmati rice, brown rice, whole wheat, khapli (emmer) wheat, and ancient grain varieties. Grown without pesticides, stone-ground where applicable, and rich in natural fibre for digestive wellness and sustained energy.",
                link: "/categories?category=RICE%20%20WHEAT",
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="block bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#116931]/20 transition-all duration-300 group"
              >
                <h4 className="text-[#116931] font-bold text-base mb-2 group-hover:underline">
                  {cat.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Section — AEO Featured Snippet Targeting */}
        <div className="mb-14">
          <h3 className="text-xl sm:text-2xl font-bold text-[#116931] mb-8 text-center">
            Frequently Asked Questions About Organic Food
          </h3>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                q: "Is Rajlakshmi Javiks A2 Ghee 100% pure and lab-tested?",
                a: "Yes, absolutely. Our A2 Gir Cow Bilona Ghee is 100% pure, made exclusively from the milk of indigenous Gir cows using the traditional Vedic Bilona churning method. Every batch undergoes rigorous third-party laboratory testing for purity, adulteration, and nutritional content. We hold valid FSSAI certification and comply with NPOP organic production standards. Our ghee is free from preservatives, artificial colours, and any form of chemical additives.",
              },
              {
                q: "What certifications do Rajlakshmi Javiks products carry?",
                a: "All Rajlakshmi Javiks products carry FSSAI (Food Safety and Standards Authority of India) certification, ensuring compliance with India's food safety regulations. Our organic range is certified under APEDA (Agricultural and Processed Food Products Export Development Authority) and the NPOP (National Programme for Organic Production). We also display the India Organic mark on all eligible products, providing customers with complete transparency about the organic integrity of our supply chain.",
              },
              {
                q: "Do you deliver organic food products across India?",
                a: "Yes, Rajlakshmi Javiks International offers PAN India delivery for all our organic food products. We ship to every state and union territory in India, including metro cities like Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, and Ahmedabad, as well as Tier-2 and Tier-3 cities. We offer multiple payment options including cash on delivery (COD), UPI, net banking, and all major credit/debit cards. Most orders are dispatched within 24-48 hours and delivered within 3-7 business days depending on your location.",
              },
              {
                q: "What is the difference between cold-pressed oil and refined oil?",
                a: "Cold-pressed oils are extracted from seeds and nuts at room temperature using traditional wooden presses (Kacchi Ghani / Kolhu) without applying any external heat or chemical solvents. This preserves the oil's natural flavour, aroma, colour, and complete nutritional profile including essential fatty acids and vitamin E. Refined oils, on the other hand, undergo multiple industrial processes including chemical extraction, bleaching, and deodorising at high temperatures, which strips away most nutrients and may introduce harmful trans fats. Cold-pressed oils are always the healthier choice for cooking and daily consumption.",
              },
              {
                q: "Why are organic millets good for health?",
                a: "Organic millets like ragi (finger millet), jowar (sorghum), bajra (pearl millet), and foxtail millet are among the most nutrient-dense grains available. They are naturally gluten-free, high in dietary fibre, rich in calcium, iron, and magnesium, and have a low glycemic index — making them excellent for people managing diabetes, weight loss, or digestive issues. Millets are also drought-resistant crops that require minimal water, making them an environmentally sustainable food choice. When grown organically without pesticides, millets retain their full nutritional potential and authentic earthy flavour.",
              },
              {
                q: "Can I buy organic food in bulk or wholesale from Rajlakshmi Javiks?",
                a: "Yes, Rajlakshmi Javiks International is both a retail and wholesale supplier of organic food products. We cater to individual households, health food stores, restaurants, hotel chains, corporate gifting requirements, and B2B bulk buyers. Our wholesale catalogue includes A2 ghee in 5 kg and 15 kg tins, bulk organic pulses and millets in 5 kg to 25 kg bags, cold-pressed oils in commercial packaging, and custom masala blends for food service businesses. Contact us directly for wholesale pricing, minimum order quantities, and special trade discounts.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="bg-white rounded-xl border border-gray-100 shadow-sm group"
              >
                <summary className="cursor-pointer p-5 text-[#116931] font-semibold text-sm sm:text-base flex items-start gap-2 list-none [&::-webkit-details-marker]:hidden">
                  <span className="text-[#116931]/50 font-bold shrink-0 mt-0.5">Q.</span>
                  <span>{faq.q}</span>
                </summary>
                <div className="px-5 pb-5 -mt-1">
                  <p className="text-gray-600 text-sm leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Bottom Trust Paragraph — Brand Authority + Local SEO */}
        <div className="prose prose-green max-w-none text-gray-600 text-xs sm:text-sm leading-relaxed text-center space-y-4">
          <p>
            <strong>Rajlakshmi Javiks International</strong> is proudly based in <strong>11, Manish Bag Colony Rd, Durga Nagar, Agarwal Nagar, Old Agarwal Nagar, Indore, Madhya Pradesh 452001</strong> — the heart of the country's organic farming belt. Since our inception in 2019, we have served over <strong>17,000+ happy customers</strong> across India, delivered <strong>35,000+ kg of pure A2 Gir Cow Ghee</strong>, and built a catalogue of <strong>250+ organic food products</strong> spanning ghee, oils, pulses, millets, dry fruits, seeds, spices, honey, khakhra, and more. Our commitment to purity, transparency, and traditional food wisdom drives everything we do.
          </p>
          <p>
            Whether you are searching to <strong>buy organic ghee online</strong>, looking for the <strong>best A2 ghee brand in India</strong>, seeking <strong>organic food delivery in Indore</strong>, or wanting to <strong>order chemical-free groceries with home delivery</strong>, Rajlakshmi Javiks International is here to serve you with authenticity, quality, and care.{" "}
            <Link to="/about" className="text-[#116931] font-semibold underline hover:text-[#0d5427] transition-colors">
              Learn more about our story
            </Link>{" "}
            or{" "}
            <Link to="/categories" className="text-[#116931] font-semibold underline hover:text-[#0d5427] transition-colors">
              explore our complete product range
            </Link>.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HomepageSeoContent;
