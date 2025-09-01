"use client"
import { useState } from 'react'

export default function GoogleFormHelper() {
  const [isVisible, setIsVisible] = useState(false)

  const instructions = [
    "✅ Google Form Integration Complete!",
    "",
    "Your exhibitor registration form is now fully connected to your Google Form.",
    "",
    "Form URL:",
    "https://docs.google.com/forms/d/e/1FAIpQLSdG4eicjOOgDHtMuF-VR0TpdsOOE2QaMwCO-BwyCDsifZc8kQ/viewform",
    "",
    "Entry IDs configured:",
    "• Title: entry.758188846",
    "• Full Name: entry.930896042", 
    "• Mobile: entry.553952233",
    "• Email: entry.1598177166",
    "• Country: entry.1208590350",
    "• Company: entry.172760247",
    "• Job Title: entry.622187862",
    "• Address: entry.982931524",
    "• Business Type: entry.759839504",
    "• Business Other: entry.1322037478",
    "• Market Sector: entry.1473624981",
    "• Market Other: entry.668076561",
    "",
    "Test the form to ensure everything works correctly!"
  ]

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        {isVisible ? 'Hide Helper' : 'Show Helper'}
      </button>
      
      {isVisible && (
        <div className="fixed bottom-20 right-4 bg-white border border-gray-300 rounded-lg shadow-xl p-6 max-w-md z-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            How to Get Google Form Entry IDs
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            {instructions.map((instruction, index) => (
              <p key={index} className={instruction.startsWith(' ') ? 'ml-4' : ''}>
                {instruction}
              </p>
            ))}
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Entry IDs are unique to each form field and must be obtained individually.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
