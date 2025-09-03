"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface PressCardProps {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  slug: string;
}

export default function PressCard({ 
  id, 
  title, 
  imageUrl, 
  timestamp, 
  author, 
  slug 
}: PressCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/press/${slug}`}>
      <div
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-80 flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-all duration-300 ${
              isHovered ? "scale-105 brightness-90" : "scale-100 brightness-100"
            }`}
          />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-3">
            {title}
          </h3>

          {/* Author and Timestamp */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
