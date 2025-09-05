import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import MetaPixel from '../components/MetaPixel'

export const metadata = {
  title: 'Halal Export Indonesia - Halal Expo Indonesia',
  description: 'Global Halal Gateway: Empowering Indonesia\'s Food & Beverage Industry',
  icons: {
    icon: '/images/HEI logo.png',
    shortcut: '/images/HEI logo.png',
    apple: '/images/HEI logo.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <MetaPixel />
      </head>
      <body className="font-plusjakarta text-primary">
        <Loader />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}