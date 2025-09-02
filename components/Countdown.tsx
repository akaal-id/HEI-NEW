"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-10-15T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      }
    };

    // Update immediately
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <motion.section 
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="bg-[#492f32] py-12 px-2 md:px-0"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section - Promotional Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-light text-white leading-tight">
              <span className="text-white text-3xl">Get ready to join the largest </span>
              <span className="text-[#d49e00] font-semibold text-4xl">B2B Halal Export Exhibition</span>
              <span className="text-white"> in the country</span>
            </h1>
          </div>

          {/* Right Section - Countdown Timer */}
          <div className="flex flex-row relative items-center gap-6 px-2 md:px-0 xl:gap-5">
            {/* Days */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center xl:text-6xl xl:w-20">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1 xl:text-sm">Days</div>
            </div>

            {/* Separator */}
            <div className="w-px md:h-32 h-24 bg-white xl:h-28"></div>

            {/* Hours */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center xl:text-6xl xl:w-20">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1 xl:text-sm">Hours</div>
            </div>

            {/* Separator */}
            <div className="w-px md:h-32 h-24 bg-white xl:h-28"></div>

            {/* Minutes */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center xl:text-6xl xl:w-20">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1 xl:text-sm">Minutes</div>
            </div>

            {/* Separator */}
            <div className="w-px md:h-32 h-24 bg-white xl:h-28"></div>

            {/* Seconds */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center xl:text-6xl xl:w-20">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1 xl:text-sm">Second</div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
