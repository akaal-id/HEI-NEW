"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loader on initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loader for 1.5 seconds on initial load

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show loader during navigation
    setIsNavigating(true);
    
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 800); // Show loader for 800ms during navigation

    return () => clearTimeout(timer);
  }, [pathname]);

  // Don't show loader if not loading and not navigating
  if (!isLoading && !isNavigating) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="text-center">
        {/* Rotating Circle */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer rotating circle with gradient */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-[#d93732] to-[#492f32] loader-spin">
            <div className="absolute inset-1 rounded-full bg-white"></div>
          </div>
          
          {/* Inner rotating circle */}
          <div className="absolute inset-2 rounded-full border-4 border-transparent bg-gradient-to-r from-[#d8793a] to-[#593a19] loader-spin-reverse">
            <div className="absolute inset-1 rounded-full bg-white"></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-[#d93732] to-[#492f32]"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-2xl font-semibold text-gray-800">
          Loading page
        </div>
        
        {/* Loading dots animation */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-[#d93732] rounded-full loader-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[#d93732] rounded-full loader-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[#d93732] rounded-full loader-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
