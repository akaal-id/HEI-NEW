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
    // Get the base URL - use environment variable or construct from request
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    if (!baseUrl) {
      // Fallback: construct URL based on environment
      if (process.env.NODE_ENV === 'production') {
        // In production, we need to use the actual domain
        // This will be set by your deployment platform
        baseUrl = 'https://the2nd-hei-git-main-akaals-projects.vercel.app';
      } else {
        baseUrl = 'http://localhost:3000';
      }
    }
    
    console.log('Fetching press data from:', `${baseUrl}/api/press`);
    const response = await fetch(`${baseUrl}/api/press`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch press data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched press data:', data.length, 'articles');
    return data;
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
