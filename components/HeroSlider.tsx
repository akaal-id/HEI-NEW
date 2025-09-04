"use client";
import { useState, useEffect } from "react";
import CarouselCard from "./CarouselCard";

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  text: string;
  slug: string;
}

interface HeroSliderProps {
  pressData: PressArticle[];
}

// Mock images and public images data
const mockImages = [
  { id: "mock-1", imageUrl: "https://picsum.photos/400/400?random=1", slug: "mock-1" },
  { id: "mock-2", imageUrl: "https://picsum.photos/400/400?random=2", slug: "mock-2" },
  { id: "mock-3", imageUrl: "https://picsum.photos/400/400?random=3", slug: "mock-3" },
  { id: "mock-4", imageUrl: "https://picsum.photos/400/400?random=4", slug: "mock-4" },
  { id: "mock-5", imageUrl: "https://picsum.photos/400/400?random=5", slug: "mock-5" },
  { id: "mock-6", imageUrl: "https://picsum.photos/400/400?random=6", slug: "mock-6" },
];

const publicImages = [
  { id: "public-1", imageUrl: "/images/image-export-1.jpg", slug: "public-1" },
  { id: "public-2", imageUrl: "/images/image-export-2.jpg", slug: "public-2" },
  { id: "public-3", imageUrl: "/images/image-export-3.jpg", slug: "public-3" },
  { id: "public-4", imageUrl: "/images/IMG_0914.JPG", slug: "public-4" },
  { id: "public-5", imageUrl: "/images/IMG_7166.JPG", slug: "public-5" },
  { id: "public-6", imageUrl: "/images/IMG_7352.JPG", slug: "public-6" },
];

export default function HeroSlider({ pressData }: HeroSliderProps) {
  const [topScrollPosition, setTopScrollPosition] = useState(0);
  const [bottomScrollPosition, setBottomScrollPosition] = useState(0);

  // Combine all image sources
  const allImages = [
    ...pressData.map(article => ({ id: article.id, imageUrl: article.imageUrl, slug: article.slug })),
    ...mockImages,
    ...publicImages
  ];

  // Auto-scroll top row (right direction)
  useEffect(() => {
    const topInterval = setInterval(() => {
      setTopScrollPosition(prev => prev + 1);
    }, 50);

    return () => clearInterval(topInterval);
  }, []);

  // Auto-scroll bottom row (left direction)
  useEffect(() => {
    const bottomInterval = setInterval(() => {
      setBottomScrollPosition(prev => prev - 1);
    }, 50);

    return () => clearInterval(bottomInterval);
  }, []);

  return (
    <div className="bg-white pt-32 pb-20">
      <div className="w-full px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Press and <span className="bg-gradient-to-r from-[#d93732] to-[#fdad00] bg-clip-text text-transparent">Media</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, insights, and developments in the halal industry and our events.
          </p>
        </div>

        {/* Top Row - Scroll Right */}
        <div className="mb-8 overflow-hidden w-full">
          <div 
            className="flex space-x-4 animate-scroll-right"
            style={{
              transform: `translateX(${topScrollPosition}px)`,
              width: `${allImages.length * 400}px`
            }}
          >
            {allImages.map((image, index) => (
              <div key={`top-${image.id}-${index}`} className="flex-shrink-0 w-96 h-54">
                <CarouselCard
                  id={image.id}
                  imageUrl={image.imageUrl}
                  slug={image.slug}
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {allImages.map((image, index) => (
              <div key={`top-duplicate-${image.id}-${index}`} className="flex-shrink-0 w-96 h-54">
                <CarouselCard
                  id={image.id}
                  imageUrl={image.imageUrl}
                  slug={image.slug}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Scroll Left */}
        <div className="overflow-hidden w-full">
          <div 
            className="flex space-x-4 animate-scroll-left"
            style={{
              transform: `translateX(${bottomScrollPosition}px)`,
              width: `${allImages.length * 400}px`
            }}
          >
            {allImages.map((image, index) => (
              <div key={`bottom-${image.id}-${index}`} className="flex-shrink-0 w-96 h-54">
                <CarouselCard
                  id={image.id}
                  imageUrl={image.imageUrl}
                  slug={image.slug}
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {allImages.map((image, index) => (
              <div key={`bottom-duplicate-${image.id}-${index}`} className="flex-shrink-0 w-96 h-54">
                <CarouselCard
                  id={image.id}
                  imageUrl={image.imageUrl}
                  slug={image.slug}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
