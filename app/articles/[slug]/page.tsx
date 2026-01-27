import { notFound } from 'next/navigation';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';
import { getArticleBySlug, getAllArticles } from '../../lib/articles';

// Make this page fully dynamic - no static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);
  
  try {
    // Fetch fresh data every time
    const article = await getArticleBySlug(slug);

    if (!article) {
      // Debug: Get all articles to see what slugs exist
      const allArticles = await getAllArticles();
      const similarSlugs = allArticles
        .map(a => ({ slug: a.slug, title: a.title }))
        .filter(a => {
          const articleSlug = a.slug.toLowerCase();
          const searchSlug = slug.toLowerCase();
          return articleSlug.includes(searchSlug.substring(0, 15)) || 
                 searchSlug.includes(articleSlug.substring(0, 15));
        })
        .slice(0, 5);
      
      console.warn(`Article not found for slug: ${slug}`);
      console.log(`Total articles available: ${allArticles.length}`);
      if (similarSlugs.length > 0) {
        console.log('Similar slugs found:', similarSlugs);
      } else {
        console.log('Sample slugs:', allArticles.slice(0, 5).map(a => a.slug));
      }
      notFound();
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
