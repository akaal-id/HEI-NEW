import { useState } from 'react';

const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfO7l875BGC0CMFDhbQRwtiQL6pgA-8vtK8uSaFkhr6fyK8Vw/formResponse';
const EMAIL_ENTRY_ID = 'entry.77618089';

export function useGoogleForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    const formData = new FormData();
    formData.append(EMAIL_ENTRY_ID, email);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // Essential for Google Forms
        body: formData,
      });
      // Since no-cors returns opaque response, we assume success if no network error
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setEmail('');
  };

  return {
    email,
    setEmail,
    status,
    handleSubmit,
    resetForm,
  };
}

