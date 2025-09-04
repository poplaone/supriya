import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = "website",
  keywords = [],
  author = "Your Name",
  locale = "en_US"
}) => {
  // Default values
  const defaultTitle = "Your Website Name";
  const defaultDescription = "Your website description goes here. This should be a compelling description that encourages users to click through from search results.";
  const defaultImage = `${process.env.PUBLIC_URL || ''}/logo192.png`;
  const defaultUrl = window.location.origin;
  
  // Use provided values or defaults
  const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image || defaultImage;
  const finalUrl = url || defaultUrl;

  return (
    <Helmet>
      {/* Standard meta tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@yourtwitterhandle" />
      
      {/* Additional meta tags */}
      <meta name="theme-color" content="#000000" />
      <link rel="canonical" href={finalUrl} />
    </Helmet>
  );
};

export default SEO;