'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="pt-12 md:pt-24 min-h-screen bg-transparent"
    >
      {/* Professional Header Section */}
      <div className="bg-transparent py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-gray-500 text-sm mb-16">
            <Link href="/" className="hover:text-[#d93732] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">About Us</span>
          </nav>

          {/* Main Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-0 md:mb-24">
            {/* Left: Headline and Description */}
            <div className="order-2 lg:order-1 space-y-8">
              <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-gray-900">We build bridges</span>
                <br />
                <span className="text-gray-700">between companies</span>
                <br />
                <span className="text-gray-700">and customers</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                To build software that gives customer-facing teams at small- and medium-sized businesses the ability to create fruitful and enduring relationships with customers.
              </p>
            </div>

            {/* Right: Main Visual */}
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl overflow-hidden">
                <Image
                  src="/images/image-export-2.jpg"
                  alt="Halal Expo Indonesia Team"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
          <button
                 type="button"
                 onClick={() => {
                   aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                 }}
                 className="inline-flex items-center justify-center px-8 py-4 text-[#d93732] border-t-2 font-semibold hover:text-[#492f32] hover:underline transition-all duration-300 w-full mx-auto mt-8 md:mt-0"
               >
                 Learn More
                 <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </button>
          </div>
        </div>
      </div>
     
      {/* Full Width Image Section - 16:6 Aspect Ratio */}
      <div className="relative">
          <div className="aspect-[16/9] md:aspect-[16/6] flex items-center justify-center overflow-hidden">
            <Image
              src="/images/image-export-3.jpg"
              alt="Halal Expo Indonesia Exhibition Hall"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-300"
              priority
            />
          </div>
      </div>

      {/* About HEI Section */}
             <div ref={aboutSectionRef} className="bg-transparent py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Together we are strong
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  As the world's largest Muslim-majority country, Indonesia has a rapidly growing demand for halal products and services. Halal Expo Indonesia is a B2B platform designed to meet this demand by connecting providers with consumers and businesses.
                </p>
                
                <p className="text-lg">
                  The halal industry is not limited to food and beverages — it also includes cosmetics, pharmaceuticals, fashion, tourism, and finance. This exhibition brings together players from across these sectors, creating stronger business networks and driving the growth of the halal economy in Indonesia and beyond.
                </p>
                
                <p className="text-lg">
                  For international businesses, Halal Expo Indonesia opens opportunities to enter the Indonesian market and build partnerships with local stakeholders. Collaboration and global expansion are at the heart of this event.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Link
                  href="/registration/exhibitor"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Book Your Space!
                </Link>
                <Link
                  href="/exhibition"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#d93732] text-[#d93732] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#d93732] hover:to-[#492f32] hover:text-white"
                >
                  See Exhibition
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square bg-white rounded-2xl p-8 flex items-center justify-center shadow-xl">
                <Image
                  src="/images/hexi_logo.png"
                  alt="Halal Expo Indonesia - About HEI"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Venue Section*/}
      <div className="relative min-h-[720px] flex items-center justify-center overflow-hidden py-24 px-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/image-export-3.jpg"
            alt="Halal Expo Indonesia Exhibition Hall"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-[#000000] bg-opacity-60"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto bg-gray-900 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* Left Card - Google Maps Embed */}
            <div className="flex-1 w-auto md:h-auto h-full aspect-square mx-auto overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22183.12786956257!2d106.6362648!3d-6.3032437!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb535f152305%3A0x34406ed8b098f478!2sIndonesia%20Convention%20Exhibition%20(ICE)%20BSD%20City!5e1!3m2!1sen!2sid!4v1757008356601!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ICE BSD Location Map"
                ></iframe>
            </div>

            {/* Right Card - Venue Details */}
            <div className="max-w-2xl md:max-w-3xl mx-auto items-center justify-center text-white p-8 md:p-16">
              <div className="mb-6 mx-auto">
                <h2 className="text-xl md:text-2xl font-normal text-white mb-2">THE VENUE</h2>
                <h3 className="text-4xl md:text-6xl font-bold text-gray-200 mb-4">
                  ICE BSD, Tangerang, Indonesia
                </h3>
                <p className=" text-gray-300 text-sm leading-relaxed pr-0 md:pr-24">
                  Indonesia Convention Exhibition (ICE) BSD, Jl. BSD Grand Boulevard No.1, Pagedangan, Kec. Pagedangan, Kabupaten Tangerang, Banten 15339
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d93732] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white font-medium">October, 15th-19th 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#d93732] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-white font-medium">15.30 - Selesai</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://maps.app.goo.gl/LbXZMbpkHWmRZ8st8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#d93732] text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-[#c02d28] transition-colors duration-300"
                >
                  Get Directions
                </a>
                <a 
                  href="https://ice-indonesia.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Organizer Section */}
      <div className="bg-transparent py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Right: Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                The Organizer
              </h2>
              
              {/* Company Stats */}
              <div className="flex flex-col md:flex-row gap-6 pt-6 justify-between">
                <div className="text-center bg-[#FEFFFF] w-full p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 mx-auto">
                  <img src="/images/established.png" alt="Year Established" className="w-12 h-12 mb-4 mx-auto" />
                  <div className="text-2xl font-bold text-[#d93732] mb-2">2010</div>
                  <div className="text-sm text-gray-600">Year Est.</div>
                </div>
                <div className="text-center bg-[#FEFFFF] w-full p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 mx-auto">
                  <img src="/images/event-organizer.png" alt="Specialization" className="w-12 h-12 mb-4 mx-auto" />
                  <div className="text-2xl font-bold text-[#d93732] mb-2">MICE</div>
                  <div className="text-sm text-gray-600">Specialization</div>
                </div>
                <div className="text-center bg-[#FEFFFF] w-full p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 mx-auto">
                  <img src="/images/clients.png" alt="Clients" className="w-12 h-12 mb-4 mx-auto" />
                  <div className="text-2xl font-bold text-[#d93732] mb-2">1000</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>

              <div className="flex md:flex-row flex-col items-center justify-center gap-12 bg-[#FEFFFF] p-6 rounded-xl shadow-lg">
              <Link href="https://www.skyconnection.co.id/" className="flex flex-row items-start justify-start gap-12" target="_blank" rel="noopener noreferrer">
              <img src="/images/Angkasa-1.png" alt="Organization Logo" className="items-left w-auto max-h-16 hover:-translate-y-1 transition-all duration-300" />
              </Link>
              <Link href="https://www.skyconnection.co.id/" className="flex flex-row items-start justify-start gap-12" target="_blank" rel="noopener noreferrer">
              <img src="/images/skyconnection.png" alt="Organization Logo" className="items-left w-auto max-h-16 hover:-translate-y-1 transition-all duration-300" />
              </Link>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  PT Angan Kreasi Semesta, the organizer of Halal Expo Indonesia, is an event planning and organizing company specializing in Meetings, Incentives, Conferences, and Exhibitions (MICE). Beyond MICE, we also manage various events such as corporate gatherings, product launches, festivals, seminars, workshops, and more.
                </p>
                
                <p className="text-lg">
                  Established in 2010, our company is led by a dynamic professional leader and supported by a team of young, creative, and experienced talents. With passion and expertise, we are committed to delivering impactful and memorable events for our clients.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="https://www.skyconnection.co.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 w-full md:w-auto mx-auto"
                >
                  See Organizer Profile
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
             {/* Right: Image Slider */}
<div className="order-1 lg:order-2 relative">
  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
    {/* Slider Container */}
    <div className="relative w-full h-full overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {['/images/IMG_0914.JPG', '/images/IMG_7166.JPG', '/images/IMG_7352.JPG'].map((src, index) => (
          <div key={src} className="w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`Halal Expo Indonesia ${index + 1}`}
              width={600}
              height={600}
              className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-300"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[1, 2, 3].map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-[#d8793a] to-[#593a19] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Join Us at Halal Expo Indonesia
          </h3>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Be part of the largest B2B Halal Export Exhibition in Southeast Asia and connect with industry leaders from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/registration/exhibitor"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#d93732] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 w-full md:w-auto"
            >
              Register as Exhibitor
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/registration/buyer"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#d93732] transition-all duration-300 hover:scale-105 w-full md:w-auto"
            >
              Register as Buyer
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
