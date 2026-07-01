import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import { getArticleBySlug, getAllArticles } from '../../lib/articles';

const ArticleDetail = dynamicImport(() => import('../../components/ArticleDetail/ArticleDetail'), {
  loading: () => <div style={{ minHeight: '100vh', padding: '8rem 0.5rem' }}>Loading article...</div>,
});

// Make this page fully dynamic - no static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

// Generate dynamic metadata for each article
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  
  if (!resolvedParams?.slug || resolvedParams.slug === 'undefined') {
    return {
      title: 'Article Not Found | HEI 2026',
      description: 'The requested article could not be found.',
    };
  }

  let slug: string;
  try {
    slug = decodeURIComponent(resolvedParams.slug);
  } catch {
    slug = resolvedParams.slug;
  }

  try {
    const article = await getArticleBySlug(slug);
    
    if (!article) {
      return {
        title: 'Article Not Found | HEI 2026',
        description: 'The requested article could not be found.',
      };
    }

    const keywords = [
      article.title,
      article.category,
      "Halal Expo Indonesia",
      "HEI 2026",
      "D-8 Halal Economy",
      "Halal Industry",
      "Halal Business",
      "Halal Export",
      "Islamic Economy",
      "Halal Products"
    ].filter(Boolean);

    return {
      title: `${article.title} | HEI 2026 - Halal Expo Indonesia`,
      description: article.description || `Read about ${article.title} at the 6th Halal Expo Indonesia 2026. Discover insights about halal economy, business opportunities, and industry trends.`,
      keywords: keywords,
      authors: [{ name: article.author || 'Halal Export Indonesia' }],
      openGraph: {
        title: article.title,
        description: article.description || `Read about ${article.title} at HEI 2026.`,
        type: 'article',
        publishedTime: article.createdAt || article.date,
        authors: [article.author || 'Halal Export Indonesia'],
        images: [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        url: `https://halalexpoindonesia.com/articles/${article.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.description || `Read about ${article.title} at HEI 2026.`,
        images: [article.image],
      },
      alternates: {
        canonical: `https://halalexpoindonesia.com/articles/${article.slug}`,
      },
    };
  } catch {
    return {
      title: 'Article | HEI 2026 - Halal Expo Indonesia',
      description: 'Read the latest articles and news about Halal Expo Indonesia 2026.',
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle both Promise and direct params (Next.js 15+ uses Promise)
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  
  // Validate params object and slug property
  if (!resolvedParams || typeof resolvedParams !== 'object') {
    console.error(`[ArticlePage] Invalid params object:`, resolvedParams);
    notFound();
    return null;
  }
  
  if (!resolvedParams.slug || resolvedParams.slug === 'undefined') {
    console.error(`[ArticlePage] Invalid or missing slug in params:`, resolvedParams);
    notFound();
    return null;
  }
  
  // Decode the slug - Next.js automatically encodes URL parameters
  let slug: string;
  try {
    slug = decodeURIComponent(resolvedParams.slug);
  } catch {
    // If decoding fails, use the raw slug
    slug = resolvedParams.slug;
  }
  
  // Validate slug exists and is not empty
  if (!slug || slug.trim() === '' || slug === 'undefined' || slug === 'null') {
    console.error(`[ArticlePage] Invalid slug after decoding: "${slug}" (raw: "${resolvedParams.slug}")`);
    console.error(`[ArticlePage] Full params object:`, JSON.stringify(resolvedParams, null, 2));
    notFound();
    return null;
  }
  
  console.log(`[ArticlePage] Received slug param: "${resolvedParams.slug}"`);
  console.log(`[ArticlePage] Decoded slug: "${slug}"`);
  
  try {
    // Fetch fresh data every time
    let article = await getArticleBySlug(slug);

    if (!article) {
      // Debug: Get all articles to see what slugs exist
      const allArticles = await getAllArticles();
      
      // Try to find by ID as a last resort (in case slug was actually an ID)
      const articleById = allArticles.find(a => a.id === slug || a.id === resolvedParams.slug);
      if (articleById) {
        console.log(`[ArticlePage] Found article by ID fallback: ${articleById.title}`);
        article = articleById;
      } else {
        const similarSlugs = allArticles
          .map(a => ({ slug: a.slug, title: a.title, id: a.id }))
          .filter(a => {
            const articleSlug = a.slug.toLowerCase();
            const searchSlug = slug.toLowerCase();
            return articleSlug.includes(searchSlug.substring(0, 15)) || 
                   searchSlug.includes(articleSlug.substring(0, 15)) ||
                   a.id === slug ||
                   a.id === resolvedParams.slug;
          })
          .slice(0, 5);
        
        console.error(`[ArticlePage] Article not found for slug: "${slug}" (raw: "${resolvedParams.slug}")`);
        console.error(`[ArticlePage] Total articles available: ${allArticles.length}`);
        if (similarSlugs.length > 0) {
          console.error('[ArticlePage] Similar slugs found:', similarSlugs);
        } else {
          console.error('[ArticlePage] Sample slugs:', allArticles.slice(0, 5).map(a => ({ 
            slug: a.slug, 
            id: a.id,
            title: a.title.substring(0, 40)
          })));
        }
        notFound();
      }
    }

    // Ensure content is properly set
    const articleWithContent = {
      ...article,
      content: article.content || article.description || '<p>Content is being loaded...</p>',
      id: article.id,
      description: article.description || '',
    };

    // Log for debugging
    if (!articleWithContent.content || articleWithContent.content.length < 50) {
      console.warn(`Article ${article.id} has very short content: ${articleWithContent.content?.substring(0, 100)}`);
    }

    return <ArticleDetail article={articleWithContent} />;
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
