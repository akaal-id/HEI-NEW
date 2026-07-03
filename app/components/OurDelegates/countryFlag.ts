const COUNTRY_TO_CODE: Record<string, string> = {
  Indonesia: 'ID',
  Bangladesh: 'BD',
  Palestine: 'PS',
  Malaysia: 'MY',
  Iran: 'IR',
  Türkiye: 'TR',
  Turkey: 'TR',
  'Sri Lanka': 'LK',
  Nigeria: 'NG',
  Egypt: 'EG',
  Pakistan: 'PK',
  India: 'IN',
  Uzbekistan: 'UZ',
  Djibouti: 'DJ',
  Kenya: 'KE',
  'United States': 'US',
  USA: 'US',
};

function codeToFlagEmoji(code: string): string {
  if (code.length !== 2) return '';
  const upper = code.toUpperCase();
  return String.fromCodePoint(
    ...[...upper].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65)
  );
}

/** Returns a flag emoji for a country name, or empty string if unknown / blank. */
export function getCountryFlag(country: string): string {
  const trimmed = country.trim();
  if (!trimmed || trimmed === 'Other') return '';
  const code = COUNTRY_TO_CODE[trimmed];
  return code ? codeToFlagEmoji(code) : '';
}
