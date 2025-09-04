"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Meta Pixel ID
const META_PIXEL_ID = '703071514894786'

// Meta Pixel script
const metaPixelScript = `
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

export default function MetaPixel() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Meta Pixel
    if (typeof window !== 'undefined' && !window.fbq) {
      // Create and inject the script
      const script = document.createElement('script')
      script.innerHTML = metaPixelScript
      document.head.appendChild(script)
    }

    // Track page view on route change
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname])

  return (
    <>
      {/* Meta Pixel Code */}
      <script
        dangerouslySetInnerHTML={{
          __html: metaPixelScript
        }}
      />
      
      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    fbq: any
  }
}
