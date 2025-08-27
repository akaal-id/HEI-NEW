"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#fcfcfc]" id="home">
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
    <div className="relative aspect-video md:mt-[72px] mt-[48px]">
      {/* Text Content Container - within max-w-6xl */}
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="pt-32 pb-16">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/images/hexi_logo.png"
              alt="HALAL EXPORT Indonesia Logo"
              width={240}
              height={60}
              className="mb-4"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-10">
            <p className="text-6xl font-semibold text-gray-700 mb-2">The Premiere</p>
            <p className="text-6xl font-semibold text-red-600 mb-2">Halal Trade Exhibition</p>
            <p className="text-6xl font-semibold text-gray-700">In Southeast Asia</p>
          </div>

          {/* Description */}
          <p className="text-2xl font-light text-gray-600 mb-6 leading-snug max-w-md">
            Connecting businesses, fostering innovation, and shaping the future of the global halal economy.
          </p>

          {/* CTA Text */}
          <p className="text-2xl font-semibold text-gray-700 mb-10">
            Join us at the 2nd Halal Export Indonesia
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold py-4 px-6 rounded-lg text-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            BOOK SPACE NOW!
          </motion.button>
        </div>
      </div>

      {/* Right Section - Image positioned outside max-w-6xl to the right side */}
      <div className="absolute -top-24 right-0 w-3/5 h-[117%]">
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
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="absolute bottom-26 left-1/2 transform -translate-x-1/2 w-full max-w-6xl h-24 bg-gradient-to-r from-[#d8793a] to-[#593a19] rounded-lg shadow-lg z-30">
        <div className="max-w-6xl mx-auto px-12 py-4">
          <div className="flex items-center justify-between h-full">
            {/* Left Link */}
            <Link 
              href="/registration/exhibitor"
              className="text-white font-normal text-lg hover:text-orange-200 transition-colors duration-300 flex items-center gap-3"
            >
              <span className="text-xl">←</span>
              <span>Register as Exhibitor</span>
            </Link>

            {/* Separator */}
            <div className="w-[1px] h-16 bg-white"></div>

            {/* Center Event Details */}
            <Link 
              href="https://maps.app.goo.gl/xqe7Df3FKqDEYM8z9" target="_blank" rel="noopener noreferrer"
              className="text-white font-normal text-lg hover:text-orange-200 transition-colors duration-300 flex items-center gap-3"
            >
              <span>@ICE BSD, Indonesia - October, 15th–19th 2025</span>
            </Link>

            {/* Separator */}
            <div className="w-[1px] h-16 bg-white"></div>

            {/* Right Link */}
            <Link 
              href="/registration/buyer"
              className="text-white font-normal text-lg hover:text-orange-200 transition-colors duration-300 flex items-center gap-3"
            >
              <span>Register as Buyer</span>
              <span className="text-xl">→</span>
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
          sizes="100vw"
        />
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="flex flex-row items-center h-full">
        {/* Left Section - Text Content */}
        <div className="flex flex-col p-6 pt-6">
          {/* Logo */}
          <div className="mb-0">
            <Image
              src="/images/hexi_logo.png"
              alt="HALAL EXPORT Indonesia Logo"
              width={100}
              height={100}
              className="mb-4"
            />
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <p className="text-3xl font-semibold text-gray-700">The Premiere</p>
            <p className="text-3xl font-semibold text-red-600">Halal Trade Exhibition</p>
            <p className="text-3xl font-semibold text-gray-700">In Southeast Asia</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-snug">
            Connecting businesses, fostering innovation, and shaping the future of the global halal economy.
          </p>

          {/* CTA Text */}
          <p className="text-sm font-semibold text-gray-700 mb-6">
            Join us at the 2nd Halal Export Indonesia
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-fit bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold py-3 px-4 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-300"
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
