"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Search articles..." }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pl-14 pr-14 text-lg border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#d93732]/20 transition-all duration-300 bg-white shadow-sm hover:shadow-md focus:shadow-lg"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg 
            className={`w-6 h-6 transition-colors duration-300 ${
              isFocused ? 'text-[#d93732]' : 'text-gray-400'
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Clear Button */}
        {searchTerm && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}

        {/* Focus Ring */}
        {isFocused && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 rounded-full border-2 border-[#d93732]/20 pointer-events-none"
            style={{ boxShadow: '0 0 0 3px rgba(217, 55, 50, 0.05)' }}
          />
        )}
      </div>

      {/* Search Results Count */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-gray-600"
        >
          <span className="font-medium">Search results for:</span> "{searchTerm}"
        </motion.div>
      )}
    </div>
  );
}
