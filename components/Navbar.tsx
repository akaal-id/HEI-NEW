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
        <div className="md:h-[160px] h-[80px] relative flex items-start md:py-10 py-2 xl:h-[140px] xl:py-8">
          <div className="md:w-[220px] w-[140px] md:h-[120px] h-[96px] bg-white flex items-center justify-center px-3 shadow-2xl xl:w-[200px] xl:h-[110px] xl:px-2.5">
            <Link href="/" className="flex items-center justify-center">
              <img
                src="/images/logo-hei.png"
                alt="hei logo"
                className="md:h-[72px] h-[48px] xl:h-[68px]"
              />
            </Link>
          </div>
          {/* gradient accent bottom - Desktop */}
          <div
            className="absolute left-0 -bottom-2 w-[220px] h-2 hidden md:block xl:w-[200px]"
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
        <nav className="hidden md:flex flex-1 items-center justify-center h-[72px] xl:h-[68px]" aria-label="Main navigation">
          <ul className="flex gap-10 items-center text-lg font-normal relative xl:gap-8 xl:text-base" role="menubar">
            <li className="relative group" role="none">
              <Link href="/" className={`transition-colors ${pathname === "/" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`} role="menuitem" aria-current={pathname === "/" ? "page" : undefined}>
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
            <li className="relative group" role="none">
              <div className={`transition-colors ${pathname === "/about" || pathname === "/the-organizer" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`} role="menuitem" aria-haspopup="true" aria-expanded="false">
                ABOUT
              </div>
              {/* Active underline - only show when active */}
              {(pathname === "/about" || pathname === "/the-organizer") && (
                <div className="absolute -bottom-6 left-0 w-full h-1 bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
              )}
              {/* Hover underline - only show when not active */}
              {pathname !== "/about" && pathname !== "/the-organizer" && (
                <div className="absolute -bottom-6 left-0 w-0 h-1 bg-gradient-to-r from-[#d93732] to-[#492f32] group-hover:w-full transition-all duration-300"></div>
              )}
              
              {/* Dropdown Menu */}
              <div className="absolute top-8 left-0 mt-6 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 xl:mt-5 xl:w-60" role="menu" aria-label="About submenu">
                <div className="py-2">
                  <Link 
                    href="/about" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors xl:px-3 xl:py-2.5"
                    role="menuitem"
                  >
                    About HEI
                  </Link>
                  <Link 
                    href="/the-organizer" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors xl:px-3 xl:py-2.5"
                    role="menuitem"
                  >
                    The Organizer
                  </Link>
                </div>
              </div>
            </li>
            <li className="relative group" role="none">
              <Link href="/exhibition" className={`transition-colors ${pathname === "/exhibition" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`} role="menuitem" aria-current={pathname === "/exhibition" ? "page" : undefined}>
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
            <li className="relative group" role="none">
              <Link href="/visit-the-expo" className={`transition-colors ${pathname === "/visit-the-expo" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`} role="menuitem" aria-current={pathname === "/visit-the-expo" ? "page" : undefined}>
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
            <li className="relative group" role="none">
              <Link href="/press" className={`transition-colors ${pathname === "/press" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`} role="menuitem" aria-current={pathname === "/press" ? "page" : undefined}>
                PRESS AND MEDIA
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
            <li className="relative group" role="none">
              <div  className={`transition-colors ${pathname === "/registration/exhibitor" ? "text-red-600 font-semibold" : "text-black hover:text-red-600"}`} role="menuitem" aria-haspopup="true" aria-expanded="false">
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
              <div className="absolute top-8 left-0 mt-6 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 xl:mt-5 xl:w-60" role="menu" aria-label="Registration submenu">
                <div className="py-2">
                  <Link 
                    href="/registration/exhibitor" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors xl:px-3 xl:py-2.5"
                    role="menuitem"
                  >
                    Register as Exhibitor
                  </Link>
                  <Link 
                    href="/registration/buyer" 
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors xl:px-3 xl:py-2.5"
                    role="menuitem"
                  >
                    Register as Buyer
                  </Link>
                  <a 
                    href="https://2025.tradexpoindonesia.com/register" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors xl:px-3 xl:py-2.5"
                    role="menuitem"
                  >
                    Register as Visitor
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* contact button - Desktop */}
        <div className="hidden md:flex items-center h-[72px] mr-6 xl:h-[68px] xl:mr-5">
          <div
            className="rounded-lg p-0.5"
            style={{
              background: "linear-gradient(90deg,#492f32,#d93732)",
            }}
          >
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-3 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-md px-4 py-2 text-white font-semibold hover:bg-gradient-to-r hover:from-[#492f32] hover:to-[#d93732] transition-all duration-300 xl:gap-2.5 xl:px-3.5 xl:py-1.5"
            >
              <img
                src="/images/phone-icon.png"
                alt="phone"
                style={{ height: 20 }}
                className="xl:h-[18px]"
              />
              <span className="uppercase text-sm xl:text-xs">Contact Us</span>
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
              <nav className="px-6 py-8" aria-label="Mobile navigation">
                <ul className="space-y-6" role="menubar">
                  <li role="none">
                    <Link 
                      href="/" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      HOME
                    </Link>
                  </li>
                  <li role="none">
                    <div className="text-lg font-medium text-gray-900 mb-2" role="menuitem" aria-haspopup="true">ABOUT</div>
                    <div className="ml-4 space-y-2" role="menu" aria-label="About submenu">
                      <Link 
                        href="/about" 
                        className="block text-base text-gray-700 hover:text-red-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        About HEI
                      </Link>
                      <Link 
                        href="/the-organizer" 
                        className="block text-base text-gray-700 hover:text-red-600 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        The Organizer
                      </Link>
                    </div>
                  </li>
                  <li role="none">
                    <Link 
                      href="/exhibition" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      EXHIBITION
                    </Link>
                  </li>
                  <li role="none">
                    <Link 
                      href="/visit-the-expo" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      VISIT THE EXPO
                    </Link>
                  </li>
                  <li role="none">
                    <Link 
                      href="/press" 
                      className="block text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      PRESS AND MEDIA
                    </Link>
                  </li>
                  <li role="none">
                    <Link 
                      href="/registration/exhibitor" 
                      className="block text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      REGISTRATION AS EXHIBITOR
                    </Link>
                  </li>
                  <li role="none">
                    <Link 
                      href="/registration/buyer" 
                      className="block text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      REGISTRATION AS BUYER
                    </Link>
                  </li>
                  <li role="none">
                    <Link 
                      href="https://2025.tradexpoindonesia.com/register" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 30, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-white/20"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600">Get in touch with our team</p>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-4">
                {/* Sales Team */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">Sales Team</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* WhatsApp Button */}
                    <a
                      href="https://wa.me/6281274170664"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span className="text-sm">WhatsApp</span>
                    </a>

                    {/* Email Button */}
                    <a
                      href="mailto:sales@halalexpoindonesia.com"
                      className="group/btn flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>

                {/* Marketing Team */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#492f32] to-[#d93732] rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">Marketing Team</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* WhatsApp Button */}
                    <a
                      href="https://wa.me/6285777592538"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span className="text-sm">WhatsApp</span>
                    </a>

                    {/* Email Button */}
                    <a
                      href="mailto:marketing@halalexpoindonesia.com"
                      className="group/btn flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
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
