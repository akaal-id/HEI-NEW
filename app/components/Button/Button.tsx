import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export default function Button({ 
  children, 
  onClick, 
  href, 
  className,
  type = 'button',
  ariaLabel
}: ButtonProps) {
  const buttonClass = `${styles.button} ${className || ''}`.trim();

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClass}
        aria-label={ariaLabel}
      >
        {children}
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
      {children}
    </button>
  );
}

