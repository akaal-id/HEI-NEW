import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'

export const metadata = {
  title: 'Halal Export Indonesia - Halal Expo Indonesia',
  description: 'Global Halal Gateway: Empowering Indonesia\'s Food & Beverage Industry'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-plusjakarta bg-[#fcfcfc] text-primary">
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