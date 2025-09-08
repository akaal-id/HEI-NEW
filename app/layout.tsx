import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import MetaPixel from '../components/MetaPixel'
import ScrollToTop from '../components/ScrollToTop'
import { WebsiteStructuredData, OrganizationStructuredData } from '../components/StructuredData'

export const metadata = {
  metadataBase: new URL('https://www.halalexpoindonesia.com'),
  title: {
    default: 'Halal Expo Indonesia - The Premiere Halal Trade Exhibition',
    template: '%s | Halal Expo Indonesia'
  },
  description: 'Connecting businesses, fostering innovation, and shaping the future of the global halal economy. Join the 5th Halal Expo Indonesia and 2nd Halal Export Indonesia.',
  keywords: [
    'halal expo',
    'halal indonesia', 
    'halal export',
    'halal exhibition',
    'halal trade',
    'indonesia halal',
    'halal food',
    'halal beverage',
    'halal industry',
    'halal business',
    'halal marketplace',
    'halal networking'
  ],
  authors: [{ name: 'Halal Expo Indonesia Team' }],
  creator: 'Halal Expo Indonesia',
  publisher: 'PT Angan Kreasi Semesta',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_ID',
    url: 'https://www.halalexpoindonesia.com',
    siteName: 'Halal Expo Indonesia',
    title: 'Halal Expo Indonesia - The Premiere Halal Trade Exhibition',
    description: 'Connecting businesses, fostering innovation, and shaping the future of the global halal economy.',
    images: [
      {
        url: '/images/mainkv.png',
        width: 1200,
        height: 630,
        alt: 'Halal Expo Indonesia - The Premiere Halal Trade Exhibition',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@halalexpoindonesia',
    creator: '@halalexpoindonesia',
    title: 'Halal Expo Indonesia - The Premiere Halal Trade Exhibition',
    description: 'Connecting businesses, fostering innovation, and shaping the future of the global halal economy.',
    images: ['/images/mainkv.png'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://www.halalexpoindonesia.com',
    languages: {
      'en-ID': 'https://www.halalexpoindonesia.com',
      'id-ID': 'https://www.halalexpoindonesia.com/id',
    },
  },
  category: 'Business',
  classification: 'Trade Exhibition',
  icons: {
    icon: [
      { url: '/images/HEI logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/HEI logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/images/HEI logo.png',
    apple: [
      { url: '/images/HEI logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <MetaPixel />
      </head>
      <body className="font-plusjakarta text-primary">
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        <Loader />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}