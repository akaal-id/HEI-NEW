"use client"
import { useState } from 'react'
import { trackSocialShare } from '../lib/facebook-pixel'

interface SocialShareButtonsProps {
  title: string
  url: string
  description?: string
  articleContent?: string
  imageUrl?: string
}

export default function SocialShareButtons({ title, url, description, articleContent, imageUrl }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // Generate contextual share text based on article content
  const generateContextualShareText = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    // Extract key themes from the article content
    const content = articleContent || description || ''
    const lowerContent = content.toLowerCase()
    
    // Identify article themes
    const isAboutExhibition = lowerContent.includes('exhibition') || lowerContent.includes('expo') || lowerContent.includes('showcase')
    const isAboutBusiness = lowerContent.includes('business') || lowerContent.includes('trade') || lowerContent.includes('export')
    const isAboutHalal = lowerContent.includes('halal') || lowerContent.includes('certification') || lowerContent.includes('compliance')
    const isAboutIndonesia = lowerContent.includes('indonesia') || lowerContent.includes('indonesian')
    const isAboutIndustry = lowerContent.includes('industry') || lowerContent.includes('market') || lowerContent.includes('sector')
    const isAboutPartnership = lowerContent.includes('partnership') || lowerContent.includes('collaboration') || lowerContent.includes('network')
    const isAboutInnovation = lowerContent.includes('innovation') || lowerContent.includes('technology') || lowerContent.includes('digital')
    const isAboutGrowth = lowerContent.includes('growth') || lowerContent.includes('development') || lowerContent.includes('expansion')
    
    // Generate contextual messages
    let contextualMessage = ''
    let hashtags = '#HalalExportIndonesia #HEI2025'
    
    if (isAboutExhibition) {
      contextualMessage = '🎯 Discover the latest opportunities in Indonesia\'s halal export market!'
      hashtags += ' #HalalExhibition #TradeShow'
    } else if (isAboutBusiness) {
      contextualMessage = '💼 Unlock new business opportunities in the global halal industry!'
      hashtags += ' #Business #HalalTrade'
    } else if (isAboutHalal) {
      contextualMessage = '🕌 Stay ahead with the latest insights in halal certification and compliance!'
      hashtags += ' #HalalCertification #HalalCompliance'
    } else if (isAboutPartnership) {
      contextualMessage = '🤝 Connect with industry leaders and expand your halal business network!'
      hashtags += ' #Partnership #Networking'
    } else if (isAboutInnovation) {
      contextualMessage = '🚀 Explore cutting-edge innovations shaping the future of halal industry!'
      hashtags += ' #Innovation #Technology'
    } else if (isAboutGrowth) {
      contextualMessage = '📈 Discover growth strategies for your halal business in Indonesia!'
      hashtags += ' #Growth #Development'
    } else {
      contextualMessage = '🌟 Stay informed about Indonesia\'s thriving halal export industry!'
      hashtags += ' #HalalIndustry #Indonesia'
    }
    
    if (isAboutIndonesia) {
      hashtags += ' #Indonesia'
    }
    
    // Platform-specific formatting
    switch (platform) {
      case 'twitter':
        // Twitter: Keep it concise and engaging
        return `📢 ${title}\n\n${contextualMessage}\n\n${hashtags}`
      
      case 'facebook':
        // Facebook: More detailed and engaging
        const fbMessage = `${contextualMessage}\n\n${description || 'Join us in exploring the dynamic world of halal exports from Indonesia. Connect with industry experts, discover new opportunities, and be part of the global halal revolution!'}\n\n${hashtags}\n\n#HalalExportIndonesia #GlobalHalalMarket`
        return `📢 ${title}\n\n${fbMessage}`
      
      case 'linkedin':
        // LinkedIn: Professional and business-focused
        const linkedinMessage = `${contextualMessage}\n\n${description || 'Gain valuable insights into Indonesia\'s halal export sector and discover opportunities for business growth and international expansion.'}\n\n${hashtags}\n\n#Business #Trade #HalalMarket #ProfessionalDevelopment`
        return `📢 ${title}\n\n${linkedinMessage}`
      
      default:
        return `📢 ${title}\n\n${contextualMessage}\n\n${hashtags}`
    }
  }

  const shareToTwitter = () => {
    const text = generateContextualShareText('twitter')
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    
    // Track social share event
    trackSocialShare('Twitter', title, url)
    
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const shareToFacebook = () => {
    const text = generateContextualShareText('facebook')
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    
    // Track social share event
    trackSocialShare('Facebook', title, url)
    
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const shareToLinkedIn = () => {
    const text = generateContextualShareText('linkedin')
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(text)}`
    
    // Track social share event
    trackSocialShare('LinkedIn', title, url)
    
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL:', err)
    }
  }

  return (
    <div className="pt-8 border-t border-gray-200 relative">
      <div className="text-lg font-semibold text-gray-800 mb-4">Share this article</div>
      <div className="mx-auto flex flex-col md:flex-row gap-4">
        <button 
          onClick={shareToTwitter}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-900 transition-colors"
          data-url={url}
          data-title={title}
          data-image={imageUrl}
          data-desc={description}
          data-platform="twitter"
        >
          <svg className="w-4 h-4" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
            </g>
          </svg>
          X (Twitter)
        </button>
        
        <button 
          onClick={shareToFacebook}
          className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
          data-url={url}
          data-title={title}
          data-image={imageUrl}
          data-desc={description}
          data-platform="facebook"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
        
        <button 
          onClick={shareToLinkedIn}
          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          data-url={url}
          data-title={title}
          data-image={imageUrl}
          data-desc={description}
          data-platform="linkedin"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>

        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  )
}
