'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mic,
  MessagesSquare,
  Presentation,
  MessageCircleQuestion,
  Coffee,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react';
import styles from './flow.module.css';

gsap.registerPlugin(ScrollTrigger);

type Step = {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: Mic,
    step: '01',
    title: 'Opening Keynote',
    description:
      'The day begins with a headline address that frames the strategic outlook for the global halal economy.',
  },
  {
    icon: MessagesSquare,
    step: '02',
    title: 'Expert Panels',
    description:
      'Cross-sector leaders debate the most pressing themes—from regulation to innovation—in moderated discussions.',
  },
  {
    icon: Presentation,
    step: '03',
    title: 'Deep-Dive Talks',
    description:
      'Focused sessions unpack specialised topics with case studies, data, and practical frameworks.',
  },
  {
    icon: MessageCircleQuestion,
    step: '04',
    title: 'Audience Dialogue',
    description:
      'Interactive Q&A and live polling turn the stage into a two-way conversation with the room.',
  },
  {
    icon: Coffee,
    step: '05',
    title: 'Networking Breaks',
    description:
      'Curated intervals let you connect directly with speakers, delegates, and fellow industry players.',
  },
  {
    icon: Lightbulb,
    step: '06',
    title: 'Closing Insights',
    description:
      'Each session wraps with key takeaways and forward-looking actions you can bring back to your business.',
  },
];

export default function FlowSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.header} > *`,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: `.${styles.header}`, start: 'top 80%' },
        },
      );

      // The central track draws itself as you scroll through the agenda
      gsap.fromTo(
        `.${styles.trackProgress}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: `.${styles.timeline}`,
            start: 'top 70%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(`.${styles.stepItem}`).forEach((item) => {
        gsap.fromTo(
          item,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%' },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="agenda" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>The Experience</span>
          <h3 className={styles.title}>
            How a Session <em>Unfolds</em>
          </h3>
          <p className={styles.lead}>
            A carefully paced format that balances big-picture vision with hands-on
            insight—and the time to connect with the people behind it.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.track} aria-hidden="true">
            <div className={styles.trackProgress} />
          </div>

          {STEPS.map(({ icon: Icon, step, title, description }) => (
            <article key={step} className={styles.stepItem}>
              <div className={styles.stepDot}>
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>{step}</span>
                <h4 className={styles.stepTitle}>{title}</h4>
                <p className={styles.stepDesc}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
