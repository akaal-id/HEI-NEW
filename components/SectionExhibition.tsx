"use client";
import { motion } from "framer-motion";

export default function SectionExhibition() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-secondary text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Exhibition</h2>
        <p className="mt-4">
          Uniting the halal value chain to enhance competitiveness, showcase
          innovation, and build global market access for Indonesian halal
          products.
        </p>
      </div>
    </motion.section>
  );
}
