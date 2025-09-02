"use client";
import Hero from '../components/Hero'
import Countdown from '../components/Countdown'
import SectionAbout from '../components/SectionAbout'
import SectionExhibition from '../components/SectionExhibition'
import SectionVisit from '../components/SectionVisit'
import SectionVenue from '../components/SectionVenue'
import SectionRegistration from '../components/SectionRegistration'
import SectionSponsor from '../components/SectionSponsor'
import SectionPress from '../components/SectionPress'
import SectionContact from '../components/SectionContact'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="space-y-0">
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeIn", delay: 1 }}
      >
      <Hero />
      <Countdown />
      <SectionAbout />
      <SectionContact />
      </motion.div>
    </div>
  )
}