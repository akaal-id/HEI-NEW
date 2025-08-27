"use client";
import { motion } from "framer-motion";

export default function SectionPress() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-primaryWhite"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Press</h2>
        <div className="mt-6 space-y-4">
          <div className="p-4 border rounded">
            Press release headline — brief summary of media coverage.
          </div>
          <div className="p-4 border rounded">Another press item — brief summary.</div>
        </div>
      </div>
    </motion.section>
  );
}
