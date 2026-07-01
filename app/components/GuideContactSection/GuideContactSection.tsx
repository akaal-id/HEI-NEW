import { Mail, Phone } from 'lucide-react';
import styles from './GuideContactSection.module.css';

const contactGroups = [
  {
    title: 'Sales',
    items: [
      {
        label: 'Chat Sales',
        href: 'https://wa.me/62895403824515',
        icon: Phone,
        external: true,
      },
      {
        label: 'Mail Sales',
        href: 'mailto:Sales@halalexpoindonesia.com',
        icon: Mail,
        external: false,
      },
    ],
  },
  {
    title: 'Marketing',
    items: [
      {
        label: 'Chat Marketing',
        href: 'https://wa.me/62895428247935',
        icon: Phone,
        external: true,
      },
      {
        label: 'Mail Marketing',
        href: 'mailto:marketing@halalexpoindonesia.com',
        icon: Mail,
        external: false,
      },
    ],
  },
] as const;

export default function GuideContactSection() {
  return (
    <section className={styles.section} id="contact" aria-labelledby="guide-contact-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>GET IN TOUCH</span>
          <h2 id="guide-contact-title" className={styles.title}>
            Contact Us
          </h2>
          <p className={styles.description}>
            Reach our sales or marketing team for registration, exhibiting, partnerships, and general inquiries about D-8 Halal Expo Indonesia 2026.
          </p>
        </div>

        <div className={styles.groups}>
          {contactGroups.map((group) => (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.buttonList}>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className={styles.contactButton}
                      {...(item.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className={styles.iconWrap} aria-hidden="true">
                        <Icon className={styles.icon} />
                      </span>
                      <span className={styles.contactLabel}>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
