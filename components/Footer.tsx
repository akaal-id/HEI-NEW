import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Top Section - Three Columns */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Left Column - Logo and Head Office */}
          <div className="space-y-6">
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
              <h3 className="text-lg font-bold text-gray-800">Headoffice</h3>
              <Link href="https://maps.app.goo.gl/LbXZMbpkHWmRZ8st8" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 not-italic leading-relaxed hover:text-red-600 transition-colors">
                Jl. Gotong Royong I No.50 Rt.004/DI, RT.3/RW.1,<br />
                Ragunan, Ps. Minggu, Kota Jakarta Selatan,<br />
                Daerah Khusus Ibukota Jakarta 12550
              </Link>
            </div>
          </div>

          {/* Middle Column - More For You and Follow Us */}
          <div className="space-y-8">
            {/* More For You */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">More For You</h3>
              <nav className="space-y-2">
                <Link href="/about" className="block text-sm text-gray-700 hover:text-red-600 transition-colors">
                  About HEI
                </Link>
                <Link href="/registration/visitor" className="block text-sm text-gray-700 hover:text-red-600 transition-colors">
                  Become Trade Visitor
                </Link>
                <Link href="/registration/exhibitor" className="block text-sm text-gray-700 hover:text-red-600 transition-colors">
                  Book a Space
                </Link>
                <Link href="/sponsorship" className="block text-sm text-gray-700 hover:text-red-600 transition-colors">
                  Become a Sponsor
                </Link>
                <Link href="/news" className="block text-sm text-gray-700 hover:text-red-600 transition-colors">
                  News & Update
                </Link>
              </nav>
            </div>

            {/* Follow Us */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800">Follow Us</h3>
              <div className="flex gap-3">
                <Link 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Follow us on X (Twitter)"
                >
                  <Image
                    src="/images/x-icon.png"
                    alt="X (Twitter) Icon"
                    width={48}
                    height={48}
                  />
                </Link>
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Follow us on Facebook"
                >
                  <Image
                    src="/images/fb-icon.png"
                    alt="Facebook Icon"
                    width={48}
                    height={48}
                  />
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Follow us on Instagram"
                >
                  <Image
                    src="/images/ig-icon.png"
                    alt="Instagram Icon"
                    width={48}
                    height={48}
                  />
                </Link>
                <Link 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-transparent flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Follow us on LinkedIn"
                >
                  <Image
                    src="/images/linkedin-icon.png"
                    alt="LinkedIn Icon"
                    width={48}
                    height={48}
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-6">
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <p className="text-md text-black leading-snug">
                Sign up for <span className="text-[#d93732] font-semibold">HEI Newsletter</span> and never miss another update!
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A83F3F] focus:border-transparent"
                />
                <button className="w-full bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-bold py-3 px-6 rounded-lg text-sm hover:opacity-90 transition-opacity">
                  SIGN ME UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Legal Links */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © Halal Expo Indonesia 2025. All Right Reserved.
            </div>
            <div className="text-sm text-gray-500">
              <Link href="/terms" className="hover:text-gray-700 transition-colors">
                Terms & Conditions
              </Link>
              <span className="mx-2">|</span>
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
