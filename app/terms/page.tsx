import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '../components/LegalPage/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | HEI 2026 - Halal Expo Indonesia',
  description:
    'Terms of Service for the D-8 Halal Expo Indonesia 2026 website. Read the terms governing your use of our site and event registration.',
  keywords: [
    'HEI 2026 terms of service',
    'Halal Expo Indonesia terms',
    'D-8 Halal Expo website terms',
    'event registration terms',
  ],
  openGraph: {
    title: 'Terms of Service | HEI 2026 - Halal Expo Indonesia',
    description:
      'Terms and conditions governing your use of the D-8 Halal Expo Indonesia 2026 website and services.',
    url: 'https://halalexpoindonesia.com/terms',
  },
  alternates: {
    canonical: 'https://halalexpoindonesia.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LAST_UPDATED = 'July 2, 2026';

export default function TermsOfServicePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of"
      titleAccent="Service"
      subtitle="These terms govern your access to and use of the D-8 Halal Expo Indonesia 2026 website and related event services."
      lastUpdated={LAST_UPDATED}
    >
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using <a href="https://halalexpoindonesia.com">halalexpoindonesia.com</a>{' '}
        (the &quot;Website&quot;) operated by <strong>Skyconnection (PT. Angan Kreasi Semesta)</strong>{' '}
        as the official organizer of <strong>D-8 Halal Expo Indonesia 2026</strong> (&quot;HEI
        2026,&quot; &quot;the Event&quot;), you agree to be bound by these Terms of Service
        (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Website or
        submit any registration.
      </p>

      <h2>2. About the Event</h2>
      <p>
        D-8 Halal Expo Indonesia 2026 is an international halal trade exhibition and summit held in
        Jakarta, Indonesia. The Website provides information about the Event, its programs, partners,
        and registration channels for visitors, buyers, exhibitors, and program participants. Event
        dates, venues, schedules, and program details are subject to change at the organizer&apos;s
        discretion.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 18 years of age to register for the Event or use registration services
        on the Website. By registering, you represent and warrant that all information you provide
        is accurate, complete, and current, and that you have the authority to agree to these Terms
        on behalf of yourself or the organization you represent.
      </p>

      <h2>4. Website Use</h2>
      <p>You agree to use the Website only for lawful purposes and in accordance with these Terms. You must not:</p>
      <ul>
        <li>Use the Website in any way that violates applicable local, national, or international law</li>
        <li>Attempt to gain unauthorized access to any part of the Website, servers, or systems</li>
        <li>Transmit viruses, malware, or other harmful code</li>
        <li>Scrape, crawl, or harvest data from the Website without our prior written consent</li>
        <li>Impersonate any person or entity, or misrepresent your affiliation</li>
        <li>Interfere with or disrupt the Website or its infrastructure</li>
        <li>Use the Website to send unsolicited commercial communications</li>
      </ul>

      <h2>5. Event Registration</h2>
      <p>
        Registration for the Event is subject to availability and may require approval by the
        organizer. Submitting a registration form does not guarantee admission or participation.
        We reserve the right to accept, decline, or cancel any registration at our sole discretion.
      </p>
      <p>By registering, you agree that:</p>
      <ul>
        <li>All registration information you provide is truthful and accurate</li>
        <li>
          You will comply with all Event rules, venue policies, and instructions from organizers and
          security personnel
        </li>
        <li>
          Your registration is personal and non-transferable unless explicitly approved by the
          organizer
        </li>
        <li>
          The organizer may contact you regarding your registration, Event updates, and related
          services
        </li>
      </ul>
      <p>
        Specific terms for exhibitor packages, buyer programs, and paid services may be communicated
        separately and will supplement these Terms where applicable.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content on the Website — including text, graphics, logos, images, videos, design elements,
        and software — is the property of Skyconnection (PT. Angan Kreasi Semesta), its licensors,
        or event partners, and is protected by copyright, trademark, and other intellectual property
        laws.
      </p>
      <p>
        You may view and download content for personal, non-commercial use related to the Event. You
        may not reproduce, distribute, modify, create derivative works from, publicly display, or
        commercially exploit any Website content without our prior written permission.
      </p>

      <h2>7. User Content</h2>
      <p>
        If you submit content to us (such as through registration forms, inquiries, or feedback),
        you grant us a non-exclusive, royalty-free, worldwide license to use, store, and process that
        content solely for the purposes of operating the Event and the Website. You represent that you
        have the right to submit such content and that it does not infringe any third-party rights.
      </p>

      <h2>8. Third-Party Links and Services</h2>
      <p>
        The Website may contain links to third-party websites, platforms, or services (including
        social media, hotel partners, and payment providers). We are not responsible for the content,
        privacy practices, or terms of any third-party site. Your use of third-party services is at
        your own risk and subject to their respective terms and policies.
      </p>

      <h2>9. Disclaimer of Warranties</h2>
      <p>
        The Website and all Event information are provided on an &quot;as is&quot; and &quot;as
        available&quot; basis without warranties of any kind, whether express or implied, including
        but not limited to warranties of merchantability, fitness for a particular purpose,
        accuracy, or non-infringement.
      </p>
      <p>
        We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or
        other harmful components. Event schedules, speaker lineups, exhibitor lists, and program
        details may change without notice.
      </p>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, Skyconnection (PT. Angan Kreasi Semesta),
        its directors, employees, agents, and partners shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from or related to your use
        of the Website or attendance at the Event, including but not limited to loss of profits,
        data, business opportunities, or goodwill.
      </p>
      <p>
        Our total liability for any claim arising under these Terms shall not exceed the amount you
        paid to us for Event registration or services, if any, in the twelve (12) months preceding
        the claim.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Skyconnection (PT. Angan Kreasi Semesta) and
        its affiliates, officers, employees, and agents from any claims, damages, losses, or
        expenses (including reasonable legal fees) arising from your violation of these Terms, your
        use of the Website, your Event participation, or your infringement of any third-party rights.
      </p>

      <h2>12. Event Cancellation or Modification</h2>
      <p>
        We reserve the right to modify, postpone, relocate, or cancel the Event or any part of it due
        to circumstances beyond our reasonable control, including but not limited to natural
        disasters, pandemics, government restrictions, or venue unavailability. In such cases, we will
        make reasonable efforts to notify registered participants and will address refunds or
        alternative arrangements in accordance with applicable policies communicated at the time of
        registration.
      </p>

      <h2>13. Privacy</h2>
      <p>
        Your use of the Website is also governed by our{' '}
        <Link href="/privacy">Privacy Policy</Link>, which describes how we collect and handle your
        personal data. By using the Website, you consent to the practices described in the Privacy
        Policy.
      </p>

      <h2>14. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the Republic of
        Indonesia, without regard to conflict of law principles. Any dispute arising from or
        relating to these Terms or your use of the Website shall be subject to the exclusive
        jurisdiction of the competent courts in Jakarta, Indonesia.
      </p>
      <p>
        Before initiating formal proceedings, we encourage you to contact us to seek an informal
        resolution.
      </p>

      <h2>15. Changes to These Terms</h2>
      <p>
        We may revise these Terms at any time by posting an updated version on this page. The
        &quot;Last updated&quot; date indicates when the Terms were last modified. Your continued
        use of the Website after changes are posted constitutes acceptance of the revised Terms. We
        recommend reviewing this page periodically.
      </p>

      <h2>16. Severability</h2>
      <p>
        If any provision of these Terms is found to be invalid or unenforceable, the remaining
        provisions shall continue in full force and effect.
      </p>

      <h2>17. Contact Us</h2>
      <p>
        For questions about these Terms of Service, please contact us:
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
    </LegalPage>
  );
}
