import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string | null;
  type?: string;
  name?: string;
}

export function SEO({
  title,
  description,
  type = "website",
  name = "Конструктор Форм",
}: SEOProps) {
  const fullTitle = `${title} | ${name}`;

  const metaDescription =
    description ?? "Створюйте та заповнюйте форми онлайн за лічені хвилини.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:site_name" content={name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content="/og-image.png" />

      <meta name="theme-color" content="#673ab7" />
    </Helmet>
  );
}
