'use client';

import { useState } from 'react';
import {
  EditorialInput,
  EditorialSelect,
} from '../../../components/ui/editorial-form';
import Button from '../../../components/Button/Button';
import RegistrationModal, {
  type RegistrationModalRow,
} from '../../../components/RegistrationModal/RegistrationModal';
import {
  SALUTATIONS,
  COUNTRY_CODES,
  GENDERS,
  EMAIL_REGEX,
  isOtherOption,
  resolveOtherFieldValue,
} from '../../../lib/registration-data';
import styles from '../../../register/RegisterPage.module.css';

export default function RegisterHeiTalkPage() {
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [countryCodeOther, setCountryCodeOther] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [genderOther, setGenderOther] = useState('');

  const getCountryCodeValue = () => resolveOtherFieldValue(countryCode, countryCodeOther);
  const getGenderValue = () => resolveOtherFieldValue(gender, genderOther);

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
    setCompanyName('');
    setCountryCode('+62');
    setCountryCodeOther('');
    setMobile('');
    setEmail('');
    setBirthDate('');
    setGender('');
    setGenderOther('');
    setErrors({});
    setTouched({});
    setFormMessage(null);
  };

  const buildConfirmRows = (): RegistrationModalRow[] => [
    { label: 'Event', value: 'D-8 HEI Talk', highlight: true },
    { label: 'Salutation', value: salutation },
    { label: 'Full Name', value: name.trim() },
    { label: 'Company Name', value: companyName.trim() },
    { label: 'Mobile Number', value: `${getCountryCodeValue()} ${mobile.trim()}` },
    { label: 'Email Address', value: email.trim() },
    { label: 'Birth Date', value: birthDate },
    { label: 'Gender', value: getGenderValue() },
  ];

  const validate = () => {
    setTouched({
      salutation: true,
      name: true,
      companyName: true,
      countryCode: true,
      countryCodeOther: true,
      mobile: true,
      email: true,
      birthDate: true,
      gender: true,
      genderOther: true,
    });
    const next: Record<string, string> = {};
    if (!salutation) next.salutation = 'Required';
    if (!name?.trim()) next.name = 'Required';
    if (!companyName?.trim()) next.companyName = 'Required';
    if (!countryCode) next.countryCode = 'Required';
    if (isOtherOption(countryCode) && !countryCodeOther?.trim()) next.countryCodeOther = 'Please specify';
    if (!mobile?.trim()) next.mobile = 'Required';
    else if (mobile.replace(/\D/g, '').length < 9) next.mobile = 'Minimum 9 digits';
    if (!email?.trim()) next.email = 'Required';
    else if (!EMAIL_REGEX.test(email)) next.email = 'Invalid email address';
    if (!birthDate) next.birthDate = 'Required';
    if (!gender) next.gender = 'Required';
    if (isOtherOption(gender) && !genderOther?.trim()) next.genderOther = 'Please specify';
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
      const res = await fetch('/api/submit-hei-talk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salutation: salutation.trim(),
          fullName: name.trim(),
          companyName: companyName.trim(),
          countryCode: getCountryCodeValue(),
          mobileNumber: mobile.trim(),
          email: email.trim(),
          birthDate,
          gender: getGenderValue(),
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
          <h1 className={styles.heroTitle}>Register for D-8 HEI Talk</h1>
          <p className={styles.heroSubtitle}>Reserve your seat at the halal industry&apos;s most influential forum</p>
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
              <EditorialInput
                label="Company Name"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={touched.companyName ? errors.companyName : undefined}
                onBlur={() => setTouched((t) => ({ ...t, companyName: true }))}
                placeholder=""
              />
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
              <div className={styles.formRow}>
                <EditorialInput
                  label="Birth Date"
                  required
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  error={touched.birthDate ? errors.birthDate : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, birthDate: true }))}
                />
                <div>
                  <EditorialSelect
                    label="Gender"
                    required
                    options={GENDERS}
                    placeholder="Select"
                    value={gender}
                    onChange={(e) => {
                      const value = e.target.value;
                      setGender(value);
                      if (!isOtherOption(value)) setGenderOther('');
                    }}
                    error={touched.gender ? errors.gender : undefined}
                    onBlur={() => setTouched((t) => ({ ...t, gender: true }))}
                  />
                  {isOtherOption(gender) && (
                    <div className={styles.otherFieldBlock}>
                      <EditorialInput
                        label="Please specify"
                        required
                        value={genderOther}
                        onChange={(e) => setGenderOther(e.target.value)}
                        error={touched.genderOther ? errors.genderOther : undefined}
                        onBlur={() => setTouched((t) => ({ ...t, genderOther: true }))}
                        placeholder=""
                      />
                    </div>
                  )}
                </div>
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
        successMessage="Thank you for registering for D-8 HEI Talk. Please check your inbox for a confirmation email."
        isSubmitting={isSubmitting}
        error={modalError}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        onSubmitAnother={handleSubmitAnother}
      />
    </main>
  );
}
