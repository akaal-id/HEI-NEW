import { notFound } from 'next/navigation';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';
import { getArticleBySlug, getAllArticles } from '../../lib/articles';

// Make this page fully dynamic - no static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

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
  } catch (e) {
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
