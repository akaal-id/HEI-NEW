"use client";
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';

export default function SectionAbout() {
  return (
    <motion.section
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="bg-transparent py-20"
      id="about"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            About <span className="text-[#d93732]">Halal Export Indonesia</span>
          </h2>
        </div>
         {/* Quick Stats */}
         <div className="grid grid-cols-1 md:grid-cols-3 bg-[#FEFFFF] gap-8 mt-16 mb-16">
          <div className="text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="/images/export.png" alt="B2B" className="w-16 h-16 mb-3 mx-auto" />
            <div className="text-lg font-semibold text-gray-800 mb-2">Halal Export Platform</div>
            <div className="text-gray-600">Empowering Global Halal Market & Trade Connections</div>
          </div>
          
          <div className="text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="/images/halal.png" alt="Halal" className="w-16 h-16 mb-3 mx-auto" />
            <div className="text-lg font-semibold text-gray-800 mb-2">Halal Exhibitor Diversity</div>
            <div className="text-gray-600">FnB's Logistics, Ingredients, Certification & Technology</div>
          </div>
          
          <div className="text-center p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <img src="/images/global.png" alt="Global" className="w-16 h-16 mb-3 mx-auto" />
            <div className="text-lg font-semibold text-gray-800 mb-2">Global Reach</div>
            <div className="text-gray-600">Gateway to Worldwide & Southeast Asia's Halal Markets</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold pr-6 text-gray-900 leading-tight">
              We build bridges between <span className="text-[#d93732]">Companies & Customers</span>
            </h3>
            
            <div className="space-y-4 text-md text-gray-600 leading-relaxed">
              <p className="">
                As the world's largest Muslim-majority country, Indonesia has a rapidly growing demand for halal products and services. Halal Expo Indonesia is a B2B platform designed to meet this demand by connecting providers with consumers and businesses.
              </p>
              
              <p className="">
                The halal industry is not limited to food and beverages — it also includes cosmetics, pharmaceuticals, fashion, tourism, and finance. This exhibition brings together players from across these sectors, creating stronger business networks and driving the growth of the halal economy in Indonesia and beyond.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#492f32] hover:to-[#d93732]"
              >
                Learn More About Us
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square rounded-2xl flex items-center justify-center shadow-xl overflow-hidden">
              <Image
                src="/images/image-export-1.jpg"
                alt="Halal Expo Indonesia - About HEI"
                width={400}
                height={400}
                className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
