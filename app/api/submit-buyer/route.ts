import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf7SvdkCx2BMbRN46twBF1NCBCY_joYbwTEvvU9uJ9T8Q2mJQ/formResponse';

// Entry IDs from the HEI 2026 Register Buyer form (from prefill URL)
const ENTRY_IDS = {
  interest: 'entry.269312168',
  salutation: 'entry.1991638139',
  fullName: 'entry.1934559686',
  countryCode: 'entry.285454750',
  mobileNumber: 'entry.933067454',
  email: 'entry.1465173196',
  country: 'entry.1707425376',
  companyName: 'entry.1689011549',
  sourceOfInfo: 'entry.1384552284',
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const formData = new URLSearchParams();
    formData.append(ENTRY_IDS.interest, body.interest ?? '');
    formData.append(ENTRY_IDS.salutation, body.salutation ?? '');
    formData.append(ENTRY_IDS.fullName, body.fullName ?? '');
    formData.append(ENTRY_IDS.countryCode, body.countryCode ?? '');
    formData.append(ENTRY_IDS.mobileNumber, body.mobileNumber ?? '');
    formData.append(ENTRY_IDS.email, body.email ?? '');
    formData.append(ENTRY_IDS.country, body.country ?? '');
    formData.append(ENTRY_IDS.companyName, body.companyName ?? '');
    formData.append(ENTRY_IDS.sourceOfInfo, body.sourceOfInfo ?? '');

    const response = await fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      redirect: 'manual',
    });

    // Google Forms often returns 200 or 302 on success; 4xx/5xx = failure
    const accepted = response.ok || response.status === 302;
    if (!accepted) {
      return NextResponse.json(
        { success: false, error: 'Form submission failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Buyer form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
