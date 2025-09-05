"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


export default function Hero() {
  return (
    <section className="relative min-h-screen bg-transparent" id="home">
      {/* Main Content */}
      <div className="relative z-10">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <DesktopHero />
        </div>
        
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <MobileHero />
        </div>
      </div>
    </section>
  );
}

function DesktopHero() {
  return (
    <div className="relative aspect-[16/6] md:mt-[72px] mt-[48px] mb-12">
  {/* Text Content Container - within max-w-6xl */}
  <div className="max-w-6xl mx-auto relative z-20">
    <div className="pt-32 pb-16 xl:pt-28 xl:pb-14">
      {/* Logo with blur animation */}
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeIn", delay: 1 }}
        className="mb-6 xl:mb-5"
      >
        <Image
          src="/images/hexi_logo.png"
          alt="HALAL EXPORT Indonesia Logo"
          width={240}
          height={60}
          className="mb-4 xl:mb-3"
        />
      </motion.div>

      {/* Subtitle with blur animation */}
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 1.3 }}
        className="mb-10 xl:mb-8"
      >
        <p className="text-6xl font-semibold text-gray-700 mb-2 xl:text-6xl">The Premiere</p>
        <p className="text-6xl font-semibold text-red-600 mb-2 xl:text-6xl">Halal Trade Exhibition</p>
        <p className="text-6xl font-semibold text-gray-700 xl:text-6xl">In Southeast Asia</p>
      </motion.div>

      {/* Description with blur animation */}
      <motion.p
        initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 1.6 }}
        className="text-2xl font-light text-gray-600 mb-6 leading-snug max-w-md xl:text-xl xl:mb-5 xl:max-w-sm"
      >
        Connecting businesses, fostering innovation, and shaping the future of the global halal economy.
      </motion.p>

      {/* CTA Text with blur animation */}
      <motion.p
        initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 1.9 }}
        className="text-2xl font-semibold text-gray-700 mb-10"
      >
        Join us at the 2nd Halal Export Indonesia
      </motion.p>

      {/* CTA Button with blur animation */}
      <motion.button
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1, ease: "easeIn", delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold py-4 px-6 rounded-lg text-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        BOOK SPACE NOW!
      </motion.button>
    </div>
  </div>
      {/* Right Section - Image positioned outside max-w-6xl to the right side */}
      <div className="absolute -top-24 -right-24 w-3/5 h-[120%]">
        {/* Main Image Container */}
        <div className="relative w-full h-full">
          {/* Main Image - Full display for desktop */}
          <div className="absolute inset-0">
            <Image
              src="/images/mainkv.png"
              alt="Container Ship"
              fill
              className="object-contain object-center"
              priority
              sizes="60vw"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-24 bg-gradient-to-r from-[#d8793a] to-[#593a19] rounded-lg shadow-lg z-30">
        <div className="mx-auto px-12 py-4">
          <div className="flex items-center justify-between h-full">
            {/* Left Link */}
            <Link 
              href="/registration/exhibitor"
              className="text-white font-normal text-lg hover:text-orange-200 transition-colors duration-300 flex items-center gap-3"
            >
              <span className="text-xl xl:text-lg">←</span>
              <span>Register as Exhibitor</span>
            </Link>

            {/* Separator */}
            <div className="w-[1px] h-16 bg-white"></div>

            {/* Center Event Details */}
            <Link 
              href="https://maps.app.goo.gl/xqe7Df3FKqDEYM8z9" target="_blank" rel="noopener noreferrer"
              className="text-white font-normal text-lg hover:text-orange-200 transition-colors duration-300 flex items-center gap-3 xl:text-base xl:gap-2"
            >
              <span>@ICE BSD, Indonesia - October, 15th–19th 2025</span>
            </Link>

            {/* Separator */}
            <div className="w-[1px] h-16 bg-white"></div>

            {/* Right Link */}
            <Link 
              href="/registration/buyer"
              className="text-white font-normal text-lg hover:text-orange-200 transition-colors duration-300 flex items-center gap-3 xl:text-base xl:gap-2"
            >
              <span>Register as Buyer</span>
              <span className="text-xl xl:text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileHero() {
  return (
    <div className="relative z-20 min-h-screen md:mt-[72px] mt-[48px]">
      {/* Top Image - Full Width with 1:1 Aspect Ratio */}
      <div className="w-full aspect-square relative">
        <Image
          src="/images/mainkv-mobile.png"
          alt="Halal Export Indonesia Mobile Hero"
          fill
          className="object-cover"
          priority
          sizes="60vw"
        />
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="flex flex-row items-center h-full">
        {/* Left Section - Text Content */}
        <div className="flex flex-col p-6 pt-6">
          {/* Logo */}
          <div className="mb-0">
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeIn", delay: 1 }}
            >
            <Image
              src="/images/hexi_logo.png"
              alt="HALAL EXPORT Indonesia Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            </motion.div>
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeIn", delay: 1.6 }}
            >
            <p className="text-3xl font-semibold text-gray-700">The Premiere</p>
            <p className="text-3xl font-semibold text-red-600">Halal Trade Exhibition</p>
            <p className="text-3xl font-semibold text-gray-700">In Southeast Asia</p>
            </motion.div>
          </div>

          {/* Description */}
          <div className="text-sm text-gray-600 mb-4 leading-snug">
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeIn", delay: 1.9 }}
            >
              <p>
                Connecting businesses, fostering innovation, and shaping the future of the global halal economy.
              </p>
              <br />
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Join us at the 2nd Halal Export Indonesia
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.button
            className="relative w-fit bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            initial={{ filter: "blur(10px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn", delay: 3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK SPACE NOW!
          </motion.button>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative w-full p-6 bg-gradient-to-r from-[#d8793a] to-[#593a19] z-30 mt-4">
        <div className="flex flex-col gap-4 items-center justify-between h-full px-2">
          {/* Left Link */}
          <Link 
            href="/registration/exhibitor"
            className="text-white font-semibold text-sm hover:text-orange-200 transition-colors duration-300 flex items-center gap-2"
          >
            <span>←</span>
            <span>Register as Exhibitor</span>
          </Link>

          {/* Separator */}
          <div className="w-full h-[1px] bg-white"></div>

          {/* Center Event Details */}
          <div className="text-white text-center">
            <span className="font-medium text-sm">@ICE BSD, Indonesia | October, 5th–9th 2025</span>
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-white"></div>

          {/* Right Link */}
          <Link 
            href="/registration/buyer"
            className="text-white font-semibold text-sm hover:text-orange-200 transition-colors duration-300 flex items-center gap-2"
          >
            <span>Register as Buyer</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
