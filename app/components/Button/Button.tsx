import { ArrowUpRight, LucideIcon } from 'lucide-react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'yellow';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  href?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  className,
  textClassName,
  iconClassName,
  type = 'button',
  ariaLabel,
  icon,
  variant = 'primary',
  target,
  rel,
  disabled,
}: ButtonProps) {
  const variantClass = styles[variant];
  const buttonClass = `${styles.button} ${variantClass} ${className || ''}`.trim();
  const textClass = `${styles.text} ${textClassName || ''}`.trim();
  const iconContainerClass = `${styles.iconContainer} ${iconClassName || ''}`.trim();

  // Show icon if: not tertiary variant AND icon is provided (or use default ArrowUpRight for primary/secondary/yellow)
  const showIcon = variant !== 'tertiary' && (icon !== undefined || variant === 'primary' || variant === 'secondary' || variant === 'yellow');
  const IconComponent = icon !== undefined ? icon : (variant !== 'tertiary' ? ArrowUpRight : undefined);

  const buttonContent = (
    <>
      <span className={textClass}>{children}</span>
      {showIcon && IconComponent && (
        <div className={iconContainerClass}>
          <IconComponent className={styles.icon} />
      </div>
      )}
    </>
  );

  // If href is provided, render as <a> tag for SEO
  if (href) {
    // Determine if link is external
    const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
    const isHashLink = href.startsWith('#');
    
    // Set default target and rel for external links
    const linkTarget = target || (isExternal ? '_blank' : undefined);
    const linkRel = rel || (isExternal && !isHashLink ? 'noopener noreferrer' : undefined);

    return (
      <a 
        href={href} 
        className={buttonClass}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        onClick={onClick}
        target={linkTarget}
        rel={linkRel}
      >
        {buttonContent}
      </a>
    );
  }

  // If no href, render as <button> tag
  return (
    <button 
      onClick={onClick} 
      className={buttonClass}
      type={type}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
}

