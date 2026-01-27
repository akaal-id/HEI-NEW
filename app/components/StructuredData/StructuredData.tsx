'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const baseUrl = 'https://halalexpoindonesia.com';

export default function StructuredData() {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  // WebSite Schema (for all pages)
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'D-8 Halal Expo Indonesia 2026',
    alternateName: 'HEI 2026',
    url: baseUrl,
    description: 'The 6th Halal Expo Indonesia 2026 - Strengthening D-8 Halal Economy Through International Collaboration. B2B halal exhibition, business matching, investment opportunities, and networking events in Jakarta, April 2026.',
    publisher: {
      '@type': 'Organization',
      name: 'Skyconnection',
      url: 'https://skyconnection.co.id',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/articles?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Event Schema (homepage only)
  const eventSchema = isHomePage
    ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'D-8 Halal Expo Indonesia 2026',
        alternateName: 'The 6th Halal Expo Indonesia',
        description:
          'International B2B halal exhibition and strategic global platform that advances the halal economy while supporting the objectives of the D-8 Organization for Economic Cooperation.',
        startDate: '2026-04-14',
        endDate: '2026-04-18',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Senayan Indoor Tennis Complex',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jakarta',
            addressCountry: 'ID',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Skyconnection',
          url: 'https://skyconnection.co.id',
        },
        image: `${baseUrl}/icon/icon-d8hei.png`,
        offers: {
          '@type': 'Offer',
          url: `${baseUrl}#register`,
          price: '0',
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
        },
      }
    : null;

  // SiteNavigationElement Schema (for sitelinks)
  const navigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: baseUrl,
    hasPart: [
      {
        '@type': 'SiteNavigationElement',
        name: 'Home',
        url: baseUrl,
        position: 1,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'About Us',
        url: `${baseUrl}/about`,
        position: 2,
        hasPart: [
          {
            '@type': 'SiteNavigationElement',
            name: 'D-8 Organization',
            url: `${baseUrl}/about/d8-organization`,
            position: 1,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'D-8 Expo',
            url: `${baseUrl}/about/d8-expo`,
            position: 2,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Organizer',
            url: `${baseUrl}/about/organizer`,
            position: 3,
          },
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Our Programs',
        url: `${baseUrl}/programs`,
        position: 3,
        hasPart: [
          {
            '@type': 'SiteNavigationElement',
            name: 'Exhibition',
            url: `${baseUrl}/programs/exhibition`,
            position: 1,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Business Matching',
            url: `${baseUrl}/programs/business-matching`,
            position: 2,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Investment Matchmaking',
            url: `${baseUrl}/programs/investment`,
            position: 3,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'Youth Event',
            url: `${baseUrl}/programs/youth-event`,
            position: 4,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'D-8 HEI Talk',
            url: `${baseUrl}/programs/hei-talk`,
            position: 5,
          },
          {
            '@type': 'SiteNavigationElement',
            name: 'D-8 Culture Festival',
            url: `${baseUrl}/programs/culture-festival`,
            position: 6,
          },
        ],
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Our Partner',
        url: `${baseUrl}/partners`,
        position: 4,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Article & Media',
        url: `${baseUrl}/articles`,
        position: 5,
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Register',
        url: `${baseUrl}#register`,
        position: 6,
      },
    ],
  };

  // Organization Schema (for better brand recognition)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'D-8 Halal Expo Indonesia 2026',
    alternateName: 'HEI 2026',
    url: baseUrl,
    logo: `${baseUrl}/icon/icon-d8hei.png`,
    description:
      'The 6th Halal Expo Indonesia 2026 - International B2B halal exhibition and strategic global platform advancing the halal economy.',
    sameAs: [
      // Add social media links if available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'Indonesian'],
    },
  };

  return (
    <>
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        key="website-schema"
      />

      {/* Event Schema (Homepage only) */}
      {isHomePage && eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
          key="event-schema"
        />
      )}

      {/* SiteNavigationElement Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        key="navigation-schema"
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        key="organization-schema"
      />
    </>
  );
}
