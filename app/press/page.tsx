import PressCard from "@/components/PressCard";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  timestamp: string;
  author: string;
  slug: string;
}

async function getPressData(): Promise<PressArticle[]> {
  try {
    // Use relative URL for production, absolute for development
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? '' // Use relative URL in production
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/press`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch press data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching press data:', error);
    // Return empty array as fallback
    return [];
  }
}

export default async function PressPage() {
  const pressData = await getPressData();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pt-20 pb-16">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Press & Media
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, insights, and developments in the halal industry and our events.
            </p>
          </div>

          {/* Press Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pressData.map((article) => (
              <PressCard
                key={article.id}
                id={article.id}
                title={article.title}
                imageUrl={article.imageUrl}
                timestamp={article.timestamp}
                author={article.author}
                slug={article.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
