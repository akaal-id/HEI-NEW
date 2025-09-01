import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Professional Header Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-gray-500 text-sm mb-16">
            <Link href="/" className="hover:text-[#d93732] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">About Us</span>
          </nav>

          {/* Main Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Left: Headline and Description */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-gray-900">We build bridges</span>
                <br />
                <span className="text-gray-700">between companies</span>
                <br />
                <span className="text-gray-700">and customers</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                To build software that gives customer-facing teams at small- and medium-sized businesses the ability to create fruitful and enduring relationships with customers.
              </p>
            </div>

            {/* Right: Main Visual */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl overflow-hidden">
                <Image
                  src="/images/image-export-2.jpg"
                  alt="Halal Expo Indonesia Team"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover object-center hover:scale-110 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About HEI Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Together we are strong
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  As the world's largest Muslim-majority country, Indonesia has a rapidly growing demand for halal products and services. Halal Expo Indonesia is a B2B platform designed to meet this demand by connecting providers with consumers and businesses.
                </p>
                
                <p className="text-lg">
                  The halal industry is not limited to food and beverages — it also includes cosmetics, pharmaceuticals, fashion, tourism, and finance. This exhibition brings together players from across these sectors, creating stronger business networks and driving the growth of the halal economy in Indonesia and beyond.
                </p>
                
                <p className="text-lg">
                  For international businesses, Halal Expo Indonesia opens opportunities to enter the Indonesian market and build partnerships with local stakeholders. Collaboration and global expansion are at the heart of this event.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Link
                  href="/exhibition"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#d93732] to-[#492f32] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Learn More About HEI
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-2xl p-8 flex items-center justify-center shadow-xl">
                <Image
                  src="/images/hexi_logo.png"
                  alt="Halal Expo Indonesia - About HEI"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Image Section - 16:6 Aspect Ratio */}
      <div className="relative">
          <div className="aspect-[16/6] flex items-center justify-center overflow-hidden">
            <Image
              src="/images/image-export-3.jpg"
              alt="Halal Expo Indonesia Exhibition Hall"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-300"
              priority
            />
          </div>
      </div>

      {/* The Organizer Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 flex items-center justify-center shadow-xl">
                <Image
                  src="/images/main logo_compile.png"
                  alt="PT Angan Kreasi Semesta - The Organizer"
                  width={400}
                  height={400}
                  className="w-full h-auto max-w-sm"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                The Organizer
              </h2>
              
              {/* Company Stats */}
              <div className="grid grid-cols-5 pt-6">
                <div className="text-center hover:-translate-y-1 transition-all duration-300">
                  <img src="/images/established.png" alt="Year Established" className="w-12 h-12 mb-4 mx-auto" />
                  <div className="text-3xl font-bold text-[#d93732] mb-2">2010</div>
                  <div className="text-sm text-gray-600">Year Est.</div>
                </div>
                <div className="flex items-center justify-center">
                 <div className="h-full w-px bg-gray-200"></div>
                </div>
                <div className="text-center hover:-translate-y-1 transition-all duration-300">
                  <img src="/images/event-organizer.png" alt="Specialization" className="w-12 h-12 mb-4 mx-auto" />
                  <div className="text-3xl font-bold text-[#d93732] mb-2">MICE</div>
                  <div className="text-sm text-gray-600">Specialization</div>
                </div>
                <div className="flex items-center justify-center">
                 <div className="h-full w-px bg-gray-200"></div>
                </div>
                <div className="text-center hover:-translate-y-1 transition-all duration-300">
                  <img src="/images/clients.png" alt="Clients" className="w-12 h-12 mb-4 mx-auto" />
                  <div className="text-3xl font-bold text-[#d93732] mb-2">1000</div>
                  <div className="text-sm text-gray-600">Clients</div>
                </div>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  PT Angan Kreasi Semesta, the organizer of Halal Expo Indonesia, is an event planning and organizing company specializing in Meetings, Incentives, Conferences, and Exhibitions (MICE). Beyond MICE, we also manage various events such as corporate gatherings, product launches, festivals, seminars, workshops, and more.
                </p>
                
                <p className="text-lg">
                  Established in 2010, our company is led by a dynamic professional leader and supported by a team of young, creative, and experienced talents. With passion and expertise, we are committed to delivering impactful and memorable events for our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-[#d8793a] to-[#593a19] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Join Us at Halal Expo Indonesia
          </h3>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
            Be part of the largest B2B Halal Export Exhibition in Southeast Asia and connect with industry leaders from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/registration/exhibitor"
              className="inline-flex items-center px-10 py-4 bg-white text-[#d93732] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Register as Exhibitor
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/registration/buyer"
              className="inline-flex items-center px-10 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#d93732] transition-all duration-300 hover:scale-105"
            >
              Register as Buyer
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
