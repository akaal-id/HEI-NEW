"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  slug: string;
}

export default function SectionPress() {
  const [pressData, setPressData] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPressData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/press`, {
          cache: 'no-store'
        });
        
        if (response.ok) {
          const data = await response.json();
          setPressData(data.slice(0, 3)); // Take only first 3 articles
        }
      } catch (error) {
        console.error('Error fetching press data:', error);
        // Fallback data if API fails
        setPressData([
          {
            id: "1",
            title: "Halal Export Indonesia 2025: Connecting Global Halal Markets",
            imageUrl: "/images/image-export-1.jpg",
            timestamp: "2 days ago",
            author: "HEI Team",
            slug: "halal-export-indonesia-2025"
          },
          {
            id: "2", 
            title: "New Partnership Announcements at HEI 2025 Exhibition",
            imageUrl: "/images/image-export-2.jpg",
            timestamp: "1 week ago",
            author: "HEI Team",
            slug: "partnership-announcements-hei-2025"
          },
          {
            id: "3",
            title: "Industry Leaders Gather for Halal Business Summit",
            imageUrl: "/images/image-export-3.jpg", 
            timestamp: "2 weeks ago",
            author: "HEI Team",
            slug: "halal-business-summit-2025"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPressData();
  }, []);

  return (
    <motion.section
      initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
      whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeIn" }}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Latest <span className="text-[#d93732]">Press & News</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest news, insights, and developments in the halal industry and our events.
          </p>
        </div>

        {/* Press Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm h-80 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pressData.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-80 flex flex-col group"
              >
                <Link href={`/press/${article.slug}`}>
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-3 group-hover:text-[#d93732] transition-colors">
                      {article.title}
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
                        <span>{article.author}</span>
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
                        <span>{article.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="text-center">
          <Link
            href="/press"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Read More Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
