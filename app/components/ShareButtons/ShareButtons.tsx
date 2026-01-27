'use client';

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Copy } from 'lucide-react';
import { useState } from 'react';
import styles from './ShareButtons.module.css';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const link = shareLinks[platform];
    window.open(link, '_blank', 'width=600,height=400');
  };

  return (
    <div className={styles.shareButtons}>
      <div className={styles.shareLabel}>
        <Share2 className={styles.shareIcon} />
        <span>Share this article</span>
      </div>
      <div className={styles.buttons}>
        <button
          onClick={() => handleShare('facebook')}
          className={styles.shareButton}
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className={styles.icon} />
          <span>Facebook</span>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className={styles.shareButton}
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter className={styles.icon} />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className={styles.shareButton}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className={styles.icon} />
          <span>LinkedIn</span>
        </button>
        <button
          onClick={handleCopyLink}
          className={`${styles.shareButton} ${copied ? styles.copied : ''}`}
          aria-label="Copy link"
          title="Copy link"
        >
          {copied ? (
            <>
              <Copy className={styles.icon} />
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
