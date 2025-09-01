import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Top Section - Three Columns */}
      <div className="max-w-6xl mx-auto px-6 py-16 xl:px-5 xl:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 xl:gap-10">
          
          {/* Left Column - Logo and Head Office */}
          <div className="space-y-6 xl:space-y-5">
            {/* Logo */}
            <Link href="/" className="space-y-2">
              <Image
                src="/images/main logo_compile.png"
                alt="Halal Export Indonesia Logo"
                width={200}
                height={80}
                className="mb-4"
              />
            </Link>

            {/* Head Office */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800 xl:text-base">Headoffice</h3>
              <Link href="https://maps.app.goo.gl/LbXZMbpkHWmRZ8st8" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 not-italic leading-relaxed hover:text-red-600 transition-colors xl:text-xs">
                Jl. Gotong Royong I No.50 Rt.004/DI, RT.3/RW.1,<br />
                Ragunan, Ps. Minggu, Kota Jakarta Selatan,<br />
                Daerah Khusus Ibukota Jakarta 12550
              </Link>
            </div>
          </div>

          {/* Middle Column - More For You and Follow Us */}
          <div className="space-y-8 xl:space-y-6">
            {/* More For You */}
            <div className="space-y-4 xl:space-y-3">
              <h3 className="text-lg font-bold text-gray-800 xl:text-base">More For You</h3>
              <nav className="space-y-2">
                <Link href="/about" className="block text-sm text-gray-700 hover:text-red-600 transition-colors xl:text-xs">
                  About HEI
                </Link>
                <Link href="/registration/visitor" className="block text-sm text-gray-700 hover:text-red-600 transition-colors xl:text-xs">
                  Become Trade Visitor
                </Link>
                <Link href="/registration/exhibitor" className="block text-sm text-gray-700 hover:text-red-600 transition-colors xl:text-xs">
                  Book a Space
                </Link>
                <Link href="/sponsorship" className="block text-sm text-gray-700 hover:text-red-600 transition-colors xl:text-xs">
                  Become a Sponsor
                </Link>
                <Link href="/news" className="block text-sm text-gray-700 hover:text-red-600 transition-colors xl:text-xs">
                  News & Update
                </Link>
              </nav>
            </div>

            {/* Follow Us */}
            <div className="space-y-3 xl:space-y-2.5">
              <h3 className="text-lg font-bold text-gray-800 xl:text-base">Follow Us</h3>
              <div className="flex gap-3 xl:gap-2.5">
                <Link 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity xl:w-9 xl:h-9"
                  aria-label="Follow us on X (Twitter)"
                >
                  <Image
                    src="/images/x-icon.png"
                    alt="X (Twitter) Icon"
                    width={48}
                    height={48}
                    className="xl:w-9 xl:h-9"
                  />
                </Link>
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity xl:w-9 xl:h-9"
                  aria-label="Follow us on Facebook"
                >
                  <Image
                    src="/images/fb-icon.png"
                    alt="Facebook Icon"
                    width={48}
                    height={48}
                    className="xl:w-9 xl:h-9"
                  />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity xl:w-9 xl:h-9"
                  aria-label="Follow us on Instagram"
                >
                  <Image
                    src="/images/ig-icon.png"
                    alt="Instagram Icon"
                    width={48}
                    height={48}
                    className="xl:w-9 xl:h-9"
                  />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity xl:w-9 xl:h-9"
                  aria-label="Follow us on LinkedIn"
                >
                  <Image
                    src="/images/linkedin-icon.png"
                    alt="LinkedIn Icon"
                    width={48}
                    height={48}
                    className="xl:w-9 xl:h-9"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-4 xl:space-y-3">
            <h3 className="text-lg font-bold text-gray-800 xl:text-base">Newsletter</h3>
            <p className="text-sm text-gray-600 xl:text-xs">
              Stay updated with the latest news and updates from Halal Export Indonesia.
            </p>
            <div className="flex flex-col space-y-3 xl:space-y-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent xl:px-3 xl:py-2.5 xl:text-sm"
              />
              <button className="bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 xl:py-2.5 xl:px-5 xl:text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8 xl:px-5 xl:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 xl:gap-3">
            {/* Copyright */}
            <div className="text-sm text-gray-600 text-center md:text-left xl:text-xs">
              © 2025 Halal Export Indonesia. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 xl:gap-5">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-red-600 transition-colors xl:text-xs">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-red-600 transition-colors xl:text-xs">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-red-600 transition-colors xl:text-xs">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
