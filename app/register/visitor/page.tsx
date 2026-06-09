'use client';

import { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import {
  EditorialInput,
  EditorialSelect,
} from '../../components/ui/editorial-form';
import Button from '../../components/Button/Button';
import RegistrationModal, {
  type RegistrationModalRow,
} from '../../components/RegistrationModal/RegistrationModal';
import SubmissionLoaderModal from '../../components/SubmissionLoaderModal/SubmissionLoaderModal';
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

type GroupMember = {
  id: number;
  salutation: string;
  name: string;
  email: string;
};

let nextGroupMemberId = 1;

function createGroupMember(): GroupMember {
  return {
    id: nextGroupMemberId++,
    salutation: '',
    name: '',
    email: '',
  };
}

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
  const [isGroupRegistration, setIsGroupRegistration] = useState(false);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

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
  const [submittedCount, setSubmittedCount] = useState(1);

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
    setIsGroupRegistration(false);
    setGroupMembers([]);
    setErrors({});
    setTouched({});
    setFormMessage(null);
    setSubmittedCount(1);
  };

  const handleGroupToggle = (checked: boolean) => {
    setIsGroupRegistration(checked);
    if (checked) {
      setGroupMembers([createGroupMember()]);
    } else {
      setGroupMembers([]);
      setErrors((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (key.startsWith('group-')) delete next[key];
        });
        return next;
      });
      setTouched((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((key) => {
          if (key.startsWith('group-')) delete next[key];
        });
        return next;
      });
    }
  };

  const updateGroupMember = (id: number, field: keyof Omit<GroupMember, 'id'>, value: string) => {
    setGroupMembers((members) =>
      members.map((member) => (member.id === id ? { ...member, [field]: value } : member))
    );
  };

  const addGroupMember = () => {
    setGroupMembers((members) => [...members, createGroupMember()]);
  };

  const removeGroupMember = (id: number) => {
    setGroupMembers((members) => members.filter((member) => member.id !== id));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(`group-${id}-`)) delete next[key];
      });
      return next;
    });
    setTouched((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (key.startsWith(`group-${id}-`)) delete next[key];
      });
      return next;
    });
  };

  const buildConfirmRows = (): RegistrationModalRow[] => {
    const rows: RegistrationModalRow[] = [
      { label: 'Status', value: 'Visitor', highlight: true },
      { label: 'Salutation', value: salutation },
      { label: 'Full Name', value: name.trim() },
      { label: 'Mobile Number', value: `${getCountryCodeValue()} ${mobile.trim()}` },
      { label: 'Email Address', value: email.trim() },
      { label: 'Country', value: getCountryValue() },
      { label: 'Company Name', value: companyName.trim() },
      { label: 'Source of Information', value: getSourceOfInfoValue() },
    ];

    if (isGroupRegistration && groupMembers.length > 0) {
      rows.push({
        label: 'Group size',
        value: `${groupMembers.length + 1} visitors`,
        highlight: true,
      });
      groupMembers.forEach((member, index) => {
        rows.push({
          label: `Group member ${index + 2}`,
          value: `${member.salutation} ${member.name.trim()} · ${member.email.trim()}`,
        });
      });
    }

    return rows;
  };

  const validate = () => {
    const nextTouched: Record<string, boolean> = {
      salutation: true,
      name: true,
      countryCode: true,
      countryCodeOther: true,
      mobile: true,
      email: true,
      country: true,
      countryOther: true,
      companyName: true,
      sourceOfInfo: true,
      sourceOfInfoOther: true,
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
    if (!country) next.country = 'Required';
    if (isOtherOption(country) && !countryOther?.trim()) next.countryOther = 'Please specify';
    if (!companyName?.trim()) next.companyName = 'Required';
    if (!sourceOfInfo) next.sourceOfInfo = 'Required';
    if (isOtherOption(sourceOfInfo) && !sourceOfInfoOther?.trim()) next.sourceOfInfoOther = 'Please specify';

    if (isGroupRegistration) {
      if (groupMembers.length === 0) {
        next.group = 'Add at least one group member';
      }
      groupMembers.forEach((member) => {
        const prefix = `group-${member.id}`;
        nextTouched[`${prefix}-salutation`] = true;
        nextTouched[`${prefix}-name`] = true;
        nextTouched[`${prefix}-email`] = true;

        if (!member.salutation) next[`${prefix}-salutation`] = 'Required';
        if (!member.name?.trim()) next[`${prefix}-name`] = 'Required';
        if (!member.email?.trim()) next[`${prefix}-email`] = 'Required';
        else if (!EMAIL_REGEX.test(member.email)) next[`${prefix}-email`] = 'Invalid email address';
      });
    }

    setTouched(nextTouched);
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
      const payload: Record<string, unknown> = {
        salutation: salutation.trim(),
        fullName: name.trim(),
        countryCode: getCountryCodeValue(),
        mobileNumber: mobile.trim(),
        email: email.trim(),
        country: getCountryValue(),
        companyName: companyName.trim(),
        sourceOfInfo: getSourceOfInfoValue(),
      };

      if (isGroupRegistration && groupMembers.length > 0) {
        payload.groupMembers = groupMembers.map((member) => ({
          salutation: member.salutation.trim(),
          fullName: member.name.trim(),
          email: member.email.trim(),
        }));
      }

      const res = await fetch('/api/submit-visitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedEmail(email.trim());
        setSubmittedCount(data.count ?? 1);
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
    setSubmittedCount(1);
  };

  const totalVisitors = isGroupRegistration ? groupMembers.length + 1 : 1;
  const successMessage =
    submittedCount > 1
      ? `Thank you for registering ${submittedCount} visitors. Please check your inbox for confirmation emails from D-8 Halal Expo Indonesia 2026.`
      : 'Thank you for registering. Please check your inbox for a confirmation email from D-8 Halal Expo Indonesia 2026.';

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

            <label
              className={`${styles.groupCta} ${isGroupRegistration ? styles.groupCtaActive : ''}`}
            >
              <input
                type="checkbox"
                className={styles.groupCtaCheckbox}
                checked={isGroupRegistration}
                onChange={(e) => handleGroupToggle(e.target.checked)}
              />
              <span className={styles.groupCtaIconWrap} aria-hidden>
                <Users className={styles.groupCtaIcon} />
              </span>
              <span className={styles.groupCtaText}>
                <span className={styles.groupCtaTitle}>Register as a group?</span>
                <span className={styles.groupCtaDescription}>
                  Add colleagues or friends under one company registration. Each person gets their own visitor pass.
                </span>
              </span>
              <span className={styles.groupCtaSwitch} aria-hidden>
                <span className={styles.groupCtaSwitchThumb} />
              </span>
            </label>

            {isGroupRegistration && (
              <div className={styles.groupSection}>
                <h2 className={styles.sectionTitle}>Group Members</h2>
                {errors.group && (
                  <p className={`${styles.formMessage} ${styles.formMessageError}`}>{errors.group}</p>
                )}
                {groupMembers.map((member, index) => {
                  const prefix = `group-${member.id}`;
                  return (
                    <div key={member.id} className={styles.groupMemberBlock}>
                      <div className={styles.groupMemberHeader}>
                        <h3 className={styles.groupMemberTitle}>Person {index + 2}</h3>
                        {groupMembers.length > 1 && (
                          <button
                            type="button"
                            className={styles.groupMemberRemove}
                            onClick={() => removeGroupMember(member.id)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className={styles.formRow}>
                        <EditorialSelect
                          label="Salutation"
                          required
                          options={SALUTATIONS}
                          placeholder="Select"
                          value={member.salutation}
                          onChange={(e) => updateGroupMember(member.id, 'salutation', e.target.value)}
                          error={touched[`${prefix}-salutation`] ? errors[`${prefix}-salutation`] : undefined}
                          onBlur={() => setTouched((t) => ({ ...t, [`${prefix}-salutation`]: true }))}
                        />
                        <EditorialInput
                          label="Full Name"
                          required
                          value={member.name}
                          onChange={(e) => updateGroupMember(member.id, 'name', e.target.value)}
                          error={touched[`${prefix}-name`] ? errors[`${prefix}-name`] : undefined}
                          onBlur={() => setTouched((t) => ({ ...t, [`${prefix}-name`]: true }))}
                          placeholder=""
                        />
                      </div>
                      <EditorialInput
                        label="Email Address"
                        required
                        type="email"
                        value={member.email}
                        onChange={(e) => updateGroupMember(member.id, 'email', e.target.value)}
                        error={touched[`${prefix}-email`] ? errors[`${prefix}-email`] : undefined}
                        onBlur={() => setTouched((t) => ({ ...t, [`${prefix}-email`]: true }))}
                        placeholder=""
                      />
                    </div>
                  );
                })}
                <button type="button" className={styles.addPersonButton} onClick={addGroupMember}>
                  <Plus className={styles.addPersonIcon} aria-hidden />
                  <span>Add another person</span>
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
              textClassName={styles.submitButtonText}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Submitting...'
                : totalVisitors > 1
                  ? `Submit ${totalVisitors} Registrations`
                  : 'Submit Registration'}
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
        isOpen={modalOpen && !isSubmitting}
        phase={modalPhase}
        rows={buildConfirmRows()}
        email={modalPhase === 'success' ? submittedEmail : email.trim()}
        successTitle={submittedCount > 1 ? `${submittedCount} registrations submitted!` : 'Registration submitted!'}
        successMessage={successMessage}
        isSubmitting={isSubmitting}
        error={modalError}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        onSubmitAnother={handleSubmitAnother}
      />

      <SubmissionLoaderModal
        isOpen={modalOpen && isSubmitting}
        totalCount={totalVisitors}
      />
    </main>
  );
}
