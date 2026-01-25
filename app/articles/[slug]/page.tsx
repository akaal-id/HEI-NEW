import { notFound } from 'next/navigation';
import ArticleDetail from '../../components/ArticleDetail/ArticleDetail';

// TODO: Replace this with database fetch (Google Sheets or Supabase)
// This is a temporary mock data structure
const mockArticles = [
  {
    slug: 'lorem-ipsum-dolor-sit-amet-consectur',
    category: 'Live Report',
    image: '/images/overview.jpg',
    author: 'John Doe',
    date: 'January 8th, 2026',
    title: 'Lorem Ipsum Dolor Sit Amet Consectur Lorem Ipsum Dolor Sit Amet Consectur',
    content: `
      <p>In today's fast-paced business environment, understanding market trends is crucial for success. Companies must adapt to changing consumer preferences and technological advancements to stay competitive. By leveraging data analytics and customer feedback, businesses can make informed decisions that drive growth and innovation.</p>
      
      <p>The halal economy has emerged as one of the fastest-growing sectors globally, with increasing demand for halal-certified products and services across various industries. This growth presents significant opportunities for businesses willing to invest in understanding and serving this market segment.</p>
      
      <h2>Market Opportunities</h2>
      <p>As the halal economy continues to expand, businesses are discovering new opportunities in sectors ranging from food and beverage to pharmaceuticals, cosmetics, and financial services. The key to success lies in understanding the unique requirements and preferences of halal-conscious consumers.</p>
      
      <h2>Strategic Partnerships</h2>
      <p>Building strategic partnerships is essential for navigating the halal market successfully. By collaborating with certified suppliers, distributors, and service providers, businesses can ensure compliance with halal standards while expanding their market reach.</p>
      
      <p>Looking ahead, the halal economy is expected to continue its rapid growth, driven by increasing awareness, rising disposable incomes, and expanding Muslim populations worldwide. Businesses that position themselves early in this market will be well-placed to capitalize on these opportunities.</p>
    `
  },
  {
    slug: 'sed-do-eiusmod-tempor-incididunt',
    category: 'Business Education',
    image: '/images/overview.jpg',
    author: 'Jane Smith',
    date: 'February 15th, 2026',
    title: 'Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua',
    content: `
      <p>As we navigate through the complexities of the digital age, the importance of cybersecurity cannot be overstated. Protecting sensitive information from breaches and cyber attacks is essential for maintaining consumer trust and business integrity. Implementing robust security measures is no longer optional but a critical requirement for any business operating in today's interconnected world.</p>
      
      <h2>Cybersecurity Best Practices</h2>
      <p>Organizations must adopt a multi-layered approach to cybersecurity, combining technical solutions with employee training and awareness programs. Regular security audits, penetration testing, and incident response planning are essential components of a comprehensive cybersecurity strategy.</p>
      
      <h2>Compliance and Regulations</h2>
      <p>In addition to protecting against cyber threats, businesses must also ensure compliance with relevant data protection regulations. This includes understanding and adhering to requirements such as GDPR, CCPA, and industry-specific standards that may apply to their operations.</p>
      
      <p>The investment in cybersecurity is an investment in the future of your business. By prioritizing security measures and staying ahead of emerging threats, organizations can protect their assets, maintain customer trust, and ensure long-term sustainability.</p>
    `
  },
  {
    slug: 'ut-enim-ad-minim-veniam',
    category: 'News & Article',
    image: '/images/overview.jpg',
    author: 'Alice Johnson',
    date: 'March 22nd, 2026',
    title: 'Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco Laboris',
    content: `
      <p>Sustainability has become a key focus for organizations worldwide. Implementing eco-friendly practices not only benefits the environment but also enhances brand reputation and customer loyalty. By investing in renewable resources and promoting ethical sourcing, companies can create value for all stakeholders while contributing to a more sustainable future.</p>
      
      <h2>Environmental Impact</h2>
      <p>Businesses are increasingly recognizing their responsibility to minimize their environmental footprint. This includes reducing waste, conserving energy, and adopting sustainable production methods. Many companies are setting ambitious carbon neutrality goals and implementing comprehensive sustainability programs.</p>
      
      <h2>Sustainable Supply Chains</h2>
      <p>Creating sustainable supply chains requires collaboration with suppliers and partners who share similar values. This involves conducting due diligence, setting clear sustainability standards, and regularly monitoring compliance throughout the supply chain.</p>
      
      <h2>Consumer Expectations</h2>
      <p>Today's consumers are more environmentally conscious than ever before. They expect businesses to demonstrate commitment to sustainability through their actions, not just their marketing messages. Companies that fail to meet these expectations risk losing market share to more sustainable competitors.</p>
      
      <p>The transition to sustainable business practices is not just a trend but a fundamental shift in how businesses operate. Those that embrace this change early will be better positioned to thrive in an increasingly sustainability-focused marketplace.</p>
    `
  }
];

// TODO: Replace with database fetch function
// Example for Supabase:
// async function getArticleBySlug(slug: string) {
//   const { data, error } = await supabase
//     .from('articles')
//     .select('*')
//     .eq('slug', slug)
//     .single();
//   return data;
// }

// Example for Google Sheets:
// async function getArticleBySlug(slug: string) {
//   const response = await fetch('YOUR_GOOGLE_SHEETS_API_URL');
//   const data = await response.json();
//   return data.find((article: any) => article.slug === slug);
// }

async function getArticle(slug: string) {
  // For now, return mock data
  // Later, replace with database fetch
  return mockArticles.find(article => article.slug === slug);
}

export async function generateStaticParams() {
  // TODO: Replace with database fetch
  // For now, return mock slugs
  return mockArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
