"use client";
import { motion } from "framer-motion";

export default function SectionSponsor() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-primaryWhite"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Sponsors</h2>
        <div className="mt-6 flex gap-6 overflow-x-auto py-4">
          <div className="w-40 h-20 bg-gray-100 rounded flex items-center justify-center">
            Logo 1
          </div>
          <div className="w-40 h-20 bg-gray-100 rounded flex items-center justify-center">
            Logo 2
          </div>
          <div className="w-40 h-20 bg-gray-100 rounded flex items-center justify-center">
            Logo 3
          </div>
        </div>
      </div>
    </motion.section>
  );
}
