"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";

// TypeScript interfaces
interface AgendaItem {
  id: string;
  title: string;
  shortDescription: string;
  backgroundImage: string;
  imageAlt: string;
}

// Simplified agenda data for sneak peek
const agendaItems: AgendaItem[] = [
  {
    id: 'exhibition',
    title: 'Exhibition',
    shortDescription: 'Showcase your products and services to global buyers',
    backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Exhibition hall with booths and displays'
  },
  {
    id: 'coaching-clinic',
    title: 'Coaching Clinic',
    shortDescription: 'Expert guidance for business growth and development',
    backgroundImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Professional coaching session in modern office'
  },
  {
    id: 'business-matching',
    title: 'Business Matching',
    shortDescription: 'Connect with potential partners and buyers',
    backgroundImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    imageAlt: 'Business professionals shaking hands in meeting'
  },
  {
    id: 'seminar-business',
    title: 'Seminar Business',
    shortDescription: 'Learn from industry leaders and market insights',
    backgroundImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Business seminar with audience and presenter'
  },
  {
    id: 'conference',
    title: 'Conference',
    shortDescription: 'High-level discussions on halal industry future',
    backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Large conference hall with stage and audience'
  }
];

export default function SectionExhibition() {
  const [activeIndex, setActiveIndex] = useState(0); // Exhibition card (first card) is default center

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % agendaItems.length); // Infinite loop: 0->1->2->3->4->0
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + agendaItems.length) % agendaItems.length); // Infinite loop: 0->4->3->2->1->0
  };

  const goToCard = (index: number) => {
    setActiveIndex(index);
  };

  const getCardClasses = (index: number) => {
    const diff = index - activeIndex;
    const isActive = diff === 0;
    const isLeft = diff === -1 || (activeIndex === 0 && index === agendaItems.length - 1);
    const isRight = diff === 1 || (activeIndex === agendaItems.length - 1 && index === 0);
    const isFarLeft = diff === -2 || (activeIndex === 1 && index === agendaItems.length - 1) || (activeIndex === 0 && index === agendaItems.length - 2);
    const isFarRight = diff === 2 || (activeIndex === agendaItems.length - 2 && index === 0) || (activeIndex === agendaItems.length - 1 && index === 1);
    
    const baseClasses = 'absolute transition-all duration-700 ease-in-out';
    
    if (isActive) {
      return `${baseClasses} scale-100 opacity-100 z-20 left-1/2 transform -translate-x-1/2`;
    } else if (isLeft) {
      return `${baseClasses} scale-85 opacity-30 blur-md z-10 left-1/2 transform -translate-x-full -translate-x-8`;
    } else if (isRight) {
      return `${baseClasses} scale-85 opacity-30 blur-md z-10 left-1/2 transform translate-x-8`;
    } else if (isFarLeft) {
      return `${baseClasses} scale-85 opacity-30 blur-md z-5 left-1/2 transform -translate-x-full -translate-x-16`;
    } else if (isFarRight) {
      return `${baseClasses} scale-85 opacity-30 blur-md z-5 left-1/2 transform translate-x-8`;
    } else {
      return `${baseClasses} scale-85 opacity-30 blur-md z-0 left-1/2 transform -translate-x-1/2`;
    }
  };

  return (
    <motion.section
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="py-20 bg-transparent"
    >
      <div className="mx-auto px-0 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Exhibition <span className="text-[#d93732]">Agenda</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive program designed to connect businesses, share knowledge, and drive growth in the global halal industry.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="items-center justify-center max-w-6xl mx-auto mb-12">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevCard}
              className="absolute left-2 md:left-24 top-40 md:top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-700 hover:text-[#d93732] p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous card"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextCard}
              className="absolute right-2 md:right-24 top-40 md:top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-gray-700 hover:text-[#d93732] p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next card"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Cards Container */}
          <div className="flex items-center justify-center overflow-hidden md:overflow-visible">
            <div className="relative w-screen h-[500px] md:h-[600px]">
              {agendaItems.map((item, index) => (
                <div
                  key={item.id}
                  className={getCardClasses(index)}
                  style={{ width: 'clamp(346px, 80vw, 820px)' }}
                >
                <div className={`relative items-center justify-center aspect-square md:aspect-[16/9] rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${
                  index === activeIndex ? 'shadow-xl shadow-[#d93732]/60' : 'shadow-lg'
                }`}
                     onClick={() => goToCard(index)}>
                  {/* Background Image */}
                  <Image
                    src={item.backgroundImage}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    priority={index === activeIndex}
                  />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 text-left">
                          {item.title}
                        </h3>
                        <p className="text-md md:text-xl opacity-90 text-left leading-relaxed">
                          {item.shortDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Indicators */}
            <div className="flex justify-center -mt-32 md:-mt-24 space-x-3">
              {agendaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCard(index)}
                  className={`w-3 h-3 rounded-xl transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[#d93732] scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to ${agendaItems[index].title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Learn More Button */}
        <div className="text-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/exhibition"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Learn More About Exhibition
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Brochure Section */}
        <div className="w-full mx-auto px-6 py-16 text-center bg-gray-100 mt-16">
          <div className="mb-12">
            <div className="mx-auto flex w-24 h-24 justify-center items-center bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-full p-6 mb-8">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            </div>
            <h2 className="text-3xl md:text-5xl font-normal text-gray-900 leading-tight mb-4">
              Download Exhibition <br />
              <span className="text-6xl md:text-7xl font-bold text-[#d93732]">Brochure</span>
            </h2>
            <p className="text-md md:text-lg text-gray-600 leading-relaxed mb-8">
              Read our brochure to learn more about <br /> <span className="text-[#d93732] font-bold">Halal Export Indonesia</span><span className="text-gray-600"> and </span><span className="text-[#d93732] font-bold">Halal Expo Indonesia</span>.
            </p>
            
            {/* Brochure Buttons Container */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* Halal Expo Indonesia 2026 Brochure */}
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/brochures/Halal Expo Indonesia 2026.pdf';
                  link.download = 'Halal-Expo-Indonesia-2026-Brochure.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold py-4 px-8 w-full md:w-auto md:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Halal Expo Indonesia 2026</span>
              </motion.button>

              {/* The 2nd Halal Export Indonesia Brochure */}
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/brochures/The 2nd Halal Export Indonesia.pdf';
                  link.download = 'The-2nd-Halal-Export-Indonesia-Brochure.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#d93732] text-[#d93732] font-semibold py-4 px-8 w-full md:w-auto md:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>The 2nd Halal Export Indonesia</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
