"use client";
import { motion } from "framer-motion";

export default function SectionVenue() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-primaryWhite"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Venue</h2>
        <p className="mt-4">ICE BSD — a world-class venue located in Greater Jakarta.</p>
        <div className="mt-6 w-full h-64 rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.123456789!2d106.123456!3d-6.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDA3JzAwLjAiTiAxMDbCsDA3JzAwLjAiVw!5e0!3m2!1sen!2sid!4v0000000000"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </motion.section>
  );
}
