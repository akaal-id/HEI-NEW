"use client";
import { useState, useEffect } from "react";

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
    <section className="bg-[#492f32] py-12 px-2 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section - Promotional Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-light text-white leading-tight">
              <span className="text-white">Get ready to join the largest </span>
              <span className="text-[#d49e00] font-semibold text-4xl lg:text-4xl">B2B Halal Export Exhibition</span>
              <span className="text-white"> in the country</span>
            </h1>
          </div>

          {/* Right Section - Countdown Timer */}
          <div className="flex flex-row relative items-center gap-6 px-2 md:px-0">
            {/* Days */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1">Days</div>
            </div>

            {/* Separator */}
            <div className="w-px md:h-32 h-24 bg-white"></div>

            {/* Hours */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1">Hours</div>
            </div>

            {/* Separator */}
            <div className="w-px md:h-32 h-24 bg-white"></div>

            {/* Minutes */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1">Minutes</div>
            </div>

            {/* Separator */}
            <div className="w-px md:h-32 h-24 bg-white"></div>

            {/* Seconds */}
            <div className="text-center">
              <div className="text-4xl lg:text-7xl font-medium text-[#d49e00] leading-none md:w-16 w-12 lg:w-24 text-center">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-white text-sm lg:text-base mt-1">Second</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
