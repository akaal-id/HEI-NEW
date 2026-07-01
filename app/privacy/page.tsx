import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '../components/LegalPage/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | HEI 2026 - Halal Expo Indonesia',
  description:
    'Privacy Policy for the D-8 Halal Expo Indonesia 2026 website. Learn how we collect, use, and protect your personal data.',
  keywords: [
    'HEI 2026 privacy policy',
    'Halal Expo Indonesia privacy',
    'D-8 Halal Expo data protection',
    'personal data policy Indonesia',
  ],
  openGraph: {
    title: 'Privacy Policy | HEI 2026 - Halal Expo Indonesia',
    description:
      'How D-8 Halal Expo Indonesia 2026 collects, uses, and protects your personal information.',
    url: 'https://halalexpoindonesia.com/privacy',
  },
  alternates: {
    canonical: 'https://halalexpoindonesia.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = 'July 2, 2026';

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy"
      titleAccent="Policy"
      subtitle="This policy explains how we collect, use, store, and protect your personal information when you visit our website or register for D-8 Halal Expo Indonesia 2026."
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Introduction</h2>
      <p>
        Welcome to the official website of <strong>D-8 Halal Expo Indonesia 2026</strong> (&quot;HEI
        2026,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by{' '}
        <strong>Skyconnection (PT. Angan Kreasi Semesta)</strong> as the official event organizer.
        We are committed to protecting your privacy and handling your personal data in accordance
        with applicable laws, including Indonesia&apos;s Law No. 27 of 2022 on Personal Data
        Protection (UU PDP).
      </p>
      <p>
        This Privacy Policy describes the types of information we collect, how we use it, with whom
        we may share it, and the choices available to you. By using{' '}
        <a href="https://halalexpoindonesia.com">halalexpoindonesia.com</a> (the &quot;Website&quot;)
        or submitting any registration or inquiry form, you acknowledge that you have read and
        understood this policy.
      </p>

      <h2>2. Data Controller</h2>
      <p>The data controller responsible for your personal data is:</p>
      <ul>
        <li>
          <strong>Skyconnection (PT. Angan Kreasi Semesta)</strong>
        </li>
        <li>
          Jl. Gotong Royong I No.50 RT.03/RW.01, Ragunan, Ps. Minggu, Kota Jakarta Selatan,
          Daerah Khusus Ibukota Jakarta 12550, Indonesia
        </li>
        <li>
          Email:{' '}
          <a href="mailto:Inquiries@halalexpoindonesia.com">Inquiries@halalexpoindonesia.com</a>
        </li>
      </ul>

      <h2>3. Information We Collect</h2>
      <p>We may collect the following categories of personal information:</p>

      <h3>3.1 Information You Provide Directly</h3>
      <ul>
        <li>
          <strong>Registration data</strong> — when you register as a visitor, buyer, exhibitor, or
          program participant (e.g., HEI Talk, Culture Festival), we may collect your name,
          salutation, email address, phone number, country, company or organization name, and how
          you heard about the event.
        </li>
        <li>
          <strong>Newsletter subscription</strong> — when you subscribe to updates via our footer
          form, we collect your email address.
        </li>
        <li>
          <strong>Contact and inquiry data</strong> — when you reach out to us via email, WhatsApp,
          or contact forms, we collect the information you choose to provide (such as your name,
          email, phone number, and message content).
        </li>
      </ul>

      <h3>3.2 Information Collected Automatically</h3>
      <ul>
        <li>
          <strong>Usage and device data</strong> — including your IP address, browser type, operating
          system, referring URLs, pages viewed, and the dates and times of your visits.
        </li>
        <li>
          <strong>Cookies and similar technologies</strong> — small data files stored on your device
          that help us understand how the Website is used and improve your experience.
        </li>
      </ul>

      <h2>4. How We Use Your Information</h2>
      <p>We use the personal information we collect for the following purposes:</p>
      <ul>
        <li>Processing and managing event registrations and attendee records</li>
        <li>Communicating with you about your registration, event updates, and program information</li>
        <li>Sending newsletters and promotional materials (where you have opted in)</li>
        <li>Responding to inquiries and providing customer support</li>
        <li>Facilitating business matching, exhibition, and program participation</li>
        <li>Analyzing Website traffic and improving our services and user experience</li>
        <li>Measuring the effectiveness of our marketing campaigns</li>
        <li>Complying with legal obligations and protecting our legitimate interests</li>
      </ul>

      <h2>5. Legal Basis for Processing</h2>
      <p>We process your personal data based on one or more of the following grounds:</p>
      <ul>
        <li>
          <strong>Consent</strong> — for example, when you subscribe to our newsletter or agree to
          marketing communications.
        </li>
        <li>
          <strong>Contractual necessity</strong> — to process your event registration and fulfill our
          obligations to you as a participant.
        </li>
        <li>
          <strong>Legitimate interests</strong> — such as improving our Website, ensuring security,
          and promoting the event, where these interests are not overridden by your rights.
        </li>
        <li>
          <strong>Legal obligation</strong> — where processing is required by applicable law.
        </li>
      </ul>

      <h2>6. Third-Party Services</h2>
      <p>
        We use trusted third-party services to operate the Website and manage registrations. These
        providers may process your data on our behalf:
      </p>
      <ul>
        <li>
          <strong>Google Forms</strong> — registration and newsletter submissions are processed
          through Google Forms. Google&apos;s privacy practices are governed by{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&apos;s Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Meta (Facebook) Pixel</strong> — we use Meta Pixel to measure advertising
          performance and understand how visitors interact with our Website. Learn more in{' '}
          <a
            href="https://www.facebook.com/privacy/policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meta&apos;s Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>Vercel Analytics</strong> — we use Vercel Analytics to collect anonymized usage
          statistics. See{' '}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel&apos;s Privacy Policy
          </a>
          .
        </li>
      </ul>
      <p>
        We do not sell your personal information to third parties. We may share data with event
        partners, sponsors, or government bodies only where necessary for event operations and
        with appropriate safeguards in place.
      </p>

      <h2>7. Cookies</h2>
      <p>
        Our Website uses cookies and similar tracking technologies for essential functionality,
        analytics, and marketing measurement. You can control cookies through your browser settings.
        Disabling certain cookies may affect some features of the Website.
      </p>

      <h2>8. Data Retention</h2>
      <p>
        We retain your personal data only for as long as necessary to fulfill the purposes described
        in this policy, including to satisfy legal, accounting, or reporting requirements.
        Registration data is typically retained for the duration of the event cycle and a reasonable
        period thereafter for follow-up communications and record-keeping. Newsletter data is
        retained until you unsubscribe or request deletion.
      </p>

      <h2>9. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal data
        against unauthorized access, alteration, disclosure, or destruction. However, no method of
        transmission over the internet or electronic storage is completely secure, and we cannot
        guarantee absolute security.
      </p>

      <h2>10. Your Rights</h2>
      <p>
        Under applicable data protection laws, including Indonesia&apos;s UU PDP, you may have the
        right to:
      </p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate or incomplete data</li>
        <li>Request deletion of your personal data, subject to legal exceptions</li>
        <li>Withdraw consent where processing is based on consent</li>
        <li>Object to or restrict certain processing activities</li>
        <li>Request a copy of your data in a portable format</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{' '}
        <a href="mailto:Inquiries@halalexpoindonesia.com">Inquiries@halalexpoindonesia.com</a>. We
        will respond within a reasonable timeframe as required by law.
      </p>

      <h2>11. International Data Transfers</h2>
      <p>
        Some of our third-party service providers (such as Google, Meta, and Vercel) may process
        data on servers located outside Indonesia. Where such transfers occur, we take steps to
        ensure that appropriate safeguards are in place to protect your data in accordance with
        applicable law.
      </p>

      <h2>12. Children&apos;s Privacy</h2>
      <p>
        Our Website and event services are not directed at individuals under the age of 18. We do
        not knowingly collect personal data from children. If you believe we have inadvertently
        collected data from a minor, please contact us and we will take steps to delete it promptly.
      </p>

      <h2>13. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        applicable law. The &quot;Last updated&quot; date at the top of this page indicates when
        the policy was last revised. We encourage you to review this page periodically. Continued use
        of the Website after changes are posted constitutes your acceptance of the updated policy.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data
        practices, please contact us:
      </p>
      <ul>
        <li>
          Email:{' '}
          <a href="mailto:Inquiries@halalexpoindonesia.com">Inquiries@halalexpoindonesia.com</a>
        </li>
        <li>
          Sales:{' '}
          <a href="mailto:Sales@halalexpoindonesia.com">Sales@halalexpoindonesia.com</a>
        </li>
        <li>
          Address: Jl. Gotong Royong I No.50 RT.03/RW.01, Ragunan, Ps. Minggu, Kota Jakarta
          Selatan, DKI Jakarta 12550, Indonesia
        </li>
      </ul>
      <p>
        For information about your use of the Website, please also see our{' '}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
