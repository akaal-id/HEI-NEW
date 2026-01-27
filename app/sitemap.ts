import { MetadataRoute } from 'next';
import { getAllArticles } from './lib/articles';

// Mark sitemap as dynamic since it fetches from Google Sheets
export const dynamic = 'force-dynamic';
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
