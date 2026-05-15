export type EmailProviderLink = {
  label: string;
  href: string;
} | null;

const PROVIDER_MAP: { domains: string[]; label: string; href: string }[] = [
  { domains: ['gmail.com', 'googlemail.com'], label: 'Open Gmail', href: 'https://mail.google.com' },
  { domains: ['yahoo.com', 'yahoo.co.id', 'yahoo.co.uk', 'ymail.com'], label: 'Open Yahoo Mail', href: 'https://mail.yahoo.com' },
  {
    domains: ['outlook.com', 'hotmail.com', 'live.com', 'msn.com'],
    label: 'Open Outlook',
    href: 'https://outlook.live.com',
  },
  { domains: ['icloud.com', 'me.com', 'mac.com'], label: 'Open iCloud Mail', href: 'https://www.icloud.com/mail' },
  { domains: ['proton.me', 'protonmail.com', 'pm.me'], label: 'Open Proton Mail', href: 'https://mail.proton.me' },
  { domains: ['aol.com'], label: 'Open AOL Mail', href: 'https://mail.aol.com' },
];

export function getEmailProviderLink(email: string): EmailProviderLink {
  const domain = email.trim().toLowerCase().split('@')[1];
  if (!domain) return null;

  const match = PROVIDER_MAP.find((p) => p.domains.includes(domain));
  if (!match) return null;

  return { label: match.label, href: match.href };
}
