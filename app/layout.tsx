import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ContactButton from "./components/ContactButton/ContactButton";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F0FEFF",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://halalexpoindonesia.com'),
  title: "HEI 2026 - The 6th Halal Expo Indonesia",
  description: "Strengthening D-8 Halal Economy Through International Collaboration. Coming in April 2026.",
  keywords: ["Halal Expo", "Indonesia", "HEI 2026", "D-8", "Halal Economy", "Exhibition", "Jakarta", "Halal Export Indonesia"],
  authors: [{ name: "Halal Export Indonesia" }],
  openGraph: {
    title: "HEI 2026 - The 6th Halal Expo Indonesia",
    description: "Strengthening D-8 Halal Economy Through International Collaboration. Coming in April 2026.",
    siteName: "Halal Expo Indonesia",
    images: [
      {
        url: "/D8-assets/KV_D8.png",
        width: 800,
        height: 600,
        alt: "HEI 2026 Key Visual",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEI 2026 - The 6th Halal Expo Indonesia",
    description: "Strengthening D-8 Halal Economy Through International Collaboration. Coming in April 2026.",
    images: ["/D8-assets/KV_D8.png"],
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
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <LoadingScreen />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
        <ContactButton />
      </body>
    </html>
  );
}
