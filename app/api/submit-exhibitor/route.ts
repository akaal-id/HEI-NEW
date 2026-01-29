import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe8GOXQ7gZ5U-XlPqsh6XHWBT9_R55lK-hmoDW9RsS00j6INA/formResponse';

// Entry IDs from the HEI 2026 Register Exhibitor form (from prefill URL)
const ENTRY_IDS = {
  salutation: 'entry.1616126882',
  fullName: 'entry.1791207854',
  countryCode: 'entry.98501165',
  mobileNumber: 'entry.1478653272',
  email: 'entry.798505508',
  country: 'entry.618243088',
  companyName: 'entry.1018913174',
  jobTitle: 'entry.1374602454',
  companyAddress: 'entry.576994629',
  businessCategory: 'entry.1121494782',
  marketSector: 'entry.1447272646',
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const formData = new URLSearchParams();
    formData.append(ENTRY_IDS.salutation, body.salutation ?? '');
    formData.append(ENTRY_IDS.fullName, body.fullName ?? '');
    formData.append(ENTRY_IDS.countryCode, body.countryCode ?? '');
    formData.append(ENTRY_IDS.mobileNumber, body.mobileNumber ?? '');
    formData.append(ENTRY_IDS.email, body.email ?? '');
    formData.append(ENTRY_IDS.country, body.country ?? '');
    formData.append(ENTRY_IDS.companyName, body.companyName ?? '');
    formData.append(ENTRY_IDS.jobTitle, body.jobTitle ?? '');
    formData.append(ENTRY_IDS.companyAddress, body.companyAddress ?? '');
    formData.append(ENTRY_IDS.businessCategory, body.businessCategory ?? '');
    formData.append(ENTRY_IDS.marketSector, body.marketSector ?? '');

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
    console.error('Exhibitor form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
