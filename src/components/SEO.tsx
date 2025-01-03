import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Portfolio',
  description = 'Welcome to my professional portfolio showcasing my work and skills.',
  keywords = 'portfolio, developer, software engineer',
  ogImage,
  canonicalUrl,
  type = 'website',
  noindex = false,
}) => {
  const siteUrl = process.env.REACT_APP_SITE_URL || 'https://olayinka.dev';
  const fullTitle = `${title} | Ola Yinka`;
  const fullUrl = canonicalUrl || siteUrl;
  const imageUrl = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og-image.jpg`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Ola Yinka Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default SEO;
