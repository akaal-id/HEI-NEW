"use client";
import { useState, useEffect, useMemo, Suspense, lazy, useCallback } from "react";
import PressMediaTabs from "@/components/PressMediaTabs";
import MediaCard from "@/components/MediaCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import VirtualizedGrid from "@/components/VirtualizedGrid";
import PerformanceMonitor from "@/components/PerformanceMonitor";

// Lazy load heavy components
const HeroSlider = lazy(() => import("@/components/HeroSlider"));

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  text: string;
  slug: string;
  category?: string;
}

interface MediaItem {
  id: string;
  imageUrl: string;
}

// Cache for press data
let pressDataCache: PressArticle[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getPressData(): Promise<PressArticle[]> {
  return new Promise(async (resolve) => {
    try {
      // Temporarily disable cache to get fresh data
      // if (pressDataCache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      //   console.log('Using cached press data');
      //   resolve(pressDataCache);
      //   return;
      // }

      // Get the base URL - use environment variable or construct from request
      let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      
      if (!baseUrl) {
        // Fallback: construct URL based on environment
        if (process.env.NODE_ENV === 'production') {
          // In production, we need to use the actual domain
          // This will be set by your deployment platform
          baseUrl = 'https://the2nd-hei.vercel.app';
        } else {
          baseUrl = 'http://localhost:3000';
        }
      }
      
      console.log('Fetching press data from:', `${baseUrl}/api/press`);
      const response = await fetch(`${baseUrl}/api/press`, {
        cache: 'no-store', // Temporarily disable cache to get fresh data
        next: { revalidate: 0 } // No revalidation
      });
      
      if (!response.ok) {
        console.error('API response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch press data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Successfully fetched press data:', data.length, 'articles');
      console.log('First article data:', data[0]);
      
      // Update cache
      pressDataCache = data;
      cacheTimestamp = Date.now();
      
      resolve(data);
    } catch (error) {
      console.error('Error fetching press data:', error);
      // Return cached data if available, otherwise empty array
      resolve(pressDataCache || []);
    }
  });
}

// Mock media data
const mockMediaData: MediaItem[] = Array.from({ length: 40 }, (_, index) => ({
  id: `media-${index + 1}`,
  imageUrl: `https://picsum.photos/400/400?random=${index + 1}`
}));

export default function PressPage() {
  const [pressData, setPressData] = useState<PressArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'press' | 'media'>('press');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getPressData();
      setPressData(data);
      setLoading(false);
      setIsInitialLoad(false);
    };
    fetchData();
  }, []);

  // Filter press data based on search term
  const filteredPressData = useMemo(() => {
    if (!searchTerm.trim()) {
      return pressData;
    }
    
    return pressData.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.category && article.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [pressData, searchTerm]);

  // Calculate pagination data
  const totalPages = Math.ceil(filteredPressData.length / itemsPerPage);

  // Preload next page data for better UX
  useEffect(() => {
    if (!loading && !isInitialLoad && currentPage < totalPages) {
      // Preload next page images
      const nextPageStart = currentPage * itemsPerPage;
      const nextPageEnd = Math.min(nextPageStart + itemsPerPage, filteredPressData.length);
      const nextPageArticles = filteredPressData.slice(nextPageStart, nextPageEnd);
      
      nextPageArticles.forEach(article => {
        const img = new Image();
        img.src = article.imageUrl;
      });
    }
  }, [currentPage, loading, isInitialLoad, filteredPressData, totalPages, itemsPerPage]);

  const handleTabChange = useCallback((tab: 'press' | 'media') => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when switching tabs
    setSearchTerm(''); // Clear search when switching tabs
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to press section when page changes
    const pressSection = document.getElementById('press-section');
    if (pressSection) {
      pressSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);
  
  return (
    <div className="min-h-screen">
      <PerformanceMonitor componentName="PressPage" />
      
      {/* Hero Slider Section */}
      <Suspense fallback={
        <div className="h-[60vh] bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d93732] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <HeroSlider pressData={pressData} />
      </Suspense>
      
      {/* Tab Section */}
      <section id="press-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <PressMediaTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {/* Press Section */}
          {activeTab === 'press' && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Latest Press Articles
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Stay updated with the latest news, insights, and developments in the halal industry and our events.
                </p>
              </div>

              {/* Search Bar */}
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                placeholder="Search articles by title, date, content, category..."
              />
            </>
          )}

          {/* Press Cards Grid - Optimized with VirtualizedGrid */}
          {activeTab === 'press' && (
            <>
              <VirtualizedGrid
                articles={filteredPressData}
                loading={loading}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
              />

              {/* No Results Message */}
              {!loading && searchTerm && filteredPressData.length === 0 && (
                <div className="text-center py-16">
                  <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No articles found</h3>
                    <p className="mt-2 text-gray-500">Try adjusting your search terms or browse all articles.</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-4 px-6 py-2 bg-[#d93732] text-white rounded-lg hover:bg-[#c32e29] transition-colors duration-200"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {/* Media Section */}
          {activeTab === 'media' && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Media Gallery
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Visual stories from our events and exhibitions.
                </p>
              </div>
              
              {/* Media Grid - 4x10 layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockMediaData.map((media) => (
                  <MediaCard
                    key={media.id}
                    id={media.id}
                    imageUrl={media.imageUrl}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
