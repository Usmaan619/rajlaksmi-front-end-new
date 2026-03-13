import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const Seo = ({
  title,
  description,
  url,
  image = "https://rajlakshmijaviks.com/logo.png",
}: SeoProps) => {
  // Normalize URL to standardized domain for canonicals
  const canonicalUrl = url.startsWith("http")
    ? url.replace(
        /https?:\/\/(www\.)?(rajlakshmijaviksinternational\.com|rajlakshmijaviks\.com)/,
        "https://rajlakshmijaviks.com"
      )
    : `https://rajlakshmijaviks.com${url.startsWith("/") ? url : `/${url}`}`;

  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Meta */}
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Rajlakshmi Javiks International" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Rajlakshmi Javiks International" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rajlakshmijaviks" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
