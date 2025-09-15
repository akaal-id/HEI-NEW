"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

interface EventGallery {
  id: string;
  eventName: string;
  year: string;
  description: string;
  mediaItems: MediaItem[];
}

interface MediaGalleryProps {
  eventGalleries: EventGallery[];
}

export default function MediaGallery({ eventGalleries }: MediaGalleryProps) {
  const [selectedByEvent, setSelectedByEvent] = useState<Record<string, MediaItem>>(
    () => Object.fromEntries(eventGalleries.map((e) => [e.id, e.mediaItems[0]]))
  );
  const [openModalFor, setOpenModalFor] = useState<string | null>(null);

  const handleSelectForEvent = (eventId: string, media: MediaItem) => {
    setSelectedByEvent((prev) => ({ ...prev, [eventId]: media }));
  };

  const handleDownloadForEvent = (eventId: string) => {
    const media = selectedByEvent[eventId];
    if (!media) return;
    const link = document.createElement('a');
    link.href = media.imageUrl;
    link.download = `media-${media.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-12">
      {eventGalleries.map((event, index) => {
        const isEven = index % 2 === 0;
        const isLeftImage = isEven;
        const selectedMedia = selectedByEvent[event.id] || event.mediaItems[0];
        return (
          <div key={event.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${!isLeftImage ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Main Image - Alternates between left and right */}
            <div className={`space-y-6 ${!isLeftImage ? 'lg:col-start-2' : ''}`}>
              {/* Main Image Display */}
              <motion.div
                className="relative aspect-video overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => setOpenModalFor(event.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedMedia.imageUrl}
                  alt={selectedMedia.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-3">
                      <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Text Content and Thumbnail Grid - Alternates between right and left */}
            <div className={`space-y-6 items-center justify-center py-4 ${!isLeftImage ? 'lg:col-start-1' : ''}`}>
              {/* Text Content */}
              <div className="space-y-4">
                <div className="items-center justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {event.eventName} {event.year}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Thumbnail Horizontal Scroll */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Select Image</h4>
                <div className="relative">
                  {/* Left scroll button */}
                  <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                    onClick={() => {
                      const container = document.getElementById(`scroll-container-${event.id}`);
                      if (container) {
                        container.scrollBy({ left: -200, behavior: 'smooth' });
                      }
                    }}
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Right scroll button */}
                  <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                    onClick={() => {
                      const container = document.getElementById(`scroll-container-${event.id}`);
                      if (container) {
                        container.scrollBy({ left: 200, behavior: 'smooth' });
                      }
                    }}
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Scrollable container with padding for buttons */}
                  <div 
                    id={`scroll-container-${event.id}`}
                    className="flex gap-4 overflow-x-auto scrollbar-hide px-12 py-2" 
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {event.mediaItems.map((media) => (
                      <motion.div
                        key={media.id}
                        className={`relative aspect-video overflow-hidden rounded-lg cursor-pointer border-2 transition-all duration-300 flex-shrink-0 w-48 ${
                          (selectedMedia.id === media.id)
                            ? 'border-[#d93732] shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          handleSelectForEvent(event.id, media);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Image
                          src={media.imageUrl}
                          alt={media.title}
                          fill
                          className="object-cover"
                        />
                        {/* Selection indicator */}
                        {selectedMedia.id === media.id && (
                          <div className="absolute inset-0 bg-[#d93732] bg-opacity-20 flex items-center justify-center">
                            <div className="bg-[#d93732] text-white rounded-full p-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal for Full Image View */}
      <AnimatePresence>
        {openModalFor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpenModalFor(null)}
          >
            {/* Blur Background */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(8px)" }}
              exit={{ backdropFilter: "blur(0px)" }}
              className="absolute inset-0 bg-black bg-opacity-50"
            />
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-[95vw] h-[95vh] max-w-[960px] max-h-[200px] md:max-w-[1280px] md:max-h-[720px] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close and Download Buttons */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {/* Download Button */}
                <button
                  onClick={() => openModalFor && handleDownloadForEvent(openModalFor)}
                  className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setOpenModalFor(null)}
                  className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Image - Large 16:9 aspect ratio */}
              <div className="relative w-full h-full aspect-video">
                <Image
                  src={(openModalFor && selectedByEvent[openModalFor]?.imageUrl) || ""}
                  alt={(openModalFor && selectedByEvent[openModalFor]?.title) || ""}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}