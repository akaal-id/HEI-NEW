'use client';

import { useState, useEffect } from 'react';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

// Constants for share text formatting
const INTRO_TEXT = 'Check out this update from D-8 Halal Expo Indonesia 2026: ';
const OUTRO_TEXT = ' #D8HEI2026 #HalalExpo #Indonesia';

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isWebShareSupported, setIsWebShareSupported] = useState(false);

  // Check if Web Share API is supported (typically on mobile devices)
  useEffect(() => {
    setIsWebShareSupported(
      typeof navigator !== 'undefined' && 
      'share' in navigator &&
      navigator.canShare !== undefined
    );
  }, []);

  // Construct share text: Intro + Title + Outro
  const shareText = `${INTRO_TEXT}${title}${OUTRO_TEXT}`;

  // Handle Web Share API (Mobile)
  const handleWebShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
          url: url,
        });
      }
    } catch (error) {
      // User cancelled or error occurred
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  // Handle Copy Link
  const handleCopyLink = async () => {
    try {
      // Copy full text: Intro + Title + URL + Outro
      const fullText = `${shareText} ${url}`;
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = `${shareText} ${url}`;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  // URL encode helper
  const encodeShareData = (text: string) => encodeURIComponent(text);

  // Desktop share links
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeShareData(`${shareText} ${url}`)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeShareData(shareText)}&url=${encodeShareData(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeShareData(url)}&quote=${encodeShareData(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeShareData(url)}`,
  };

  const handleDesktopShare = (platform: 'whatsapp' | 'twitter' | 'facebook' | 'linkedin') => {
    const link = shareLinks[platform];
    window.open(link, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  // If Web Share API is supported, show single share button (Mobile)
  if (isWebShareSupported) {
    return (
      <div className={styles.shareButtons}>
        <div className={styles.shareLabel}>
          <ShareIcon className={styles.shareIcon} />
          <span>Share this article</span>
        </div>
        <button
          onClick={handleWebShare}
          className={styles.webShareButton}
          aria-label="Share article"
          title="Share article"
        >
          <ShareIcon className={styles.icon} />
          <span>Share</span>
        </button>
      </div>
    );
  }

  // Desktop fallback: Individual social buttons
  return (
    <div className={styles.shareButtons}>
      <div className={styles.shareLabel}>
        <ShareIcon className={styles.shareIcon} />
        <span>Share this article</span>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => handleDesktopShare('whatsapp')}
          className={`${styles.shareButton} ${styles.whatsapp}`}
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <WhatsAppIcon className={styles.icon} />
          <span>WhatsApp</span>
        </button>
        <button
          onClick={() => handleDesktopShare('twitter')}
          className={`${styles.shareButton} ${styles.twitter}`}
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <TwitterIcon className={styles.icon} />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => handleDesktopShare('facebook')}
          className={`${styles.shareButton} ${styles.facebook}`}
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <FacebookIcon className={styles.icon} />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleDesktopShare('linkedin')}
          className={`${styles.shareButton} ${styles.linkedin}`}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <LinkedInIcon className={styles.icon} />
          <span>LinkedIn</span>
        </button>
        <button
          onClick={handleCopyLink}
          className={`${styles.shareButton} ${styles.copy} ${copied ? styles.copied : ''}`}
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? (
            <>
              <CheckIcon className={styles.icon} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className={styles.icon} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Inline SVG Icons
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
