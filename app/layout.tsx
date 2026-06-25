import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Lora, Mulish } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ContactButton from "./components/ContactButton/ContactButton";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import MetaPixel from "./components/MetaPixel/MetaPixel";
import StructuredData from "./components/StructuredData/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F4F7F6",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://halalexpoindonesia.com'),
  title: "HEI 2026 - The 6th Halal Expo Indonesia | D-8 Halal Economy Summit",
  description: "Join the 6th Halal Expo Indonesia 2026 in Jakarta. Strengthening D-8 Halal Economy Through International Collaboration. Discover halal products, services, and business opportunities. April 2026.",
  keywords: [
    "Halal Expo Indonesia",
    "HEI 2026",
    "D-8 Halal Economy",
    "Halal Exhibition Jakarta",
    "Halal Products Indonesia",
    "Halal Business Summit",
    "Halal Export Indonesia",
    "Islamic Economy",
    "Halal Certification",
    "Halal Trade Fair"
  ],
  authors: [{ name: "Halal Export Indonesia" }],
  creator: "Halal Export Indonesia",
  publisher: "Halal Export Indonesia",
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
    title: "HEI 2026 - The 6th Halal Expo Indonesia | D-8 Halal Economy Summit",
    description: "Join the 6th Halal Expo Indonesia 2026 in Jakarta. Strengthening D-8 Halal Economy Through International Collaboration. Discover halal products, services, and business opportunities.",
    siteName: "Halal Expo Indonesia",
    url: "https://halalexpoindonesia.com",
    images: [
      {
        url: "/icon/icon-d8hei.png",
        width: 1200,
        height: 630,
        alt: "D-8 Halal Expo Indonesia 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEI 2026 - The 6th Halal Expo Indonesia",
    description: "Join the 6th Halal Expo Indonesia 2026 in Jakarta. Strengthening D-8 Halal Economy Through International Collaboration.",
    images: ["/icon/icon-d8hei.png"],
    creator: "@HalalExpoID",
  },
  alternates: {
    canonical: "https://halalexpoindonesia.com",
  },
  icons: {
    icon: [
      { url: '/icon/icon-d8hei.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon/D8-icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon/icon-d8hei.png',
    shortcut: '/icon/icon-d8hei.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${lora.variable} ${mulish.variable} antialiased`}
      >
        <StructuredData />
        <MetaPixel />
        <LoadingScreen />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <ContactButton />
        <Analytics />
      </body>
    </html>
  );
}
