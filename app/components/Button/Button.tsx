import { ArrowUpRight, LucideIcon } from 'lucide-react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  icon?: LucideIcon;
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  className,
  type = 'button',
  ariaLabel,
  icon: Icon = ArrowUpRight
}: ButtonProps) {
  const buttonClass = `${styles.button} ${className || ''}`.trim();

  const buttonContent = (
    <>
      <span className={styles.text}>{children}</span>
      <div className={styles.iconContainer}>
        <Icon className={styles.icon} />
      </div>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClass}
        aria-label={ariaLabel}
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

