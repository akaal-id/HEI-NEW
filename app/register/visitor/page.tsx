'use client';

import { useState } from 'react';
import {
  EditorialInput,
  EditorialSelect,
} from '../../components/ui/editorial-form';
import Button from '../../components/Button/Button';
import RegistrationModal, {
  type RegistrationModalRow,
} from '../../components/RegistrationModal/RegistrationModal';
import {
  SALUTATIONS,
  COUNTRY_CODES,
  COUNTRIES,
  SOURCE_OF_INFO,
  EMAIL_REGEX,
  isOtherOption,
  resolveOtherFieldValue,
} from '../../lib/registration-data';
import styles from '../RegisterPage.module.css';

export default function RegisterVisitorPage() {
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [countryCodeOther, setCountryCodeOther] = useState('');
  const [countryOther, setCountryOther] = useState('');
  const [sourceOfInfo, setSourceOfInfo] = useState('');
  const [sourceOfInfoOther, setSourceOfInfoOther] = useState('');

  const getCountryCodeValue = () => resolveOtherFieldValue(countryCode, countryCodeOther);
  const getCountryValue = () => resolveOtherFieldValue(country, countryOther);
  const getSourceOfInfoValue = () => resolveOtherFieldValue(sourceOfInfo, sourceOfInfoOther);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formMessage, setFormMessage] = useState<{ type: 'incomplete' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhase, setModalPhase] = useState<'confirm' | 'success'>('confirm');
  const [modalError, setModalError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const resetForm = () => {
    setSalutation('');
    setName('');
    setCountryCode('+62');
    setMobile('');
    setEmail('');
    setCountry('');
    setCompanyName('');
    setCountryCodeOther('');
    setCountryOther('');
    setSourceOfInfo('');
    setSourceOfInfoOther('');
    setErrors({});
    setTouched({});
    setFormMessage(null);
  };

  const buildConfirmRows = (): RegistrationModalRow[] => [
    { label: 'Status', value: 'Visitor', highlight: true },
    { label: 'Salutation', value: salutation },
    { label: 'Full Name', value: name.trim() },
    { label: 'Mobile Number', value: `${getCountryCodeValue()} ${mobile.trim()}` },
    { label: 'Email Address', value: email.trim() },
    { label: 'Country', value: getCountryValue() },
    { label: 'Company Name', value: companyName.trim() },
    { label: 'Source of Information', value: getSourceOfInfoValue() },
  ];

  const validate = () => {
    setTouched({
      salutation: true, name: true, countryCode: true, countryCodeOther: true,
      mobile: true, email: true, country: true, countryOther: true,
      companyName: true, sourceOfInfo: true, sourceOfInfoOther: true,
    });
    const next: Record<string, string> = {};
    if (!salutation) next.salutation = 'Required';
    if (!name?.trim()) next.name = 'Required';
    if (!countryCode) next.countryCode = 'Required';
    if (isOtherOption(countryCode) && !countryCodeOther?.trim()) next.countryCodeOther = 'Please specify';
    if (!mobile?.trim()) next.mobile = 'Required';
    else if (mobile.replace(/\D/g, '').length < 9) next.mobile = 'Minimum 9 digits';
    if (!email?.trim()) next.email = 'Required';
    else if (!EMAIL_REGEX.test(email)) next.email = 'Invalid email address';
    if (!country) next.country = 'Required';
    if (isOtherOption(country) && !countryOther?.trim()) next.countryOther = 'Please specify';
    if (!companyName?.trim()) next.companyName = 'Required';
    if (!sourceOfInfo) next.sourceOfInfo = 'Required';
    if (isOtherOption(sourceOfInfo) && !sourceOfInfoOther?.trim()) next.sourceOfInfoOther = 'Please specify';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);
    setModalError(null);

    if (!validate()) {
      setFormMessage({
        type: 'incomplete',
        text: 'Please complete all required fields (*) before submitting.',
      });
      return;
    }

    setModalPhase('confirm');
    setModalOpen(true);
  };

  const handleModalConfirm = async () => {
    setModalError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salutation: salutation.trim(),
          fullName: name.trim(),
          countryCode: getCountryCodeValue(),
          mobileNumber: mobile.trim(),
          email: email.trim(),
          country: getCountryValue(),
          companyName: companyName.trim(),
          sourceOfInfo: getSourceOfInfoValue(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedEmail(email.trim());
        setModalPhase('success');
      } else {
        setModalError(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setModalError('Failed to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (isSubmitting) return;
    setModalOpen(false);
    setModalError(null);
    if (modalPhase === 'success') {
      resetForm();
    }
  };

  const handleSubmitAnother = () => {
    resetForm();
    setModalOpen(false);
    setModalPhase('confirm');
    setModalError(null);
    setSubmittedEmail('');
  };

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Register as Visitor</h1>
          <p className={styles.heroSubtitle}>D-8 Halal Expo Indonesia 2026</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formBlock}>
              <h2 className={styles.sectionTitle}>Contact</h2>
              <div className={styles.formRow}>
                <EditorialSelect
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
              <div>
                <EditorialSelect
                  label="Country"
                  required
                  options={COUNTRIES}
                  placeholder="Select country"
                  value={country}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCountry(value);
                    if (!isOtherOption(value)) setCountryOther('');
                  }}
                  error={touched.country ? errors.country : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, country: true }))}
                />
                {isOtherOption(country) && (
                  <div className={styles.otherFieldBlock}>
                    <EditorialInput
                      label="Specify Country"
                      required
                      value={countryOther}
                      onChange={(e) => setCountryOther(e.target.value)}
                      error={touched.countryOther ? errors.countryOther : undefined}
                      onBlur={() => setTouched((t) => ({ ...t, countryOther: true }))}
                      placeholder=""
                    />
                  </div>
                )}
              </div>
              <EditorialInput
                label="Company Name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={touched.companyName ? errors.companyName : undefined}
                onBlur={() => setTouched((t) => ({ ...t, companyName: true }))}
                placeholder=""
              />
              <div>
                <EditorialSelect
                  label="Where did you get information about D-8 Halal Expo?"
                  required
                  options={SOURCE_OF_INFO}
                  placeholder="Select"
                  value={sourceOfInfo}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSourceOfInfo(value);
                    if (!isOtherOption(value)) setSourceOfInfoOther('');
                  }}
                  error={touched.sourceOfInfo ? errors.sourceOfInfo : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, sourceOfInfo: true }))}
                />
                {isOtherOption(sourceOfInfo) && (
                  <div className={styles.otherFieldBlock}>
                    <EditorialInput
                      label="Please specify"
                      required
                      value={sourceOfInfoOther}
                      onChange={(e) => setSourceOfInfoOther(e.target.value)}
                      error={touched.sourceOfInfoOther ? errors.sourceOfInfoOther : undefined}
                      onBlur={() => setTouched((t) => ({ ...t, sourceOfInfoOther: true }))}
                      placeholder=""
                    />
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
              textClassName={styles.submitButtonText}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
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

      <RegistrationModal
        isOpen={modalOpen}
        phase={modalPhase}
        rows={buildConfirmRows()}
        email={modalPhase === 'success' ? submittedEmail : email.trim()}
        successTitle="Registration submitted!"
        successMessage="Thank you for registering. Please check your inbox for a confirmation email from D-8 Halal Expo Indonesia 2026."
        isSubmitting={isSubmitting}
        error={modalError}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        onSubmitAnother={handleSubmitAnother}
      />
    </main>
  );
}
