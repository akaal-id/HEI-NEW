'use client';

import { useState } from 'react';
import {
  EditorialInput,
  EditorialSelect,
  EditorialTextarea,
} from '../../components/ui/editorial-form';
import Button from '../../components/Button/Button';
import {
  SALUTATIONS,
  COUNTRY_CODES,
  COUNTRIES,
  JOB_TITLES,
  BUSINESS_CATEGORIES,
  MARKET_SECTORS,
  EMAIL_REGEX,
} from '../../lib/registration-data';
import styles from '../RegisterPage.module.css';

export default function RegisterExhibitorPage() {
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleOther, setJobTitleOther] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [marketSector, setMarketSector] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    setTouched({
      salutation: true, name: true, mobile: true, email: true, country: true,
      companyName: true, jobTitle: true, jobTitleOther: true, companyAddress: true,
      businessCategory: true, marketSector: true,
    });
    const next: Record<string, string> = {};
    if (!salutation) next.salutation = 'Required';
    if (!name?.trim()) next.name = 'Required';
    if (!mobile?.trim()) next.mobile = 'Required';
    else if (mobile.replace(/\D/g, '').length < 9) next.mobile = 'Minimum 9 digits';
    if (!email?.trim()) next.email = 'Required';
    else if (!EMAIL_REGEX.test(email)) next.email = 'Invalid email address';
    if (!country) next.country = 'Required';
    if (!companyName?.trim()) next.companyName = 'Required';
    if (!jobTitle) next.jobTitle = 'Required';
    if (jobTitle === 'Other' && !jobTitleOther?.trim()) next.jobTitleOther = 'Please specify';
    if (!companyAddress?.trim()) next.companyAddress = 'Required';
    if (!businessCategory) next.businessCategory = 'Required';
    if (!marketSector) next.marketSector = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    alert('Registration form submitted (demo).');
  };

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Register as Exhibitor</h1>
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
                <EditorialSelect
                  label="Country Code"
                  required
                  options={COUNTRY_CODES}
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                />
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
              <EditorialSelect
                label="Country"
                required
                options={COUNTRIES}
                placeholder="Select country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                error={touched.country ? errors.country : undefined}
                onBlur={() => setTouched((t) => ({ ...t, country: true }))}
              />
            </div>

            <div className={styles.formBlock}>
              <h2 className={styles.sectionTitle}>Company</h2>
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
                  label="Job Title"
                  required
                  options={JOB_TITLES}
                  placeholder="Select"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  error={touched.jobTitle ? errors.jobTitle : undefined}
                  onBlur={() => setTouched((t) => ({ ...t, jobTitle: true }))}
                />
                {jobTitle === 'Other' && (
                  <div className={styles.jobTitleOtherBlock}>
                    <EditorialInput
                      label="Specify Job Title"
                      required
                      value={jobTitleOther}
                      onChange={(e) => setJobTitleOther(e.target.value)}
                      error={touched.jobTitleOther ? errors.jobTitleOther : undefined}
                      onBlur={() => setTouched((t) => ({ ...t, jobTitleOther: true }))}
                      placeholder=""
                    />
                  </div>
                )}
              </div>
              <EditorialTextarea
                label="Company Address"
                required
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                error={touched.companyAddress ? errors.companyAddress : undefined}
                onBlur={() => setTouched((t) => ({ ...t, companyAddress: true }))}
                placeholder=""
                rows={4}
              />
              <EditorialSelect
                label="Business Category"
                required
                options={BUSINESS_CATEGORIES}
                placeholder="Select"
                value={businessCategory}
                onChange={(e) => setBusinessCategory(e.target.value)}
                error={touched.businessCategory ? errors.businessCategory : undefined}
                onBlur={() => setTouched((t) => ({ ...t, businessCategory: true }))}
              />
              <EditorialSelect
                label="Market Sector of Interest"
                required
                options={MARKET_SECTORS}
                placeholder="Select"
                value={marketSector}
                onChange={(e) => setMarketSector(e.target.value)}
                error={touched.marketSector ? errors.marketSector : undefined}
                onBlur={() => setTouched((t) => ({ ...t, marketSector: true }))}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
              textClassName={styles.submitButtonText}
            >
              Submit Registration
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
