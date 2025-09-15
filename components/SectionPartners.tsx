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

export default function SectionPartners() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
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
      </div>
    </section>
  );
}
