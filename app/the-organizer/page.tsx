'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function TheOrganizerPage() {
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
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>The Organizer - Halal Expo Indonesia</title>
        <meta name="description" content="Meet PT Angan Kreasi Semesta (Skyconnection), the organizer of Halal Expo Indonesia. Learn about our expertise in event management and halal industry development." />
        <meta name="keywords" content="halal expo organizer, PT Angan Kreasi Semesta, Skyconnection, halal event management, halal industry organizer, halal exhibition management" />
        <meta property="og:title" content="The Organizer - Halal Expo Indonesia" />
        <meta property="og:description" content="Meet PT Angan Kreasi Semesta (Skyconnection), the organizer of Halal Expo Indonesia. Learn about our expertise in event management and halal industry development." />
        <meta property="og:url" content="/the-organizer" />
        <meta property="og:image" content="/images/Angkasa-1.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Organizer - Halal Expo Indonesia" />
        <meta name="twitter:description" content="Meet PT Angan Kreasi Semesta (Skyconnection), the organizer of Halal Expo Indonesia." />
        <meta name="twitter:image" content="/images/Angkasa-1.png" />
        <link rel="canonical" href="/the-organizer" />
      </Head>
      <motion.div 
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeIn" }}
        className="py-12 md:py-12 min-h-screen bg-white mb-12"
      >
      {/* Hero Section with Background Image */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Event Management and Conference Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-[#000000]/80"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-12 text-center">

          {/* Main Title Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 mb-8"
          >
            <h1 className="leading-relaxed">
              <span className="block text-4xl md:text-7xl font-semibold text-white">PT Angan Kreasi Semesta</span>
              <span className="block text-4xl md:text-7xl font-semibold text-[#d93732] bg-gradient-to-r from-[#d93732] to-[#f97316] bg-clip-text text-transparent">
                Skyconnection
              </span>
              <span className="block text-xl md:text-2xl text-white/90 font-light mt-2 sm:mt-4">
                Event Excellence Since 2010
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg text-white/90 leading-relaxed max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4">
              We are a dynamic event planning and organizing company specializing in Meetings, Incentives, Conferences, and Exhibitions (MICE). With over a decade of experience, we deliver impactful and memorable events that connect businesses and drive growth.
            </p>
          </motion.div>

                    {/* Company Logos */}
                    <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8"
          >
            <Link 
              href="https://www.skyconnection.co.id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white transition-all duration-300 hover:scale-105 w-full max-w-xs sm:w-auto"
            >
              <img 
                src="/images/Angkasa-1.png" 
                alt="PT Angan Kreasi Semesta" 
                className="w-auto h-12 sm:h-14 lg:h-16 object-contain mx-auto" 
              />
            </Link>
            <Link 
              href="https://www.skyconnection.co.id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white transition-all duration-300 hover:scale-105 w-full max-w-xs sm:w-auto"
            >
              <img 
                src="/images/skyconnection.png" 
                alt="Skyconnection" 
                className="w-auto h-12 sm:h-14 lg:h-16 object-contain mx-auto" 
              />
            </Link>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            type="button"
            onClick={() => {
              aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20 hover:border-white/40 text-sm sm:text-base"
          >
            Learn More About Us
            <svg className="ml-2 sm:ml-3 w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Company Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Journey & Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over the years, we've built a reputation for excellence in event management and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center bg-gradient-to-br from-[#d93732] to-[#492f32] text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/images/established.png" alt="Year Established" className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">2010</div>
              <div className="text-lg font-medium">Year Established</div>
              <div className="text-sm opacity-90 mt-2">Over 14 years of excellence</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-gradient-to-br from-[#d93732] to-[#492f32] text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/images/event-organizer.png" alt="Specialization" className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">MICE</div>
              <div className="text-lg font-medium">Specialization</div>
              <div className="text-sm opacity-90 mt-2">Meetings, Incentives, Conferences, Exhibitions</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center bg-gradient-to-br from-[#d93732] to-[#492f32] text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <img src="/images/clients.png" alt="Clients" className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg font-medium">Satisfied Clients</div>
              <div className="text-sm opacity-90 mt-2">Trusted by businesses worldwide</div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <div ref={aboutSectionRef} className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Our Story & Mission
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  PT Angan Kreasi Semesta, the organizer of Halal Expo Indonesia, is an event planning and organizing company specializing in Meetings, Incentives, Conferences, and Exhibitions (MICE). Beyond MICE, we also manage various events such as corporate gatherings, product launches, festivals, seminars, workshops, and more.
                </p>
                
                <p className="text-lg">
                  Established in 2010, our company is led by a dynamic professional leader and supported by a team of young, creative, and experienced talents. With passion and expertise, we are committed to delivering impactful and memorable events for our clients.
                </p>

                <p className="text-lg">
                  Our mission is to create exceptional event experiences that connect people, businesses, and ideas. We believe in the power of well-executed events to drive business growth, foster meaningful relationships, and create lasting impact in the communities we serve.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Link
                  href="https://www.skyconnection.co.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Visit Our Website
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#d93732] text-[#d93732] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#d93732] hover:to-[#492f32] hover:text-white"
                >
                  About HEI
                </Link>
              </div>
            </motion.div>

            {/* Right: Image Slider */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white py-20"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive event management solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "MICE Events",
                description: "Meetings, Incentives, Conferences, and Exhibitions",
                icon: "🎯"
              },
              {
                title: "Corporate Events",
                description: "Product launches, corporate gatherings, and business meetings",
                icon: "🏢"
              },
              {
                title: "Festivals & Shows",
                description: "Cultural festivals, entertainment shows, and public events",
                icon: "🎪"
              },
              {
                title: "Seminars & Workshops",
                description: "Educational events, training sessions, and knowledge sharing",
                icon: "📚"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#d93732] to-[#492f32] py-20"
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Create Your Next Event?
          </h3>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Let us help you bring your vision to life with our expertise in event management and our passion for excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="https://www.skyconnection.co.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#d93732] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 w-full md:w-auto"
            >
              Contact Us Today
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#d93732] transition-all duration-300 hover:scale-105 w-full md:w-auto"
            >
              Learn About HEI
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}
