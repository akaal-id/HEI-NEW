"use client";
import { useState, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface PressCardProps {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  slug: string;
  text?: string;
  priority?: boolean;
}

const PressCard = memo(function PressCard({ 
  id, 
  title, 
  imageUrl, 
  timestamp, 
  author, 
  slug,
  text,
  priority = false
}: PressCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link href={`/press/${slug}`}>
      <div
        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Section - Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={imageUrl}
            alt={title}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={`object-cover transition-all duration-300 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
        
        {/* Bottom Section - Content */}
        <div className="p-6 flex flex-col gap-4">
          {/* Timestamp */}
          <div className="text-gray-500 text-sm font-normal">
            {timestamp}
          </div>
          
          {/* Title - Fixed to 2 lines */}
          <div className="h-[3rem] flex items-start">
            <h3 className="text-black text-xl font-bold leading-tight line-clamp-2 overflow-hidden">
              {title}
            </h3>
          </div>
          
          {/* Text Content */}
          <div className="h-[4.5rem] flex items-start">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 overflow-hidden">
              {text || "No content available."}
            </p>
          </div>
          
          {/* Gap */}
          <div className="h-2"></div>
          
          {/* Read Press Button - Responsive */}
          <button className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-black text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
            {/* Desktop: Show text */}
            <span className="hidden sm:inline">Read Press</span>
            
            {/* Mobile: Show icon only */}
            <div className="sm:hidden">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </Link>
  );
});

export default PressCard;
