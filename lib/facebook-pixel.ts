// Facebook Pixel utility functions
declare global {
  interface Window {
    fbq: any
  }
}

// Meta Pixel ID
export const META_PIXEL_ID = '703071514894786'

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window !== 'undefined' && !window.fbq) {
    // Load Facebook Pixel script
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${META_PIXEL_ID}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)
  }
}

// Track page view
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

// Track lead generation
export const trackLead = (parameters?: any) => {
  trackEvent('Lead', parameters)
}

// Track registration
export const trackRegistration = (parameters?: any) => {
  trackEvent('CompleteRegistration', parameters)
}

// Track contact form submission
export const trackContact = (parameters?: any) => {
  trackEvent('Contact', parameters)
}

// Track article view
export const trackArticleView = (articleTitle: string, articleSlug: string) => {
  trackEvent('ViewContent', {
    content_name: articleTitle,
    content_category: 'Press Article',
    content_ids: [articleSlug],
    value: 1,
    currency: 'USD'
  })
}

// Track social media share
export const trackSocialShare = (platform: string, articleTitle: string, articleUrl: string) => {
  trackEvent('Share', {
    content_name: articleTitle,
    content_category: 'Press Article',
    content_type: 'article',
    method: platform,
    url: articleUrl
  })
}

// Track exhibition interest
export const trackExhibitionInterest = (exhibitionType: string) => {
  trackEvent('InitiateCheckout', {
    content_category: 'Exhibition',
    content_name: exhibitionType,
    value: 1,
    currency: 'USD'
  })
}

// Track newsletter subscription
export const trackNewsletterSubscription = (email: string) => {
  trackEvent('Subscribe', {
    content_category: 'Newsletter',
    email: email
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('ButtonClick', {
    button_name: buttonName,
    page_location: location
  })
}
