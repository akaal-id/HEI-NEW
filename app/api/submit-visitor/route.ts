import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdANSyfNKuvIMEjWtPWIemQNohvcJEqXkVJOG9BiMtsk6qGyQ/formResponse';

const SUBMISSIONS_PER_SECOND = 1.5;
const DELAY_BETWEEN_MS = Math.ceil(1000 / SUBMISSIONS_PER_SECOND);

// Entry IDs from the HEI 2026 Register Visitor form (from prefill URL)
const ENTRY_IDS = {
  salutation: 'entry.1616126882',
  fullName: 'entry.1791207854',
  countryCode: 'entry.98501165',
  mobileNumber: 'entry.1478653272',
  email: 'entry.798505508',
  country: 'entry.618243088',
  companyName: 'entry.1018913174',
  sourceOfInfo: 'entry.1374602454',
} as const;

type VisitorEntry = {
  salutation: string;
  fullName: string;
  countryCode: string;
  mobileNumber: string;
  email: string;
  country: string;
  companyName: string;
  sourceOfInfo: string;
};

type GroupMemberInput = {
  salutation?: string;
  fullName?: string;
  email?: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildFormData(entry: VisitorEntry) {
  const formData = new URLSearchParams();
  formData.append(ENTRY_IDS.salutation, entry.salutation ?? '');
  formData.append(ENTRY_IDS.fullName, entry.fullName ?? '');
  formData.append(ENTRY_IDS.countryCode, entry.countryCode ?? '');
  formData.append(ENTRY_IDS.mobileNumber, entry.mobileNumber ?? '');
  formData.append(ENTRY_IDS.email, entry.email ?? '');
  formData.append(ENTRY_IDS.country, entry.country ?? '');
  formData.append(ENTRY_IDS.companyName, entry.companyName ?? '');
  formData.append(ENTRY_IDS.sourceOfInfo, entry.sourceOfInfo ?? '');
  return formData;
}

async function submitToGoogleForm(entry: VisitorEntry) {
  const response = await fetch(GOOGLE_FORM_RESPONSE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: buildFormData(entry).toString(),
    redirect: 'manual',
  });
  return response;
}

async function submitToGoogleFormWithRetry(entry: VisitorEntry) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await submitToGoogleForm(entry);
    if (response.ok || response.status === 302) {
      return true;
    }
    if (response.status === 429 && attempt < 2) {
      const retryAfterHeader = response.headers.get('retry-after');
      const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : 1;
      await sleep(Number.isFinite(retryAfterSeconds) ? retryAfterSeconds * 1000 : 1000);
      continue;
    }
    return false;
  }
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const primary: VisitorEntry = {
      salutation: body.salutation ?? '',
      fullName: body.fullName ?? '',
      countryCode: body.countryCode ?? '',
      mobileNumber: body.mobileNumber ?? '',
      email: body.email ?? '',
      country: body.country ?? '',
      companyName: body.companyName ?? '',
      sourceOfInfo: body.sourceOfInfo ?? '',
    };

    const groupMembers: GroupMemberInput[] = Array.isArray(body.groupMembers)
      ? body.groupMembers
      : [];

    const entries: VisitorEntry[] = [
      primary,
      ...groupMembers.map((member) => ({
        ...primary,
        salutation: member.salutation ?? '',
        fullName: member.fullName ?? '',
        email: member.email ?? '',
      })),
    ];

    for (let i = 0; i < entries.length; i++) {
      if (i > 0) {
        await sleep(DELAY_BETWEEN_MS);
      }

      const accepted = await submitToGoogleFormWithRetry(entries[i]);
      if (!accepted) {
        return NextResponse.json(
          { success: false, error: 'Form submission failed' },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ success: true, count: entries.length });
  } catch (error) {
    console.error('Visitor form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
