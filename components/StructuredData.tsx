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
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": organizer.name,
      "url": organizer.url
    },
    "url": url,
    "image": image,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "IDR",
      "description": "Free registration for visitors"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Business professionals, entrepreneurs, investors, and industry experts"
    },
    "keywords": "halal, export, indonesia, exhibition, trade show, business, networking, halal products, halal industry"
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
    "alternateName": "Halal Expo Indonesia",
    "url": "https://halalexpoindonesia.com",
    "description": "Indonesia's premier halal export exhibition connecting businesses, fostering innovation, and driving growth in the global halal industry",
    "publisher": {
      "@type": "Organization",
      "name": "PT Angan Kreasi Semesta",
      "url": "https://www.skyconnection.co.id"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://halalexpoindonesia.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
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
    "alternateName": "Skyconnection",
    "url": "https://www.skyconnection.co.id",
    "logo": "https://halalexpoindonesia.com/images/skyconnection.png",
    "description": "Event planning and organizing company specializing in Meetings, Incentives, Conferences, and Exhibitions (MICE)",
    "foundingDate": "2010",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-812-7417-0664",
      "contactType": "sales",
      "areaServed": "ID",
      "availableLanguage": "Indonesian, English"
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
