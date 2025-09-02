'use client';
import { useState } from 'react';
import Image from 'next/image';

// TypeScript interfaces
interface AgendaItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  backgroundImage: string;
  imageAlt: string;
}

// Agenda data
const agendaItems: AgendaItem[] = [
  {
    id: 'exhibition',
    title: 'Exhibition',
    shortDescription: 'Showcase your products and services to global buyers',
    fullDescription: 'Join the largest B2B Halal Export Exhibition in Southeast Asia. Connect with international buyers, showcase your innovative products, and strengthen your value chains. Our exhibition provides the perfect platform for businesses to expand their global reach and establish meaningful partnerships in the halal industry.',
    backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Exhibition hall with booths and displays'
  },
  {
    id: 'coaching-clinic',
    title: 'Coaching Clinic',
    shortDescription: 'Expert guidance for business growth and development',
    fullDescription: 'Get personalized coaching from industry experts to accelerate your business growth. Our coaching clinics cover essential topics including market entry strategies, halal certification processes, export regulations, and digital transformation. Learn from seasoned professionals who have successfully navigated the global halal market.',
    backgroundImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Professional coaching session in modern office'
  },
  {
    id: 'business-matching',
    title: 'Business Matching',
    shortDescription: 'Connect with potential partners and buyers',
    fullDescription: 'Our advanced business matching system connects you with the right partners, suppliers, and buyers. Through our AI-powered platform and expert facilitation, you\'ll meet qualified prospects who match your business needs. Maximize your networking opportunities and build lasting relationships that drive growth.',
    backgroundImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    imageAlt: 'Business professionals shaking hands in meeting'
  },
  {
    id: 'seminar-business',
    title: 'Seminar Business',
    shortDescription: 'Learn from industry leaders and market insights',
    fullDescription: 'Attend comprehensive business seminars featuring industry leaders, market analysts, and successful entrepreneurs. Topics include halal market trends, regulatory updates, supply chain optimization, and emerging opportunities. Gain actionable insights and strategies to stay competitive in the evolving halal economy.',
    backgroundImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Business seminar with audience and presenter'
  },
  {
    id: 'conference',
    title: 'Conference',
    shortDescription: 'High-level discussions on halal industry future',
    fullDescription: 'Join thought leaders, policymakers, and industry experts for in-depth discussions about the future of the halal industry. Our conference features keynote presentations, panel discussions, and interactive sessions covering topics such as sustainability, innovation, digital transformation, and global market expansion strategies.',
    backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    imageAlt: 'Large conference hall with stage and audience'
  }
];

export default function ExhibitionPage() {
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
      return `${baseClasses} scale-85 opacity-20 blur-md z-10 left-1/2 transform -translate-x-full -translate-x-8`;
    } else if (isRight) {
      return `${baseClasses} scale-85 opacity-20 blur-md z-10 left-1/2 transform translate-x-8`;
    } else if (isFarLeft) {
      return `${baseClasses} scale-85 opacity-20 blur-md z-5 left-1/2 transform -translate-x-full -translate-x-16`;
    } else if (isFarRight) {
      return `${baseClasses} scale-85 opacity-20 blur-md z-5 left-1/2 transform translate-x-8`;
    } else {
      return `${baseClasses} scale-85 opacity-20 blur-md z-0 left-1/2 transform -translate-x-1/2`;
    }
  };

  return (
    <div className="py-24 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-left md:text-center">
        <h1 className="mb-6">
        <span className="text-5xl md:text-6xl font-normal text-gray-700 mb-2">Get to Know More About </span>
        <br />
          <span className="text-6xl md:text-7xl font-semibold text-[#d93732]">Halal Export Indonesia </span>
          <br />
          <span className="text-5xl md:text-6xl font-normal text-gray-700">Exhibition Agenda</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed tracking-wide">
          Discover our comprehensive program designed to connect businesses, share knowledge, and drive growth in the global halal industry.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="items-center justify-center max-w-6xl mx-auto px-8">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevCard}
            className="absolute left-4 md:left-24 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 hover:text-[#d93732] p-2 md:p-3 rounded-full shadow-lg transition-all duration-300"
            aria-label="Previous card"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextCard}
            className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-700 hover:text-[#d93732] p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Next card"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center px-8">
            <div className="relative w-full max-w-7xl h-[500px] md:h-[600px]">
              {agendaItems.map((item, index) => (
                <div
                  key={item.id}
                  className={getCardClasses(index)}
                  style={{ width: 'clamp(280px, 80vw, 720px)' }}
                >
                <div className={`relative items-center justify-center aspect-square md:aspect-[16/9] rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ${
                  index === activeIndex ? 'shadow-xl shadow-[#d93732]/20' : 'shadow-lg'
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
                    <h3 className="text-4xl font-bold mb-4 text-left">
                      {item.title}
                    </h3>
                    <p className="text-xl opacity-90 text-left leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Indicators */}
          <div className="flex justify-center -mt-40 space-x-3">
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

      {/* Detailed Description Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="p-8 md:p-12">
          <div
            key={activeIndex}
            className="animate-fade-in"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {agendaItems[activeIndex].title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {agendaItems[activeIndex].fullDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-[#d93732] to-[#492f32] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Get in touch with our team to learn more about participation opportunities and how you can be part of this transformative event.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:sales@halalexportindonesia.com"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#d93732] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Sales
            </a>
            
            <a
              href="mailto:marketing@halalexportindonesia.com"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#d93732] transition-all duration-300 hover:scale-105"
            >
              <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Contact Marketing
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}