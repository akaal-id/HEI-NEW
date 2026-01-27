import { notFound } from 'next/navigation';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';
import { getArticleBySlug, getArticleSlugs } from '../../lib/articles';

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Ensure content is always a string
  const articleWithContent = {
    ...article,
    content: article.content || article.description || ''
  };

  return <ArticleDetail article={articleWithContent} />;
}
