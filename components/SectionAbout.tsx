"use client";
import { motion } from "framer-motion";

export default function SectionAbout() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-16"
      id="about"
    >
      <h2 className="text-3xl font-bold">About</h2>
      <p className="mt-4 text-lg">
        Indonesia holds vast potential in halal food and beverage production, with
        a diversified supply chain and growing export opportunities. The Halal
        Export Indonesia initiative focuses on global promotion, strengthening
        the halal ecosystem, and improving competitiveness.
      </p>
    </motion.section>
  );
}
