'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Button from '../Button/Button';
import { User, Calendar, Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ArticlesMediaPage.module.css';
import { getAllArticles } from '../../lib/articles';

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

interface MediaItem {
  id: string;
  image: string;
  title: string;
  category?: string;
}

// Mock media data - replace with actual data source
const mediaItems: MediaItem[] = [
  { id: '1', image: '/images/overview.jpg', title: 'Event Photo 1', category: 'Event' },
  { id: '2', image: '/images/fairmont-1.jpg', title: 'Event Photo 2', category: 'Event' },
  { id: '3', image: '/images/tennis-indoor.png', title: 'Event Photo 3', category: 'Venue' },
  { id: '4', image: '/images/exhibition-1.png', title: 'Event Photo 4', category: 'Exhibition' },
  { id: '5', image: '/images/overview.jpg', title: 'Event Photo 5', category: 'Event' },
  { id: '6', image: '/images/fairmont-1.jpg', title: 'Event Photo 6', category: 'Venue' },
  { id: '7', image: '/images/tennis-indoor.png', title: 'Event Photo 7', category: 'Exhibition' },
  { id: '8', image: '/images/exhibition-1.png', title: 'Event Photo 8', category: 'Event' },
];

type TabType = 'article' | 'media';
type SortOption = 'newest' | 'oldest';

export default function ArticlesMediaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('article');
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  // Fetch articles on mount
  useEffect(() => {
    getAllArticles().then(setArticles);
  }, []);

  // Get unique categories from articles
  const categories = useMemo(() => {
    const cats = articles.map(a => a.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [articles]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort by date
    filtered.sort((a, b) => {
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

    return filtered;
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const handleMediaNext = useCallback(() => {
    setSelectedMediaIndex((prev) => (prev + 1) % mediaItems.length);
  }, []);

  const handleMediaPrev = useCallback(() => {
    setSelectedMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  }, []);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (activeTab === 'media') {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          handleMediaPrev();
        } else if (e.key === 'ArrowRight') {
          handleMediaNext();
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [activeTab, handleMediaPrev, handleMediaNext]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <div className={styles.filterGroup}>
                <Filter className={styles.filterIcon} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={styles.sortSelect}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className={styles.articlesGrid}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <article key={`${article.id}-${article.slug}-${index}`} className={styles.articleCard}>
                    <div className={styles.articleCardImageContainer}>
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className={styles.articleCardImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <span className={styles.categoryBadge}>{article.category}</span>
                    </div>
                    
                    <div className={styles.cardContent}>
                      <div className={styles.metadata}>
                        <div className={styles.metaItem}>
                          <User className={styles.metaIcon} />
                          <span>{article.author}</span>
                        </div>
                        <div className={styles.metaItem}>
                          <Calendar className={styles.metaIcon} />
                          <span>{article.date}</span>
                        </div>
                      </div>
                      
                      <h3 className={styles.articleTitle}>{article.title}</h3>
                      <p className={styles.articleDescription}>{article.description}</p>
                      <div className={styles.divider}></div>
                      <Button 
                        href={`/articles/${article.slug && article.slug !== 'undefined' ? article.slug : article.id || 'not-found'}`}
                        variant="secondary"
                        className={styles.readMoreButton}
                      >
                        Read More
                      </Button>
                    </div>
                  </article>
                ))
              ) : (
                <div className={styles.noResults}>
                  <p>No articles found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Media Tab Content */}
        {activeTab === 'media' && (
          <div className={styles.mediaTab}>
            {/* Gallery Carousel */}
            <div className={styles.galleryCarousel}>
              <button
                className={styles.carouselButton}
                onClick={handleMediaPrev}
                aria-label="Previous image"
              >
                <ChevronLeft className={styles.carouselButtonIcon} />
              </button>
              <div className={styles.carouselImageContainer}>
                <Image
                  src={mediaItems[selectedMediaIndex].image}
                  alt={mediaItems[selectedMediaIndex].title}
                  fill
                  className={styles.carouselImage}
                  sizes="100vw"
                />
                <div className={styles.carouselInfo}>
                  <h3>{mediaItems[selectedMediaIndex].title}</h3>
                  {mediaItems[selectedMediaIndex].category && (
                    <span className={styles.carouselCategory}>
                      {mediaItems[selectedMediaIndex].category}
                    </span>
                  )}
                </div>
              </div>
              <button
                className={styles.carouselButton}
                onClick={handleMediaNext}
                aria-label="Next image"
              >
                <ChevronRight className={styles.carouselButtonIcon} />
              </button>
            </div>

            {/* Gallery Catalogue */}
            <div className={styles.galleryCatalogue}>
              <h3 className={styles.catalogueTitle}>Gallery Catalogue</h3>
              <div className={styles.catalogueGrid}>
                {mediaItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${styles.catalogueItem} ${index === selectedMediaIndex ? styles.catalogueItemActive : ''}`}
                    onClick={() => setSelectedMediaIndex(index)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.catalogueImage}
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className={styles.catalogueOverlay}>
                      <span className={styles.catalogueTitleText}>{item.title}</span>
                    </div>
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
