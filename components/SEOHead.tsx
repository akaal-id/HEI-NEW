import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImageUrl?: string;
  ogType?: string;
  keywords?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImageUrl = '/images/mainkv.png',
  ogType = 'website',
  keywords = 'halal, export, indonesia, exhibition, trade show, business, networking, halal products, halal industry, MICE, event',
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title.includes('Halal Expo Indonesia') ? title : `${title} | Halal Expo Indonesia`;
  const fullDescription = description || 'Indonesia\'s premier halal export exhibition connecting businesses, fostering innovation, and driving growth in the global halal industry.';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Halal Expo Indonesia" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:site" content="@halalexpoindonesia" />
      <meta name="twitter:creator" content="@halalexpoindonesia" />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="PT Angan Kreasi Semesta" />
      <meta name="publisher" content="PT Angan Kreasi Semesta" />
      <meta name="copyright" content="Halal Expo Indonesia" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Event Specific Meta Tags */}
      <meta name="event:start_time" content="2025-10-15T08:00:00+07:00" />
      <meta name="event:end_time" content="2025-10-19T18:00:00+07:00" />
      <meta name="event:location" content="ICE BSD, Tangerang, Indonesia" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Favicon */}
      <link rel="icon" href="/images/HEI logo.png" />
      <link rel="apple-touch-icon" href="/images/HEI logo.png" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
