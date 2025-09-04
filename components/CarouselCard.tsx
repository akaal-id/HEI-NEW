"use client";
import Image from "next/image";

interface CarouselCardProps {
  id: string;
  imageUrl: string;
  slug: string;
}

export default function CarouselCard({ 
  id, 
  imageUrl, 
  slug 
}: CarouselCardProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden shadow-lg bg-white rounded-lg">
      <Image
        src={imageUrl}
        alt={`Press Article ${id}`}
        fill
        className="object-cover transition-all duration-500 hover:scale-110"
      />
    </div>
  );
}
