'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  EditorialInput,
  EditorialSelect,
} from '../components/ui/editorial-form';
import Button from '../components/Button/Button';
import SubmissionLoaderModal from '../components/SubmissionLoaderModal/SubmissionLoaderModal';
import {
  SALUTATIONS,
  COUNTRY_CODES,
  EMAIL_REGEX,
  isOtherOption,
  resolveOtherFieldValue,
} from '../lib/registration-data';
import styles from '../register/RegisterPage.module.css';
import otsStyles from './OtsPage.module.css';

const OTS_DEFAULTS = {
  country: 'Indonesia',
  companyName: 'OTS Walk-in',
  sourceOfInfo: 'OTS',
} as const;

export default function OtsRegistrationPage() {
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [countryCodeOther, setCountryCodeOther] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formMessage, setFormMessage] = useState<{ type: 'incomplete' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const salutationRef = useRef<HTMLSelectElement>(null);

  const getCountryCodeValue = () => resolveOtherFieldValue(countryCode, countryCodeOther);

  const resetForm = () => {
    setSalutation('');
    setName('');
    setCountryCode('+62');
    setCountryCodeOther('');
    setMobile('');
    setEmail('');
    setErrors({});
    setTouched({});
    setFormMessage(null);
    setShowSuccess(false);
    setSubmittedName('');
  };

  useEffect(() => {
    if (!showSuccess && !isSubmitting) {
      salutationRef.current?.focus();
    }
  }, [showSuccess, isSubmitting]);

  const validate = () => {
    const nextTouched: Record<string, boolean> = {
      salutation: true,
      name: true,
      countryCode: true,
      countryCodeOther: true,
      mobile: true,
      email: true,
    };
    const next: Record<string, string> = {};

    if (!salutation) next.salutation = 'Required';
    if (!name?.trim()) next.name = 'Required';
    if (!countryCode) next.countryCode = 'Required';
    if (isOtherOption(countryCode) && !countryCodeOther?.trim()) next.countryCodeOther = 'Please specify';
    if (!mobile?.trim()) next.mobile = 'Required';
    else if (mobile.replace(/\D/g, '').length < 9) next.mobile = 'Minimum 9 digits';
    if (!email?.trim()) next.email = 'Required';
    else if (!EMAIL_REGEX.test(email)) next.email = 'Invalid email address';

    setTouched(nextTouched);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);

    if (!validate()) {
      setFormMessage({
        type: 'incomplete',
        text: 'Please complete all required fields (*) before submitting.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        salutation: salutation.trim(),
        fullName: name.trim(),
        countryCode: getCountryCodeValue(),
        mobileNumber: mobile.trim(),
        email: email.trim(),
        country: OTS_DEFAULTS.country,
        companyName: OTS_DEFAULTS.companyName,
        sourceOfInfo: OTS_DEFAULTS.sourceOfInfo,
      };

      const res = await fetch('/api/submit-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedName(name.trim());
        setShowSuccess(true);
      } else {
        setFormMessage({
          type: 'error',
          text: data.error ?? 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setFormMessage({
        type: 'error',
        text: 'Failed to submit. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextVisitor = () => {
    resetForm();
  };

  return (
    <main className={styles.page}>
      <section className={`${styles.heroSection} ${otsStyles.heroCompact}`}>
        <div className={styles.heroContainer}>
          <p className={otsStyles.staffBadge}>Staff only · OTS</p>
          <h1 className={styles.heroTitle}>Quick Visitor Registration</h1>
          <p className={styles.heroSubtitle}>D-8 Halal Expo Indonesia 2026</p>
        </div>
      </section>

      <section className={`${styles.section} ${otsStyles.sectionCompact}`}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formBlock}>
              <div className={styles.formRow}>
                <EditorialSelect
                  ref={salutationRef}
                  label="Salutation"
                  required
                  options={SALUTATIONS}
                  placeholder="Select"
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  error={touched.salutation ? errors.salutation : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, salutation: true }))}
                />
                <EditorialInput
                  label="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={touched.name ? errors.name : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  placeholder=""
                />
              </div>

              <div className={styles.formRowThird}>
                <div>
                  <EditorialSelect
                    label="Country Code"
                    required
                    options={COUNTRY_CODES}
                    value={countryCode}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCountryCode(value);
                      if (!isOtherOption(value)) setCountryCodeOther('');
                    }}
                    error={touched.countryCode ? errors.countryCode : undefined}
                    onBlur={() => setTouched((t) => ({ ...t, countryCode: true }))}
                  />
                  {isOtherOption(countryCode) && (
                    <div className={styles.otherFieldBlock}>
                      <EditorialInput
                        label="Specify Country Code"
                        required
                        value={countryCodeOther}
                        onChange={(e) => setCountryCodeOther(e.target.value)}
                        error={touched.countryCodeOther ? errors.countryCodeOther : undefined}
                        onBlur={() => setTouched((t) => ({ ...t, countryCodeOther: true }))}
                        placeholder="e.g. +XX"
                      />
                    </div>
                  )}
                </div>
                <EditorialInput
                  label="Mobile Number"
                  required
                  tooltip="Minimum 9 digits"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 15))}
                  error={touched.mobile ? errors.mobile : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
                  placeholder=""
                />
              </div>

              <EditorialInput
                label="Email Address"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={touched.email ? errors.email : undefined}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder=""
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
              textClassName={styles.submitButtonText}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Register Visitor'}
            </Button>

            {formMessage && (
              <p
                className={`${styles.formMessage} ${
                  formMessage.type === 'incomplete'
                    ? styles.formMessageIncomplete
                    : styles.formMessageError
                }`}
              >
                {formMessage.text}
              </p>
            )}
          </form>
        </div>
      </section>

      <SubmissionLoaderModal isOpen={isSubmitting} totalCount={1} />

      {showSuccess && (
        <div className={otsStyles.successOverlay} role="dialog" aria-modal="true">
          <div className={otsStyles.successCard}>
            <CheckCircle2 className={otsStyles.successIcon} aria-hidden />
            <h2 className={otsStyles.successTitle}>Registered</h2>
            <p className={otsStyles.successText}>
              {submittedName} has been registered as a visitor.
            </p>
            <Button
              type="button"
              variant="primary"
              className={styles.submitButton}
              textClassName={styles.submitButtonText}
              onClick={handleNextVisitor}
            >
              Next visitor
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
