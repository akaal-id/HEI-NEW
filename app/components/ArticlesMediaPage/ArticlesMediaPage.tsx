'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ArticleCard from '../ArticleCard/ArticleCard';
import ArticleHeroSlider from '../ArticleHeroSlider/ArticleHeroSlider';
import MediaCarousel from '../MediaCarousel/MediaCarousel';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ArticlesMediaPage.module.css';

interface Article {
  id: string;
  slug?: string;
  category: string;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

interface YearGallery {
  year: string;
  highlightImage: string;
  photos: string[];
  displayName?: string; // Custom display name for specific years
}

// Year-based photo galleries - using existing images from the project
const yearGalleries: YearGallery[] = [
  {
    year: '2025',
    highlightImage: '/images/overview.jpg',
    displayName: 'The 2nd Halal Export Indonesia',
    photos: [
      '/images/overview.jpg',
      '/images/fairmont-1.jpg',
      '/images/exhibition-1.png',
      '/images/tennis-indoor.png',
      '/images/fairmont.jpg',
      '/images/fairmont 2.jpg',
    ],
  },
  {
    year: '2024',
    highlightImage: '/images/fairmont-1.jpg',
    displayName: 'Halal Export Indonesia',
    photos: [
      '/images/fairmont-1.jpg',
      '/images/overview.jpg',
      '/images/exhibition-1.png',
      '/images/tennis-indoor.png',
      '/images/fairmont.jpg',
      '/images/fairmont 3.png',
    ],
  },
  {
    year: '2023',
    highlightImage: '/images/exhibition-1.png',
    photos: [
      '/images/exhibition-1.png',
      '/images/overview.jpg',
      '/images/fairmont-1.jpg',
      '/images/tennis-indoor.png',
      '/images/fairmont.jpg',
      '/images/fairmont 2.jpg',
    ],
  },
  {
    year: '2020',
    highlightImage: '/images/tennis-indoor.png',
    photos: [
      '/images/tennis-indoor.png',
      '/images/overview.jpg',
      '/images/fairmont-1.jpg',
      '/images/exhibition-1.png',
      '/images/fairmont.jpg',
      '/images/fairmont 3.png',
    ],
  },
  {
    year: '2019',
    highlightImage: '/images/fairmont.jpg',
    photos: [
      '/images/fairmont.jpg',
      '/images/overview.jpg',
      '/images/fairmont-1.jpg',
      '/images/exhibition-1.png',
      '/images/tennis-indoor.png',
      '/images/fairmont 2.jpg',
    ],
  },
  {
    year: '2018',
    highlightImage: '/images/fairmont 2.jpg',
    photos: [
      '/images/fairmont 2.jpg',
      '/images/overview.jpg',
      '/images/fairmont-1.jpg',
      '/images/exhibition-1.png',
      '/images/tennis-indoor.png',
      '/images/fairmont 3.png',
    ],
  },
];

// Media carousel items (all highlight images from all years)
const mediaCarouselItems = yearGalleries.map((gallery) => ({
  id: `carousel-${gallery.year}`,
  image: gallery.highlightImage,
  title: `${gallery.displayName || `Halal Expo Indonesia ${gallery.year}`} Highlights`,
  year: gallery.year,
}));

type TabType = 'article' | 'media';
type SortOption = 'newest' | 'oldest';

export default function ArticlesMediaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('article');
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [sectionRef, isSectionVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [gridRef, isGridVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const ARTICLES_PER_PAGE = 8;

  // Fetch articles on mount
  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
      })
      .catch(console.error);
  }, []);

  // Get unique categories from articles
  const categories = useMemo(() => {
    const cats = articles.map(a => a.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    const filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      // Try to parse dates, fallback to string comparison if parsing fails
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      
      // If dates are invalid, use string comparison
      if (isNaN(dateA) || isNaN(dateB)) {
        return sortBy === 'newest' 
          ? b.date.localeCompare(a.date) 
          : a.date.localeCompare(b.date);
      }
      
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [articles, searchQuery, selectedCategory, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleYearClick = useCallback((year: string) => {
    setSelectedYear(year);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setSelectedYear(null);
  }, []);

  // Manage body overflow and Escape key listener
  useEffect(() => {
    if (selectedYear) {
      // Prevent background scrolling
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Close gallery on Escape key
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedYear(null);
        }
      };
      window.addEventListener('keydown', handleKeyPress);

      // Cleanup
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedYear]);

  const selectedGallery = selectedYear ? yearGalleries.find(g => g.year === selectedYear) : null;

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={`${styles.section} ${isSectionVisible ? styles.fadeIn : ''}`}>
      <div className={styles.container}>
        {/* Hero Slider - Only show in article tab */}
        {activeTab === 'article' && articles.length > 0 && (
          <ArticleHeroSlider articles={articles} />
        )}

        {/* Media Carousel - Only show in media tab, above tabs */}
        {activeTab === 'media' && (
          <MediaCarousel mediaItems={mediaCarouselItems} />
        )}

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'article' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('article')}
          >
            Article
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'media' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Media
          </button>
        </div>

        {/* Article Tab Content */}
        {activeTab === 'article' && (
          <div className={styles.articleTab}>
            {/* Filters */}
            <div className={styles.filters}>
              <div className={styles.searchBox}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by article name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <Filter className={styles.filterIcon} />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className={styles.categorySelect}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <ArrowUpDown className={styles.filterIcon} />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setCurrentPage(1);
                  }}
                  className={styles.sortSelect}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Articles Grid */}
            <div ref={gridRef as React.RefObject<HTMLDivElement>} className={`${styles.articlesGrid} ${isGridVisible ? styles.fadeIn : ''}`}>
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article, index) => (
                  <ArticleCard
                    key={`${article.id}-${article.slug}-${index}`}
                    article={{
                      ...article,
                      slug: article.slug ?? article.id,
                    }}
                    index={index}
                    variant="listing"
                  />
                ))
              ) : (
                <div className={styles.noResults}>
                  <p>No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredArticles.length > ARTICLES_PER_PAGE && (
              <div className={styles.pagination}>
                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className={styles.paginationIcon} />
                  <span>Previous</span>
                </button>
                
                <div className={styles.paginationNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`${styles.paginationNumber} ${currentPage === page ? styles.paginationNumberActive : ''}`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span key={page} className={styles.paginationEllipsis}>
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>
                
                <button
                  className={styles.paginationButton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight className={styles.paginationIcon} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Media Tab Content */}
        {activeTab === 'media' && (
          <div className={styles.mediaTab}>
            {/* Year-based Photo Groups */}
            <div className={styles.yearGroupsContainer}>
              <h2 className={styles.yearGroupsTitle}>Previous Halal Expo Indonesia Galleries</h2>
              <div className={styles.yearGroupsGrid}>
                {yearGalleries.map((gallery) => (
                  <div
                    key={gallery.year}
                    className={styles.yearGroupCard}
                    onClick={() => handleYearClick(gallery.year)}
                  >
                    <div className={styles.yearGroupImageContainer}>
                      <Image
                        src={gallery.highlightImage}
                        alt={`${gallery.displayName || `Halal Expo Indonesia ${gallery.year}`} Gallery`}
                        fill
                        className={styles.yearGroupImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className={styles.yearGroupOverlay}>
                        <div className={styles.yearGroupContent}>
                          <span className={styles.yearBadge}>{gallery.displayName || `Halal Expo Indonesia ${gallery.year}`}</span>
                          <p className={styles.yearGroupCount}>{gallery.photos.length} Photos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Year Gallery Modal */}
        {selectedYear && selectedGallery && (
          <div className={styles.galleryModal} onClick={handleCloseGallery}>
            <div className={styles.galleryModalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.galleryModalHeader}>
                <h2 className={styles.galleryModalTitle}>
                  {selectedGallery?.displayName || `Halal Expo Indonesia ${selectedYear}`} Gallery
                </h2>
                <button
                  className={styles.galleryModalClose}
                  onClick={handleCloseGallery}
                  aria-label="Close gallery"
                >
                  <X className={styles.closeIcon} />
                </button>
              </div>
              <div className={styles.galleryModalGrid}>
                {selectedGallery.photos.map((photo, index) => (
                  <div key={index} className={styles.galleryModalItem}>
                    <Image
                      src={photo}
                      alt={`${selectedGallery?.displayName || `Halal Expo Indonesia ${selectedYear}`} Photo ${index + 1}`}
                      fill
                      className={styles.galleryModalImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
