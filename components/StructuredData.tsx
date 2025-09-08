'use client';
import Script from 'next/script';

interface EventStructuredDataProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  organizer: {
    name: string;
    url: string;
  };
  url: string;
  image?: string;
}

export default function EventStructuredData({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  url,
  image = '/images/mainkv.png'
}: EventStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address,
        "addressLocality": location.city,
        "addressCountry": location.country
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.3032437",
        "longitude": "106.6362648"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer.name,
      "url": organizer.url,
      "logo": "https://www.halalexpoindonesia.com/images/Angkasa-1.png"
    },
    "url": url,
    "image": [image, "https://www.halalexpoindonesia.com/images/mainkv.png"],
    "offers": [
      {
        "@type": "Offer",
        "name": "Visitor Registration",
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "IDR",
        "description": "Free registration for visitors",
        "validFrom": "2025-01-01",
        "validThrough": "2025-10-19"
      },
      {
        "@type": "Offer",
        "name": "Exhibitor Registration",
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "IDR",
        "description": "Registration for exhibitors and businesses",
        "validFrom": "2025-01-01",
        "validThrough": "2025-10-19"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Business professionals, entrepreneurs, investors, and industry experts"
    },
    "keywords": "halal, export, indonesia, exhibition, trade show, business, networking, halal products, halal industry, halal food, halal beverage, halal cosmetics, halal pharmaceuticals",
    "category": "Trade Show",
    "eventSchedule": {
      "@type": "Schedule",
      "startDate": startDate,
      "endDate": endDate,
      "repeatFrequency": "P1Y",
      "byDay": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    "performer": {
      "@type": "Organization",
      "name": "Halal Expo Indonesia",
      "url": "https://www.halalexpoindonesia.com"
    },
    "sponsor": {
      "@type": "Organization",
      "name": "PT Angan Kreasi Semesta",
      "url": "https://www.skyconnection.co.id"
    },
    "isAccessibleForFree": true,
    "maximumAttendeeCapacity": 10000,
    "remainingAttendeeCapacity": 10000
  };

  return (
    <Script
      id="event-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}

// Website structured data
export function WebsiteStructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Halal Export Indonesia",
    "alternateName": ["Halal Expo Indonesia", "HEI", "The 2nd Halal Export Indonesia"],
    "url": "https://www.halalexpoindonesia.com",
    "description": "Indonesia's premier halal export exhibition connecting businesses, fostering innovation, and driving growth in the global halal industry",
    "inLanguage": "en-ID",
    "publisher": {
      "@type": "Organization",
      "name": "PT Angan Kreasi Semesta",
      "url": "https://www.skyconnection.co.id",
      "logo": "https://www.halalexpoindonesia.com/images/Angkasa-1.png"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.halalexpoindonesia.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Event",
      "name": "Halal Expo Indonesia 2025",
      "startDate": "2025-10-15T08:00:00+07:00",
      "endDate": "2025-10-19T18:00:00+07:00",
      "location": {
        "@type": "Place",
        "name": "ICE BSD",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. BSD Grand Boulevard No.1, Pagedangan",
          "addressLocality": "Tangerang",
          "addressCountry": "Indonesia"
        }
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.halalexpoindonesia.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://www.halalexpoindonesia.com/about"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Exhibition",
          "item": "https://www.halalexpoindonesia.com/exhibition"
        }
      ]
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData, null, 2)
      }}
    />
  );
}

// Organization structured data
export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PT Angan Kreasi Semesta",
    "alternateName": ["Skyconnection", "Skyconnection Event Organizer"],
    "url": "https://www.skyconnection.co.id",
    "logo": "https://www.halalexpoindonesia.com/images/Angkasa-1.png",
    "description": "Event planning and organizing company specializing in Meetings, Incentives, Conferences, and Exhibitions (MICE) with expertise in halal industry events",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID",
      "addressRegion": "Jakarta"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+62-812-7417-0664",
        "contactType": "sales",
        "areaServed": "ID",
        "availableLanguage": ["Indonesian", "English"],
        "email": "sales@halalexpoindonesia.com"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+62-812-7417-0664",
        "contactType": "customer service",
        "areaServed": "ID",
        "availableLanguage": ["Indonesian", "English"],
        "email": "info@halalexpoindonesia.com"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/halalexpoindonesia/",
      "https://www.linkedin.com/company/halal-export-indonesia/",
      "https://www.facebook.com/halalexpoindonesia"
    ],
    "knowsAbout": [
      "Event Management",
      "Halal Industry",
      "Trade Exhibitions",
      "Business Networking",
      "MICE Industry",
      "Halal Export",
      "International Trade"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Event Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Halal Expo Indonesia",
            "description": "Annual halal trade exhibition"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Management",
            "description": "Complete event planning and management services"
          }
        }
      ]
    },
    "memberOf": {
      "@type": "Organization",
      "name": "Indonesian Event Organizers Association"
    }
  };

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData, null, 2)
      }}
    />
  );
}

// Article structured data for press articles
export function ArticleStructuredData({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  category
}: {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  image: string;
  url: string;
  category?: string;
}) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Halal Expo Indonesia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.halalexpoindonesia.com/images/HEI logo.png"
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": category || "Press Release",
    "keywords": "halal expo indonesia, halal industry, halal trade, press release, news",
    "inLanguage": "en-ID",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Halal Expo Indonesia",
      "url": "https://www.halalexpoindonesia.com"
    }
  };

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleData, null, 2)
      }}
    />
  );
}

// Breadcrumb structured data
export function BreadcrumbStructuredData({
  items
}: {
  items: Array<{
    name: string;
    url: string;
  }>;
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData, null, 2)
      }}
    />
  );
}
