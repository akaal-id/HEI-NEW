"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const hoverScale = {
  scale: 1.02,
  y: -5,
  transition: { duration: 0.2 }
};

const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

export default function VisitTheExpoPage() {
  const whyVisitPoints = [
    {
      title: "Discover Indonesia's Leading Halal Products",
      description: "Experience the uniqueness and premium quality of local halal products — from food and beverages to technology innovations — ready to compete in the global market.",
      icon: "🛍️",
      image: "/images/image-export-1.jpg",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "Get Inspired for Business Innovation",
      description: "See how SMEs and leading producers package their products for international markets, offering valuable insights to grow your own business.",
      icon: "💡",
      image: "/images/image-export-2.jpg",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Gain Halal Industry Insights",
      description: "Join talk shows, product demos, and educational sessions to learn about market trends, halal regulations, and export strategies.",
      icon: "📊",
      image: "/images/image-export-3.jpg",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Experience the Spirit of Halal Export & Innovation",
      description: "More than just an exhibition, the pavilion showcases the dynamic halal ecosystem and Indonesia's journey to becoming a global halal hub.",
      icon: "🌟",
      image: "/images/image-export-1.jpg",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Build Networks with Industry Players & Experts",
      description: "Meet business leaders, halal startups, government representatives, and certification bodies to open doors for collaboration and new opportunities.",
      icon: "🤝",
      image: "/images/image-export-2.jpg",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const visitorCategories = [
    "Buyers & Importers",
    "Retailers & Wholesalers", 
    "Investors & Venture Capitalists",
    "Business Owners & Entrepreneurs",
    "Government Institutions & Regulators",
    "Academics & Students"
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/image-export-1.jpg"
            alt="Halal Export Indonesia Exhibition"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Visit The <span className="text-[#d93732]">Expo</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience Indonesia's Halal Industry Excellence
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/registration"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Register Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Why Visit Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why <span className="text-[#d93732]">Visit</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover the opportunities and insights that await you at Indonesia's premier halal export exhibition
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {whyVisitPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={staggerItem as any}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={point.image}
                      alt={point.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {/* Icon overlay */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                      {point.icon}
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#d93732] transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visitor Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Visitor <span className="text-[#d93732]">Category</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join industry professionals, entrepreneurs, and decision-makers from around the world
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {visitorCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={staggerItem as any}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-[#d93732]/50 h-32 flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#d93732] transition-colors duration-300">
                    {category}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-2xl p-12 md:p-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of Halal?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of industry professionals and discover the opportunities that await in Indonesia's halal ecosystem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/registration"
                  className="inline-flex items-center px-8 py-4 bg-white text-[#d93732] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                >
                  Register as Visitor
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/registration/exhibitor"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#d93732] transition-all duration-300 hover:scale-105"
                >
                  Register as Exhibitor
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}