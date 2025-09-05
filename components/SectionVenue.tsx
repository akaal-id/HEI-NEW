"use client";
import { motion } from "framer-motion";

export default function SectionVenue() {
  return (
    <motion.section
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="py-20 bg-transparent"
    >
      {/*Venue Section*/}
      <div className="relative min-h-[720px] flex items-center justify-center overflow-hidden py-24 px-12">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/image-export-3.jpg"
            alt="Halal Expo Indonesia Exhibition Hall"
            className="object-cover object-center w-full h-full"
            style={{ position: "absolute", inset: 0 }}
            loading="eager"
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
                <motion.a 
                  href="https://maps.app.goo.gl/HdvdrLgwDbECeoNP7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-[#d93732] text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-[#c02d28] transition-colors duration-300 hover:scale-105"
                >
                  Get Directions
                </motion.a>
                <motion.a 
                  href="https://ice-indonesia.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 hover:scale-105"
                >
                  Learn More
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
