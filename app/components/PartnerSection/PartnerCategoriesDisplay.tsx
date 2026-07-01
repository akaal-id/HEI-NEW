'use client';

import Image from 'next/image';
import {
  categoryById,
  getPartnerCardTier,
  type DisplaySection,
  type LayoutType,
  type Partner,
  type PartnerCategory,
} from '@/app/data/partners';
import MediaPartnerCarousel from './MediaPartnerCarousel';
import styles from './PartnerSection.module.css';

type AnimationProps = {
  className: string;
  'data-animate': 'true';
  'data-delay': string;
};

type PartnerCategoriesDisplayProps = {
  sections: DisplaySection[];
  animate?: boolean;
  variant?: 'default' | 'sneakPeek';
};

export default function PartnerCategoriesDisplay({
  sections,
  animate = true,
  variant = 'default',
}: PartnerCategoriesDisplayProps) {
  const getPartnerCardClass = (categoryId: string) => {
    const tier = getPartnerCardTier(categoryId);

    if (tier === 'host') {
      return `${styles.partnerCard} ${styles.hostPartnerCard}`;
    }

    if (tier === 'standard') {
      return `${styles.partnerCard} ${styles.standardPartnerCard}`;
    }

    return styles.mediaPartnerCard;
  };

  const getPartnerLogoClass = (categoryId: string) => {
    const tier = getPartnerCardTier(categoryId);

    if (tier === 'host') {
      return styles.hostPartnerLogo;
    }

    if (tier === 'standard') {
      return styles.standardPartnerLogo;
    }

    return styles.mediaPartnerLogo;
  };

  const renderPartnerCard = (partner: Partner, categoryId: string) => (
    <div key={partner.id} className={getPartnerCardClass(categoryId)}>
      {partner.website ? (
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.partnerLink}
          aria-label={`Visit ${partner.name} website`}
        >
          <div className={getPartnerLogoClass(categoryId)}>
            <Image
              src={partner.logo}
              alt={partner.alt}
              width={getPartnerCardTier(categoryId) === 'host' ? 200 : 160}
              height={getPartnerCardTier(categoryId) === 'host' ? 120 : 80}
              className={styles.logoImage}
            />
          </div>
        </a>
      ) : (
        <div className={getPartnerLogoClass(categoryId)}>
          <Image
            src={partner.logo}
            alt={partner.alt}
            width={getPartnerCardTier(categoryId) === 'host' ? 200 : 160}
            height={getPartnerCardTier(categoryId) === 'host' ? 120 : 80}
            className={styles.logoImage}
          />
        </div>
      )}
    </div>
  );

  const getGridClassName = (categoryId: string, layout: LayoutType = 'default') => {
    if (categoryId === 'media-partner' || layout === 'media-grid-5') {
      return styles.mediaPartnerGrid;
    }

    if (layout === 'grid-4') {
      return styles.strategicPartnerGrid;
    }

    if (layout === 'event-grid') {
      return styles.eventPartnerGrid;
    }

    if (layout === 'single-logo') {
      return `${styles.partnerGrid} ${styles.singleLogoGrid}`;
    }

    return styles.partnerGrid;
  };

  const renderCategoryBlock = (
    category: PartnerCategory,
    layout: LayoutType = 'default',
    animationProps?: AnimationProps
  ) => (
    <div
      className={`${styles.category} ${animationProps?.className ?? ''}`.trim()}
      data-animate={animate ? animationProps?.['data-animate'] : undefined}
      data-delay={animate ? animationProps?.['data-delay'] : undefined}
    >
      <div className={styles.categoryLabel}>{category.label}</div>
      {category.id === 'media-partner' ? (
        <MediaPartnerCarousel partners={category.partners} />
      ) : (
        <div className={getGridClassName(category.id, layout)}>
          {category.partners.map((partner) => renderPartnerCard(partner, category.id))}
        </div>
      )}
    </div>
  );

  const renderSection = (section: DisplaySection, index: number) => {
    const animationProps: AnimationProps = {
      className: styles.animateItem,
      'data-animate': 'true',
      'data-delay': String(index * 100),
    };

    if (section.type === 'quad') {
      const categories = section.categoryIds
        .map((categoryId) => categoryById.get(categoryId))
        .filter((category): category is PartnerCategory => Boolean(category));

      if (categories.length === 0) return null;

      return (
        <div
          key={`quad-${section.categoryIds.join('-')}`}
          className={`${styles.supportPartnerSection} ${animate ? animationProps.className : ''}`.trim()}
          data-animate={animate ? animationProps['data-animate'] : undefined}
          data-delay={animate ? animationProps['data-delay'] : undefined}
        >
          <div className={styles.supportPartnerGrid}>
            {categories.map((category) => (
              <div key={category.id} className={styles.supportPartnerCell}>
                <div className={styles.supportPartnerLabel}>{category.label}</div>
                <div className={styles.supportPartnerCardWrap}>
                  {category.partners.map((partner) => renderPartnerCard(partner, category.id))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (section.type === 'pair') {
      const [leftId, rightId] = section.categoryIds;
      const leftCategory = categoryById.get(leftId);
      const rightCategory = categoryById.get(rightId);

      if (!leftCategory && !rightCategory) return null;

      if (section.layout === 'balanced') {
        const categories = [leftCategory, rightCategory].filter(
          (category): category is PartnerCategory => Boolean(category)
        );

        return (
          <div
            key={`pair-balanced-${leftId}-${rightId}`}
            className={`${styles.balancedPairSection} ${animate ? animationProps.className : ''}`.trim()}
            data-animate={animate ? animationProps['data-animate'] : undefined}
            data-delay={animate ? animationProps['data-delay'] : undefined}
          >
            <div className={styles.balancedPairGrid}>
              {categories.map((category) => (
                <div key={category.id} className={styles.balancedPairCell}>
                  <div className={styles.balancedPairLabel}>{category.label}</div>
                  <div className={styles.balancedPairCardWrap}>
                    {category.partners.map((partner) => renderPartnerCard(partner, category.id))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      return (
        <div
          key={`pair-${leftId}-${rightId}`}
          className={`${styles.partnerPairRow} ${animate ? animationProps.className : ''}`.trim()}
          data-animate={animate ? animationProps['data-animate'] : undefined}
          data-delay={animate ? animationProps['data-delay'] : undefined}
        >
          {leftCategory && renderCategoryBlock(leftCategory, 'single-logo')}
          {rightCategory && renderCategoryBlock(rightCategory, 'single-logo')}
        </div>
      );
    }

    if (section.type === 'triple') {
      const categories = section.categoryIds
        .map((categoryId) => categoryById.get(categoryId))
        .filter((category): category is PartnerCategory => Boolean(category));

      if (categories.length === 0) return null;

      return (
        <div
          key={`triple-${section.categoryIds.join('-')}`}
          className={`${styles.partnerTripleRow} ${animate ? animationProps.className : ''}`.trim()}
          data-animate={animate ? animationProps['data-animate'] : undefined}
          data-delay={animate ? animationProps['data-delay'] : undefined}
        >
          {categories.map((category) => renderCategoryBlock(category, 'single-logo'))}
        </div>
      );
    }

    const category = categoryById.get(section.categoryId);
    if (!category) return null;

    return (
      <div key={category.id}>
        {renderCategoryBlock(category, section.layout ?? 'default', animationProps)}
      </div>
    );
  };

  return (
    <div
      className={`${styles.partnerCategories} ${variant === 'sneakPeek' ? styles.partnerCategoriesSneakPeek : ''}`.trim()}
    >
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
}
