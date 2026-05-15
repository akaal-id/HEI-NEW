import { MetadataRoute } from 'next';
import { getAllArticles } from './lib/articles';

// Cache sitemap and refresh periodically to keep it stable for crawlers.
export const revalidate = 3600; // Revalidate every hour

const baseUrl = 'https://halalexpoindonesia.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/d8-organization`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/d8-expo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/organizer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/programs/exhibition`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/programs/business-matching`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/programs/investment`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/programs/youth-event`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/programs/hei-talk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/programs/culture-festival`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/register/exhibitor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register/buyer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/register/visitor`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic article pages
  let articlePages: MetadataRoute.Sitemap = [];
  
  try {
    const articles = await getAllArticles();
    
    articlePages = articles
      .filter(article => article.slug && article.slug !== 'undefined')
      .map((article) => {
        // Parse date from article
        let lastModified = new Date();
        if (article.updatedAt) {
          const parsedDate = new Date(article.updatedAt);
          if (!isNaN(parsedDate.getTime())) {
            lastModified = parsedDate;
          }
        } else if (article.createdAt) {
          const parsedDate = new Date(article.createdAt);
          if (!isNaN(parsedDate.getTime())) {
            lastModified = parsedDate;
          }
        } else if (article.date) {
          const parsedDate = new Date(article.date);
          if (!isNaN(parsedDate.getTime())) {
            lastModified = parsedDate;
          }
        }

        return {
          url: `${baseUrl}/articles/${encodeURIComponent(article.slug)}`,
          lastModified,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        };
      });
  } catch (error) {
    console.error('Error generating article sitemap entries:', error);
    // Continue with static pages even if articles fail to load
  }

  return [...staticPages, ...articlePages];
}
