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

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      <Countdown />
      <SectionAbout />
      <SectionContact />
    </div>
  )
}