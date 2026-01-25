import { ArrowUpRight, LucideIcon } from 'lucide-react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'yellow';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  icon?: LucideIcon;
  variant?: ButtonVariant;
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
  variant = 'primary'
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

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClass}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={buttonClass}
      type={type}
      aria-label={ariaLabel}
    >
      {buttonContent}
    </button>
  );
}

