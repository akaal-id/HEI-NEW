"use client";

interface PressMediaTabsProps {
  onTabChange: (activeTab: 'press' | 'media') => void;
  activeTab: 'press' | 'media';
}

export default function PressMediaTabs({ onTabChange, activeTab }: PressMediaTabsProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-gray-100 rounded-full p-1 inline-flex">
        <button
          onClick={() => onTabChange('press')}
          className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
            activeTab === 'press'
              ? 'text-gray-800 bg-white border-2 border-[#d93732]/20'
              : 'text-gray-600 hover:text-gray-800 border-2 border-transparent'
          }`}
        >
          <span className="relative z-10">Press</span>
        </button>
        
        <button
          onClick={() => onTabChange('media')}
          className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
            activeTab === 'media'
              ? 'text-gray-800 bg-white border-2 border-[#d93732]/20'
              : 'text-gray-600 hover:text-gray-800 border-2 border-transparent'
          }`}
        >
          <span className="relative z-10">Media</span>
        </button>
      </div>
    </div>
  );
}
