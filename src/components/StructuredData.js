import React from 'react';

const StructuredData = ({ type, data }) => {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Your Website Name",
          "url": window.location.origin,
          "logo": `${window.location.origin}/logo192.png`,
          "sameAs": [
            // Add your social media URLs here
            // "https://www.instagram.com/yourhandle",
            // "https://www.linkedin.com/company/yourcompany"
          ]
        };
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Your Website Name",
          "url": window.location.origin
        };
      
      case 'imageGallery':
        return {
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": data.title,
          "description": data.description,
          "url": data.url
        };
      
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;