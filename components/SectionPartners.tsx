"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface PartnerItem {
  name: string;
  logo: string;
  href: string;
}

const organizedBy: PartnerItem[] = [
  { name: "Sky Connection", logo: "/images/skyconnection.png", href: "https://skyconnection.co.id" },
];

const strategicPartners: PartnerItem[] = [
  { name: "KNEKS", logo: "/images/logo-kneks.png", href: "https://www.kneks.go.id/beranda" },
  { name: "Eksyar", logo: "/images/logo-eksyar.webp", href: "https://www.kneks.go.id/beranda" },
];

const hostedBy: PartnerItem[] = [
  { name: "Kementerian Perdagangan", logo: "/images/logo-kemendag.png", href: "https://www.kemendag.go.id/" },
];

const eventPartners: PartnerItem[] = [
  { name: "Kementerian Pariwisata", logo: "/images/partner/eventpartner/logo-kemenpar.png", href: "https://kemenpar.go.id/" },
  { name: "MIHAS", logo: "/images/partner/eventpartner/logo-mihas.png", href: "https://mihas.com.my/" },
  { name: "Kolej Uniti", logo: "/images/partner/eventpartner/logo-kolejuniti.png", href: "https://uniti.edu.my/" },
  { name: "Uniti Halal Centre", logo: "/images/partner/eventpartner/logo-uhac.png", href: "https://unitihalalcentre.com/" },
  { name: "Wasabih", logo: "/images/partner/mediapartner/logo-wasabih.png", href: "https://www.wasabih.com/" },
  { name: "Halal Korea Center", logo: "/images/partner/eventpartner/logo-halalkorea.png", href: "https://halalkorea.center/" },
  { name: "Jeddah Vision Exhibition Company", logo: "/images/partner/eventpartner/logo-JVEC.png", href: "https://jeddah-vision.com/" },
  { name: "Talents Mapping", logo: "/images/partner/eventpartner/logo-tm.png", href: "https://talentsmapping.id/" },
  { name: "ASEAN Expo", logo: "/images/partner/eventpartner/logo-aseanexpo.png", href: "#" },
];

const mediaPartners: PartnerItem[] = [
  { name: "Medcom", logo: "/images/partner/mediapartner/logo-medcom.png", href: "https://www.medcom.id/" },
  { name: "Metro TV News", logo: "/images/partner/mediapartner/logo-metrotvnews.png", href: "https://www.metrotvnews.com/" },
  { name: "Metro TV", logo: "/images/partner/mediapartner/logo-metrotv.png", href: "https://www.metrotvnews.com/" },
  { name: "Halal Focus", logo: "/images/partner/mediapartner/logo-halalfocus.png", href: "https://halalfocus.com/" },
  { name: "TopBusiness", logo: "/images/partner/mediapartner/logo-topbusiness.png", href: "https://www.topbusiness.id/" },
  { name: "CoreNews", logo: "/images/partner/mediapartner/logo-corenews.png", href: "https://corenews.id/" },
  { name: "Scarf Media", logo: "/images/partner/mediapartner/logo-scarf media.png", href: "https://www.scmedia.id/about-us/" },
  { name: "New Madani", logo: "/images/partner/eventpartner/logo-newmadani.png", href: "#" },
  { name: "Bisnis.com", logo: "/images/partner/eventpartner/logo-bisniscom.png", href: "https://www.bisnis.com/" },
];

// Certain partner logos need to be displayed larger for better visual balance
const LARGE_PARTNER_LOGOS = new Set<string>([
  "ASEAN Expo",
  "Bisnis.com",
  "Kolej Uniti",
  "Uniti Halal Centre",
  "Kementerian Pariwisata",
  "Halal Focus",
  "MIHAS"
]);

// Certain partner logos need to be displayed smaller for better visual balance
const SMALL_PARTNER_LOGOS = new Set<string>([
  "Scarf Media"
]);

export default function SectionPartners() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Institutional Partners</h2>
          <p className="text-gray-600 mt-2">Trusted organizations behind Halal Export Indonesia</p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-24 md:gap-16">
          {/* Organized By */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-sm tracking-widest uppercase text-gray-500 mb-4">Organized by</h3>
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-8 md:gap-12">
              {organizedBy.map((p) => (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-1"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image src={p.logo} alt={p.name} width={240} height={100} className="object-contain w-auto max-h-20 drop-shadow-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Strategic Partner */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-sm tracking-widest uppercase text-gray-500 mb-4">Strategic partner</h3>
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-8 md:gap-4">
              {strategicPartners.map((p) => (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-1"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image src={p.logo} alt={p.name} width={220} height={90} className="object-contain w-auto max-h-16 drop-shadow-lg" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Hosted By */}
          <div className="w-full md:w-auto text-center md:text-left">
            <h3 className="text-sm tracking-widest uppercase text-gray-500 mb-4">Hosted by</h3>
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-8 md:gap-12">
              {hostedBy.map((p) => (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-1"
                  whileHover={{ scale: 1.03 }}
                >
                  <Image src={p.logo} alt={p.name} width={220} height={90} className="object-contain w-auto max-h-16 drop-shadow-lg" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Event Partners */}
        <div className="mt-24">
          <h3 className="text-center text-sm tracking-widest uppercase text-gray-500 mb-16">Event Partners</h3>
          <div className="flex flex-wrap gap-12 md:gap-32 items-center justify-center">
            {eventPartners.map((p) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-1"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={LARGE_PARTNER_LOGOS.has(p.name) ? 360 : 240}
                  height={LARGE_PARTNER_LOGOS.has(p.name) ? 180 : 120}
                  className={`object-contain w-auto ${LARGE_PARTNER_LOGOS.has(p.name) ? 'max-h-32' : 'max-h-24'} drop-shadow`}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Media Partners */}
        <div className="mt-24">
          <h3 className="text-center text-sm tracking-widest uppercase text-gray-500 mb-16 justify-center">Media Partners</h3>
          <div className="flex flex-wrap gap-12 md:gap-32 py-12 items-center justify-center">
            {mediaPartners.map((p) => (
              <motion.a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-1"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={LARGE_PARTNER_LOGOS.has(p.name) ? 320 : SMALL_PARTNER_LOGOS.has(p.name) ? 160 : 200}
                  height={LARGE_PARTNER_LOGOS.has(p.name) ? 140 : SMALL_PARTNER_LOGOS.has(p.name) ? 70 : 90}
                  className={`object-contain w-auto ${LARGE_PARTNER_LOGOS.has(p.name) ? 'max-h-28' : SMALL_PARTNER_LOGOS.has(p.name) ? 'max-h-12' : 'max-h-16'} drop-shadow`}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
