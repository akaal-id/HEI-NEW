'use client';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { 
  Wheat, ShoppingBag, Factory, Cpu, BadgeDollarSign, 
  Globe, Award, GraduationCap, Palmtree, HeartHandshake 
} from 'lucide-react';
import styles from './ProgramPage.module.css';

const categories = [
  {
    title: 'Halal Food, Beverage & Agribusiness',
    icon: Wheat,
    items: [
      'From Upstream to Processing & Technology',
      'Agritech & smart farming solutions',
      'Raw materials & halal ingredients',
      'Food & beverage manufacturers (B2B & bulk)',
      'Processing, packaging & cold chain technology',
      'Quality control & food safety system'
    ]
  },
  {
    title: 'Halal Lifestyle, Consumer Goods & Creative Economy',
    icon: ShoppingBag,
    items: [
      'Halal Products for Global Muslim Markets',
      'Modest fashion & textiles',
      'Cosmetics, personal care & fragrances',
      'Pharmaceuticals, nutraceuticals & biotech',
      'Home, lifestyle & wellness products',
      'Creative industry, crafts & IP-based products'
    ]
  },
  {
    title: 'Halal Manufacturing, Industrial Services & Supply Chain',
    icon: Factory,
    items: [
      'Enabling Halal Production at Scale',
      'Manufacturing machinery & production systems',
      'Packaging & labeling solutions',
      'Logistics, warehousing & halal cold chain',
      'Halal industrial estates & special economic zones',
      'Laboratory, inspection & quality assurance services'
    ]
  },
  {
    title: 'Halal Technology, Digital Solutions & Innovation',
    icon: Cpu,
    items: [
      'Digital Infrastructure of the Halal Economy',
      'Halal traceability & blockchain systems',
      'Digital halal certification platforms',
      'AI, IoT & smart manufacturing solutions',
      'E-commerce, B2B platforms & marketplaces',
      'Travel tech & halal lifestyle applications'
    ]
  },
  {
    title: 'Islamic Finance, Investment & Halal Fintech',
    icon: BadgeDollarSign,
    items: [
      'Capital, Trade Finance & Sharia-Compliant Solutions',
      'Islamic banking & takaful',
      'Trade & export financing',
      'Sharia-compliant investment funds',
      'Halal fintech & digital payment solutions',
      'ESG & impact investment platforms'
    ]
  },
  {
    title: 'Trade, Export & International Pavilions',
    icon: Globe,
    items: [
      'Gateway to Global Halal Markets',
      'Exporters & trading companies',
      'Importers, distributors & wholesalers',
      'Chambers of commerce & trade promotion agencies',
      'Country & regional pavilions (D8 & global)',
      'Market access & cross-border trade services'
    ]
  },
  {
    title: 'Halal Certification, Standards & Regulatory Bodies',
    icon: Award,
    items: [
      'Trust, Compliance & Global Standards',
      'Halal certification bodies',
      'Accreditation & standardization agencies',
      'Testing, auditing & inspection services',
      'Government & intergovernmental institutions'
    ]
  },
  {
    title: 'Islamic Education, Research & Innovation Institutions',
    icon: GraduationCap,
    items: [
      'Knowledge, Talent & Future Halal Economy',
      'Universities & research centers',
      'Halal R&D institutions',
      'Training & professional certification providers',
      'Incubation, accelerators & innovation hubs'
    ]
  },
  {
    title: 'Halal Tourism, Hospitality & Muslim-Friendly Services',
    icon: Palmtree,
    items: [
      'Experience-Based Halal Economy',
      'Halal tourism destinations',
      'Hotels, resorts & airlines',
      'Travel operators & DMC',
      'Medical, wellness & lifestyle tourism',
      'MICE & halal event services'
    ]
  },
  {
    title: 'Social & Sustainable Halal Economy',
    icon: HeartHandshake,
    items: [
      'Ethical, Inclusive & Impact-Driven Halal Initiatives',
      'Waqf & zakat institutions',
      'Islamic social finance platforms',
      'Halal-based social enterprises',
      'Sustainable & green halal initiatives'
    ]
  }
];

export default function ProgramExhibition() {
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [introRef, isIntroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [categoriesRef, isCategoriesVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <section 
        ref={heroRef as React.RefObject<HTMLElement>} 
        className={`${styles.heroSection} ${isHeroVisible ? styles.fadeIn : ''}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Exhibition</h1>
        </div>
      </section>

      {/* Intro Section */}
      <section ref={introRef as React.RefObject<HTMLElement>} className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.introContent} ${isIntroVisible ? styles.fadeInUp : ''}`}>
            <p className={styles.introText}>
              D-8 Halal Expo Indonesia 2026 is a B2B exhibition that brings together halal industry players from D-8 member nations and the wider international community to foster business partnerships, expand market access, and drive cross-border halal trade and investment.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef as React.RefObject<HTMLElement>} className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.categoriesHeader}>
            <h2 className={styles.sectionTitle}>Exhibitor Categories</h2>
          </div>
          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div 
                  key={index} 
                  className={`${styles.categoryCard} ${isCategoriesVisible ? styles.fadeInUp : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.categoryIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <ul className={styles.categoryList}>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className={styles.categoryItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
