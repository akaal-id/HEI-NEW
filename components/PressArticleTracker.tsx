"use client"
import { useEffect } from 'react'
import { trackArticleView } from '../lib/facebook-pixel'

interface PressArticleTrackerProps {
  articleTitle: string
  articleSlug: string
}

export default function PressArticleTracker({ articleTitle, articleSlug }: PressArticleTrackerProps) {
  useEffect(() => {
    // Track article view when component mounts
    trackArticleView(articleTitle, articleSlug)
  }, [articleTitle, articleSlug])

  return null // This component doesn't render anything
}
