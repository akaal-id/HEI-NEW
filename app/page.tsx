"use client";
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import EventStructuredData from '../components/StructuredData';

// Lazy load all sections
const Hero = lazy(() => import('../components/Hero'));
const Countdown = lazy(() => import('../components/Countdown'));
const SectionAbout = lazy(() => import('../components/SectionAbout'));
const SectionExhibition = lazy(() => import('../components/SectionExhibition'));
const SectionVisit = lazy(() => import('../components/SectionVisit'));
const SectionVenue = lazy(() => import('../components/SectionVenue'));
const SectionRegistration = lazy(() => import('../components/SectionRegistration'));
const SectionSponsor = lazy(() => import('../components/SectionSponsor'));
const SectionPress = lazy(() => import('../components/SectionPress'));
const SectionContact = lazy(() => import('../components/SectionContact'));
const SectionPartners = lazy(() => import('../components/SectionPartners'));

// Loading component
const SectionLoader = () => (
  <div className="h-96 bg-gray-100 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d93732] mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="space-y-0">
      <EventStructuredData
        name="Halal Expo Indonesia 2025"
        description="Indonesia's premier halal export exhibition connecting businesses, fostering innovation, and driving growth in the global halal industry. Join thousands of industry professionals, entrepreneurs, and decision-makers from around the world."
        startDate="2025-10-15T08:00:00+07:00"
        endDate="2025-10-19T18:00:00+07:00"
        location={{
          name: "ICE BSD",
          address: "Jl. BSD Grand Boulevard No.1, Pagedangan",
          city: "Tangerang",
          country: "Indonesia"
        }}
        organizer={{
          name: "PT Angan Kreasi Semesta",
          url: "https://www.skyconnection.co.id"
        }}
        url="https://halalexpoindonesia.com"
        image="/images/mainkv.png"
      />
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 1 }}
      >
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Countdown />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SectionAbout />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SectionExhibition />
        </Suspense>


        <Suspense fallback={<SectionLoader />}>
          <SectionVenue />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SectionPress />
        </Suspense>

        {/* Partners Section above footer */}
        <Suspense fallback={<SectionLoader />}>
          <SectionPartners />
        </Suspense>
        
      </motion.div>
    </div>
  )
}