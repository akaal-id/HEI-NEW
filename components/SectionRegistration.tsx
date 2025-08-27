"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SectionRegistration() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Registration</h2>
        <p className="mt-4">Choose a category that suits you.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/registration/exhibitor"
            className="p-6 rounded-2xl border hover:scale-105 transition-transform"
          >
            Exhibitor
          </Link>
          <Link
            href="/registration/buyer"
            className="p-6 rounded-2xl border hover:scale-105 transition-transform"
          >
            Buyer
          </Link>
          <Link
            href="/registration/visitor"
            className="p-6 rounded-2xl border hover:scale-105 transition-transform"
          >
            Visitor
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
