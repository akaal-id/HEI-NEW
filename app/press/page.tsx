"use client";
import { useState, useEffect, useMemo, Suspense, lazy, useCallback } from "react";
import PressMediaTabs from "@/components/PressMediaTabs";
import MediaCard from "@/components/MediaCard";
import MediaGallery from "@/components/MediaGallery";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import VirtualizedGrid from "@/components/VirtualizedGrid";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import Head from "next/head";

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

// Mock event galleries data
const mockEventGalleries: EventGallery[] = [
  {
    id: 'hei-2025',
    eventName: 'Halal Export Indonesia',
    year: '2024',
    description: 'The 4th Halal Expo Indonesia - The latest edition of our premier halal export exhibition featuring cutting-edge products, innovative technologies, and networking opportunities in the global halal industry.',
    mediaItems: [
      'IMG_0866.JPG','IMG_0915.JPG','IMG_0923.JPG','IMG_0929.JPG','IMG_0937.JPG','IMG_0939.JPG','IMG_0947.JPG','IMG_0984.JPG','IMG_1001.JPG','IMG_6887.JPG','IMG_6891.JPG','IMG_6894.JPG','IMG_6899.JPG','IMG_6913.JPG','IMG_6916.JPG','IMG_6927.JPG','IMG_6934.JPG','IMG_6936.JPG','IMG_6941.JPG','IMG_6982.JPG','IMG_6984.JPG','IMG_6986.JPG','IMG_6995.JPG','IMG_6999.JPG','IMG_7015.JPG','IMG_7053.JPG','IMG_7054.JPG','IMG_7064.JPG','IMG_7065.JPG','IMG_7071.JPG','IMG_7072.JPG','IMG_7078.JPG','IMG_7080.JPG','IMG_7083.JPG','IMG_7092.JPG','IMG_7097.JPG','IMG_7099.JPG','IMG_7102.JPG','IMG_7104.JPG','IMG_7108.JPG','IMG_7145.JPG','IMG_7146.JPG','IMG_7161.JPG','IMG_7270.JPG','IMG_7309.JPG'
    ].map((name, idx) => ({
      id: `hei-2024-${idx+1}`,
      imageUrl: `/event/2024/${name}`,
      title: `HEI 2024 Gallery Image ${idx+1}`,
      description: 'Official photo from Halal Export Indonesia 2024.'
    }))
  },
  {
    id: 'hei-2023',
    eventName: 'The 3rd Halal Expo Indonesia',
    year: '2023',
    description: 'A milestone year that marked significant growth in international participation and showcased the expanding potential of the halal market with innovative solutions and global partnerships.',
    mediaItems: Array.from({ length: 10 }, (_, index) => ({
      id: `hei-2023-${index + 1}`,
      imageUrl: `https://picsum.photos/800/450?random=${index + 20}`,
      title: `The 3rd HEI 2023 Gallery Image ${index + 1}`,
      description: `Historic moments from The 3rd Halal Expo Indonesia 2023 that shaped the future of halal exports.`,
    }))
  },
  {
    id: 'hei-2019',
    eventName: 'The 2nd Halal Expo Indonesia',
    year: '2019',
    description: 'Building on the success of our inaugural event, The 2nd Halal Expo Indonesia brought together industry leaders, innovators, and stakeholders to drive the halal economy forward.',
    mediaItems: Array.from({ length: 15 }, (_, index) => ({
      id: `hei-2019-${index + 1}`,
      imageUrl: `https://picsum.photos/800/450?random=${index + 40}`,
      title: `The 2nd HEI 2019 Gallery Image ${index + 1}`,
      description: `Memorable moments from The 2nd Halal Expo Indonesia 2019 capturing the growth and innovation in the halal industry.`,
    }))
  },
  {
    id: 'hei-2018',
    eventName: 'Halal Expo Indonesia',
    year: '2018',
    description: 'The inaugural Halal Expo Indonesia that started it all - establishing Indonesia as a key player in the global halal market and creating a platform for halal industry excellence.',
    mediaItems: Array.from({ length: 8 }, (_, index) => ({
      id: `hei-2018-${index + 1}`,
      imageUrl: `https://picsum.photos/800/450?random=${index + 60}`,
      title: `HEI 2018 Gallery Image ${index + 1}`,
      description: `Historic moments from the inaugural Halal Expo Indonesia 2018 that launched our journey in the halal industry.`,
    }))
  }
];

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

  // Filter and sort press data based on search term
  const filteredPressData = useMemo(() => {
    let filtered = pressData;
    
    if (searchTerm.trim()) {
      filtered = pressData.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.category && article.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort by timestamp (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      
      // If dates are invalid, put them at the end
      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      
      // Sort in descending order (newest first)
      return dateB.getTime() - dateA.getTime();
    });
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
    <>
      <Head>
        <title>Press & Media - Halal Expo Indonesia</title>
        <meta name="description" content="Stay updated with the latest news, press releases, and media coverage about Halal Expo Indonesia. Access press materials and media resources." />
        <meta name="keywords" content="halal expo press, halal expo news, halal expo media, halal exhibition press release, halal industry news, halal trade media" />
        <meta property="og:title" content="Press & Media - Halal Expo Indonesia" />
        <meta property="og:description" content="Stay updated with the latest news, press releases, and media coverage about Halal Expo Indonesia. Access press materials and media resources." />
        <meta property="og:url" content="/press" />
        <meta property="og:image" content="/images/mainkv.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Press & Media - Halal Expo Indonesia" />
        <meta name="twitter:description" content="Stay updated with the latest news, press releases, and media coverage about Halal Expo Indonesia." />
        <meta name="twitter:image" content="/images/mainkv.png" />
        <link rel="canonical" href="/press" />
      </Head>
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
              
              {/* New Media Gallery Layout */}
              <MediaGallery eventGalleries={mockEventGalleries} />
            </>
          )}
        </div>
      </section>
    </div>
    </>
  );
}
