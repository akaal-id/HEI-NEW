import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfVByHkDaaZtPtd2KBViMCWjIcdjcXj5wia8i6rlurjZXI-7g/formResponse';

// Entry IDs from the D-8 HEI CulFest Register Visitor form (from prefill URL)
const ENTRY_IDS = {
  fullName: 'entry.1791207854',
  countryCode: 'entry.98501165',
  mobileNumber: 'entry.1478653272',
  email: 'entry.798505508',
  birthDate: 'entry.1018913174',
  gender: 'entry.1240868622',
  sourceOfInfo: 'entry.1374602454',
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const formData = new URLSearchParams();
    formData.append(ENTRY_IDS.fullName, body.fullName ?? '');
    formData.append(ENTRY_IDS.countryCode, body.countryCode ?? '');
    formData.append(ENTRY_IDS.mobileNumber, body.mobileNumber ?? '');
    formData.append(ENTRY_IDS.email, body.email ?? '');
    formData.append(ENTRY_IDS.birthDate, body.birthDate ?? '');
    formData.append(ENTRY_IDS.gender, body.gender ?? '');
    formData.append(ENTRY_IDS.sourceOfInfo, body.sourceOfInfo ?? '');

    const response = await fetch(GOOGLE_FORM_RESPONSE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      redirect: 'manual',
    });

    const accepted = response.ok || response.status === 302;
    if (!accepted) {
      return NextResponse.json(
        { success: false, error: 'Form submission failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CulFest visitor form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
