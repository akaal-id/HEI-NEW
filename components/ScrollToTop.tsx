'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(scrollPercent);
    };

    // Initial check
    toggleVisibility();
    updateScrollProgress();

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Calculate the circumference and stroke-dasharray
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(scrollProgress / 100) * circumference} ${circumference}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 group"
        >
          {/* Progress Ring Container */}
          <div className="relative w-16 h-16">
            {/* Background Circle */}
            <svg
              className="w-16 h-16 transform -rotate-90"
              viewBox="0 0 36 36"
            >
              {/* Background Circle */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Progress Circle */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#scrollGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                className="transition-all duration-300 ease-out"
                style={{
                  strokeDashoffset: 0,
                }}
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d93732" />
                  <stop offset="100%" stopColor="#492f32" />
                </linearGradient>
              </defs>
            </svg>

            {/* Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-[#d93732] to-[#492f32] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              {/* Arrow Icon */}
              <svg
                className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </motion.button>

            {/* Progress Percentage Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {Math.round(scrollProgress)}%
            </div>
          </div>

          {/* Pulse Animation Ring */}
          <motion.div
            className="absolute inset-0 w-16 h-16 border-2 border-[#d93732]/20 rounded-full pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
