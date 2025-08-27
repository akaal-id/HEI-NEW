"use client";
import { motion } from "framer-motion";

export default function SectionVisit() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Visit The Expo</h2>
        <p className="mt-4">
          Discover halal products, gain insights from industry leaders, and build
          networks with global buyers and partners.
        </p>
      </div>
    </motion.section>
  );
}
