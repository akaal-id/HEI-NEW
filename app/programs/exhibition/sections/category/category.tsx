'use client';

import { useIntersectionObserver } from '../../../../hooks/useIntersectionObserver';
import styles from './category.module.css';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = [
  {
    title: 'Halal Food, Beverage & Agribusiness',
    subtitle: 'From Upstream to Processing & Technology',
    items: [
      'Agritech & smart farming solutions',
      'Raw materials & halal ingredients',
      'Food & beverage manufacturers (B2B & bulk)',
      'Processing, packaging & cold chain technology',
      'Quality control & food safety system',
    ],
  },
  {
    title: 'Halal Lifestyle, Consumer Goods & Creative Economy',
    subtitle: 'Halal Products for Global Muslim Markets',
    items: [
      'Modest fashion & textiles',
      'Cosmetics, personal care & fragrances',
      'Pharmaceuticals, nutraceuticals & biotech',
      'Home, lifestyle & wellness products',
      'Creative industry, crafts & IP-based products',
    ],
  },
  {
    title: 'Halal Manufacturing, Industrial Services & Supply Chain',
    subtitle: 'Enabling Halal Production at Scale',
    items: [
      'Manufacturing machinery & production systems',
      'Packaging & labeling solutions',
      'Logistics, warehousing & halal cold chain',
      'Halal industrial estates & special economic zones',
      'Laboratory, inspection & quality assurance services',
    ],
  },
  {
    title: 'Halal Technology, Digital Solutions & Innovation',
    subtitle: 'Digital Infrastructure of the Halal Economy',
    items: [
      'Halal traceability & blockchain systems',
      'Digital halal certification platforms',
      'AI, IoT & smart manufacturing solutions',
      'E-commerce, B2B platforms & marketplaces',
      'Travel tech & halal lifestyle applications',
    ],
  },
  {
    title: 'Islamic Finance, Investment & Halal Fintech',
    subtitle: 'Capital, Trade Finance & Sharia-Compliant Solutions',
    items: [
      'Islamic banking & takaful',
      'Trade & export financing',
      'Sharia-compliant investment funds',
      'Halal fintech & digital payment solutions',
      'ESG & impact investment platforms',
    ],
  },
  {
    title: 'Trade, Export & International Pavilions',
    subtitle: 'Gateway to Global Halal Markets',
    items: [
      'Exporters & trading companies',
      'Importers, distributors & wholesalers',
      'Chambers of commerce & trade promotion agencies',
      'Country & regional pavilions (D8 & global)',
      'Market access & cross-border trade services',
    ],
  },
  {
    title: 'Halal Certification, Standards & Regulatory Bodies',
    subtitle: 'Trust, Compliance & Global Standards',
    items: [
      'Halal certification bodies',
      'Accreditation & standardization agencies',
      'Testing, auditing & inspection services',
      'Government & intergovernmental institutions',
    ],
  },
  {
    title: 'Islamic Education, Research & Innovation Institutions',
    subtitle: 'Knowledge, Talent & Future Halal Economy',
    items: [
      'Universities & research centers',
      'Halal R&D institutions',
      'Training & professional certification providers',
      'Incubators, accelerators & innovation hubs',
    ],
  },
  {
    title: 'Halal Tourism, Hospitality & Muslim-Friendly Services',
    subtitle: 'Experience-Based Halal Economy',
    items: [
      'Halal tourism destinations',
      'Hotels, resorts & airlines',
      'Travel operators & DMC',
      'Medical, wellness & lifestyle tourism',
      'MICE & halal event services',
    ],
  },
  {
    title: 'Social & Sustainable Halal Economy',
    subtitle: 'Ethical, Inclusive & Impact-Driven Halal Initiatives',
    items: [
      'Waqf & zakat institutions',
      'Islamic social finance platforms',
      'Halal-based social enterprises',
      'Sustainable & green halal initiatives',
    ],
  },
];

export default function CategorySection() {
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [listRef, listVisible] = useIntersectionObserver({ threshold: 0.05 });
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div 
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`${styles.header} ${headerVisible ? styles.visible : ''}`}
        >
          <span className={styles.eyebrow}>Exhibition Scope</span>
          <h2 className={styles.title}>
            The Ecosystem<br />
            <span className={styles.titleAccent}>Mapped Across 10 Pillars</span>
          </h2>
        </div>

        <div 
          ref={listRef as React.RefObject<HTMLDivElement>}
          className={`${styles.accordionWrapper} ${listVisible ? styles.visible : ''}`}
        >
          {CATEGORIES.map((cat, idx) => {
            const isExpanded = expandedIndex === idx;
            
            return (
              <div 
                key={idx} 
                className={`${styles.accordionItem} ${isExpanded ? styles.expanded : ''}`}
                onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <div className={styles.accordionHeader}>
                  <div className={styles.headerLeft}>
                    <span className={styles.number}>{String(idx + 1).padStart(2, '0')}</span>
                    <div className={styles.titleGroup}>
                      <h3 className={styles.accordionTitle}>{cat.title}</h3>
                      <span className={styles.accordionSubtitle}>{cat.subtitle}</span>
                    </div>
                  </div>
                  <div className={styles.iconWrapper}>
                    {isExpanded ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </div>
                
                <div className={styles.accordionContent}>
                  <div className={styles.contentInner}>
                    <ul className={styles.itemList}>
                      {cat.items.map((item, i) => (
                        <li key={i} className={styles.item}>
                          <ArrowRight className={styles.itemIcon} size={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
