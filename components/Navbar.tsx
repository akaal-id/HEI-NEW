"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="bg-primaryWhite fixed w-screen z-50 top-0 md:h-[72px] h-[48px] shadow-lg"
    >
      <div className="bg-white mx-auto px-0 flex items-center justify-between md:h-[72px] h-[48px]">
        {/* logo container */}
        <div className="md:h-[160px] h-[80px] relative flex items-start md:py-10 py-2">
          <div className="md:w-[220px] w-[140px] md:h-[120px] h-[96px] bg-white flex items-center justify-center px-3 shadow-2xl">
            <Link href="/" className="flex items-center justify-center">
              <img
                src="/images/logo-hei.png"
                alt="hei logo"
                className="md:h-[72px] h-[48px]"
              />
            </Link>
          </div>
          {/* gradient accent bottom - Desktop */}
          <div
            className="absolute left-0 bottom-0 w-[220px] h-2 hidden md:block"
            style={{
              background: "linear-gradient(90deg,#d93732,#492f32)",
            }}
          />
          {/* gradient accent bottom - Mobile */}
          <div
            className="absolute left-0 bottom-0 w-[140px] h-1.5 md:hidden -mb-6"
            style={{
              background: "linear-gradient(90deg,#d93732,#492f32)",
            }}
          />
        </div>

        {/* center menu - Desktop */}
        <nav className="hidden md:flex flex-1 items-center justify-center h-[72px]">
          <ul className="flex gap-10 items-center text-lg font-normal relative">
            <li className="relative group">
              <Link href="/" className={`transition-colors ${pathname === "/" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                HOME
              </Link>
              {/* Active underline - stick to bottom of navbar */}
              {pathname === "/" && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - stick to bottom of navbar */}
              {pathname !== "/" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
            </li>
            <li className="relative group">
              <Link href="/about" className={`transition-colors ${pathname === "/about" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                ABOUT
              </Link>
              {/* Active underline - stick to bottom of navbar */}
              {pathname === "/about" && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - stick to bottom of navbar */}
              {pathname !== "/about" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
            </li>
            <li className="relative group">
              <Link href="/exhibition" className={`transition-colors ${pathname === "/exhibition" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                EXHIBITION
              </Link>
              {/* Active underline - stick to bottom of navbar */}
              {pathname === "/exhibition" && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - stick to bottom of navbar */}
              {pathname !== "/exhibition" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
            </li>
            <li className="relative group">
              <Link href="/visit-the-expo" className={`transition-colors ${pathname === "/visit-the-expo" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                VISIT THE EXPO
              </Link>
              {/* Active underline - stick to bottom of navbar */}
              {pathname === "/visit-the-expo" && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - stick to bottom of navbar */}
              {pathname !== "/visit-the-expo" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
            </li>
            <li className="relative group">
              <Link href="/press" className={`transition-colors ${pathname === "/press" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                PRESS
              </Link>
              {/* Active underline - stick to bottom of navbar */}
              {pathname === "/press" && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - stick to bottom of navbar */}
              {pathname !== "/press" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
            </li>
            <li className="relative group">
              <div  className={`transition-colors ${pathname === "/registration/exhibitor" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`}>
                REGISTRATION
              </div>
              {/* Active underline - only show when active */}
              {pathname === "/registration/exhibitor" && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - only show when not active */}
              {pathname !== "/registration/exhibitor" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-6 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link 
                    href="/registration/exhibitor" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                  >
                    Register as Exhibitor
                  </Link>
                  <Link 
                    href="/registration/buyer" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                  >
                    Register as Buyer
                  </Link>
                  <a 
                    href="https://2025.tradexpoindonesia.com/register" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors"
                  >
                    Register as Visitor
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* contact button - Desktop */}
        <div className="hidden md:flex items-center h-[72px] mr-6">
          <div
            className="rounded-lg p-0.5"
            style={{
              background: "linear-gradient(90deg,#492f32,#d93732)",
            }}
          >
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-md px-4 py-2 text-white font-semibold hover:bg-gradient-to-r hover:from-[#492f32] hover:to-[#d93732] transition-all duration-300"
            >
              <img
                src="/images/phone-icon.png"
                alt="phone"
                style={{ height: 20 }}
              />
              <span className="uppercase text-sm">Contact Us</span>
            </button>
          </div>
        </div>

        {/* Mobile burger menu button */}
        <div className="md:hidden flex items-center mr-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/50 z-60 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.7,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl"
              style={{ backgroundColor: 'white' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-800"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile menu items */}
              <nav className="px-6 py-8">
                <ul className="space-y-6">
                  <li>
                    <Link 
                      href="/" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/exhibition" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      EXHIBITION
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/visit-the-expo" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      VISIT THE EXPO
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/press" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      PRESS
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/registration/exhibitor" 
                      className="block text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      REGISTRATION AS EXHIBITOR
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/registration/buyer" 
                      className="block text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      REGISTRATION AS BUYER
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="https://2025.tradexpoindonesia.com/register" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      REGISTRATION AS VISITOR
                    </Link>
                  </li>
                </ul>

                {/* Mobile contact button */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div
                    className="rounded-lg p-0.5"
                    style={{
                      background: "linear-gradient(90deg,#492f32,#d93732)",
                    }}
                  >
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-md px-4 py-3 text-white font-semibold"
                    >
                      <img
                        src="/images/phone-icon.png"
                        alt="phone"
                        style={{ height: 20 }}
                      />
                      <span className="uppercase text-sm">Contact Us</span>
                    </button>
                  </div>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              className="bg-white rounded-lg max-w-sm w-full p-6"
            >
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-semibold">Sales: Rindu</div>
                  <div>Whatsapp: +62 812-7417-0664</div>
                  <div>Email: sales@halalexpoindonesia.com</div>
                </div>
                <div>
                  <div className="font-semibold">Marketing: Angel</div>
                  <div>Whatsapp: +62 857-7759-2538</div>
                  <div>Email: marketing@halalexpoindonesia.com</div>
                </div>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded bg-gray-100"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
