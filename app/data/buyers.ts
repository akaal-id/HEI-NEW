// data/buyers.ts
// Auto-extracted from List_Buyers_3_July.pdf (D-8 Halal Expo Indonesia 2026)
// Edit freely — add/remove/reorder entries, this is the single source of truth
// for the "Our Delegates" > Buyers tab (used on both the homepage section and
// the full /our-delegates page).
//
// DATA QUALITY NOTE: rows #8, #24, #25 and #26 in the source PDF have a
// right-to-left (Arabic) name that broke the PDF's text/column extraction.
// They're included below with the most likely reading, flagged with TODO —
// please cross-check these four against the original PDF before publishing.

export type AttendanceStatus = "Confirmed" | "Pending Confirmation" | "Not Attending";

export interface Buyer {
  name: string;
  country: string;
  companyName: string;
  attendanceStatus: AttendanceStatus;
}

export const BUYERS: Buyer[] = [
  { name: "MD Abdul Mannan", country: "Bangladesh", companyName: "Bengal Trade International", attendanceStatus: "Pending Confirmation" },
  { name: "Isfandiyor Sabohi", country: "Uzbekistan", companyName: "Blockchain News Co., Ltd", attendanceStatus: "Pending Confirmation" },
  { name: "K M Zakir Khan", country: "Bangladesh", companyName: "K M Corporation", attendanceStatus: "Not Attending" },
  { name: "Putri Nurazizah Effendi", country: "Türkiye", companyName: "Goldmar", attendanceStatus: "Pending Confirmation" },
  { name: "Md Sumon Rahman", country: "Bangladesh", companyName: "Moyurpongkhi International", attendanceStatus: "Pending Confirmation" },
  { name: "Morka Esayas Mulatu", country: "Djibouti", companyName: "R&E General Trading FZCO", attendanceStatus: "Pending Confirmation" },
  { name: "Md Samiul Hasan", country: "Bangladesh", companyName: "Victoria Tour", attendanceStatus: "Pending Confirmation" },
  { name: "Al-Shirbini Muhammad Al-Shirbini Afandi", country: "Egypt", companyName: "Al-Ittihad Qutn Brand", attendanceStatus: "Pending Confirmation" }, // source row #8
  { name: "Wael Khairy Yones", country: "Egypt", companyName: "Ascend Business Solutions", attendanceStatus: "Pending Confirmation" },
  { name: "Manzoor Ilahi", country: "Pakistan", companyName: "Rabbani Enterprises Private Limited", attendanceStatus: "Pending Confirmation" },
  { name: "Muhammad Ansar Mehmood", country: "Pakistan", companyName: "ATS Engineering Sales & Services", attendanceStatus: "Pending Confirmation" },
  { name: "Neslihan Çetin", country: "Türkiye", companyName: "Altin Zambak", attendanceStatus: "Pending Confirmation" },
  { name: "Mustafa Şahin", country: "Türkiye", companyName: "Goldmar Ithalat Ihracat ve Ticaret A.Ş.", attendanceStatus: "Pending Confirmation" },
  { name: "Bonventure Oduor Otieno", country: "Kenya", companyName: "Nelumbo Nucifera Limited", attendanceStatus: "Pending Confirmation" },
  { name: "Muhammad Abdul Rahim Abdul Razzack", country: "India", companyName: "Mufara Global Trading", attendanceStatus: "Pending Confirmation" },
  { name: "Abdul Raheem Abdul Kader", country: "India", companyName: "Mufara Global Trading", attendanceStatus: "Pending Confirmation" },
  { name: "Abdul Wahab", country: "United States", companyName: "A W Enterprise", attendanceStatus: "Pending Confirmation" },
  { name: "Md Monir Hossain", country: "Bangladesh", companyName: "PT. Nature Nexus Events", attendanceStatus: "Pending Confirmation" },
  { name: "MD Monzur Alam", country: "Bangladesh", companyName: "Virtuous Export Import Company Limited", attendanceStatus: "Pending Confirmation" },
  { name: "Moniruzzaman Hira", country: "Bangladesh", companyName: "PT. Nature Nexus Events", attendanceStatus: "Pending Confirmation" },
  { name: "Muhammadu Dikko Ladan", country: "Nigeria", companyName: "Dar Al Halal Nigeria Limited", attendanceStatus: "Pending Confirmation" },
  { name: "Farhan Ullah", country: "Pakistan", companyName: "Nutrabioses Pvt Ltd", attendanceStatus: "Pending Confirmation" },
  { name: "Hammal Hoth", country: "Pakistan", companyName: "Hoth Traders", attendanceStatus: "Pending Confirmation" },
  { name: "Arif Hussain Siddiqi", country: "Pakistan", companyName: "ICON Corporation", attendanceStatus: "Pending Confirmation" }, // source row #24 — country/company alignment with row #25 is ambiguous in source PDF, verify
  { name: "Talat Sabeen", country: "Pakistan", companyName: "ICON Corporation", attendanceStatus: "Pending Confirmation" }, // source row #25 — see note above
  { name: "Javed Akbar", country: "Pakistan", companyName: "My Chicken and More", attendanceStatus: "Pending Confirmation" },
  { name: "Adamu Wudil Ahmed", country: "Nigeria", companyName: "AAA & Associates Nigeria Limited", attendanceStatus: "Pending Confirmation" },
  { name: "Ado Ismail Sabo", country: "Nigeria", companyName: "Soulmate Global Trading SDN BHD", attendanceStatus: "Pending Confirmation" },
  { name: "M Tahir Khan", country: "Pakistan", companyName: "Harmann Pharmaceutical Laboratories", attendanceStatus: "Pending Confirmation" },
  { name: "Sajjad Wali", country: "Pakistan", companyName: "Sky Kraft Private Limited", attendanceStatus: "Pending Confirmation" },
  { name: "Md Raihan Jamil", country: "Bangladesh", companyName: "New Jamil Lighting", attendanceStatus: "Pending Confirmation" },
  { name: "Jan Muhammad Khan", country: "Pakistan", companyName: "SN Steel", attendanceStatus: "Confirmed" },
  { name: "Arif Firdaus", country: "Indonesia", companyName: "Dubai Chamber", attendanceStatus: "Confirmed" },
  { name: "Indra Aris Oktariawan", country: "Indonesia", companyName: "Muda Visioner Penggerak Nasional", attendanceStatus: "Confirmed" },
  { name: "M. Mulky Syaifani Lazuardy", country: "Indonesia", companyName: "Muda Visioner Penggerak Nasional", attendanceStatus: "Confirmed" },
  { name: "Mella Nurmalia", country: "Indonesia", companyName: "Muda Visioner Penggerak Nasional", attendanceStatus: "Confirmed" },
  { name: "Meyrist Situngkir", country: "Indonesia", companyName: "Digitravia", attendanceStatus: "Confirmed" },
  { name: "Nurul Isnaeni", country: "Indonesia", companyName: "Dubai Chambers", attendanceStatus: "Confirmed" },
  { name: "Susanty", country: "Indonesia", companyName: "UMKM Go Export Sukabumi", attendanceStatus: "Confirmed" },
  { name: "Wibowo", country: "Indonesia", companyName: "Kreatif Solusi Jaaya", attendanceStatus: "Confirmed" },
  { name: "Intan Rezeki", country: "Indonesia", companyName: "UMKM Tabonnai Snackq", attendanceStatus: "Confirmed" },
  { name: "Siti Hamidah", country: "Indonesia", companyName: "Sila Butik Batik", attendanceStatus: "Confirmed" },
  { name: "Elva Erina", country: "Indonesia", companyName: "PT JI", attendanceStatus: "Confirmed" },
  { name: "Herri Setiawan", country: "Indonesia", companyName: "Wakaf Warrior", attendanceStatus: "Confirmed" },
  { name: "Elin Herliana", country: "Indonesia", companyName: "UD Dinamis", attendanceStatus: "Confirmed" },
  { name: "Hendratmoko", country: "Indonesia", companyName: "IHS Multi", attendanceStatus: "Confirmed" },
  { name: "Samir", country: "Indonesia", companyName: "Raja Kurma Indonesia", attendanceStatus: "Confirmed" },
  { name: "Richard Eyben Royke Umboh", country: "Indonesia", companyName: "Hermins Herbafood Indonesia", attendanceStatus: "Confirmed" },
  { name: "Umar Adil Farouk Nahdi", country: "Indonesia", companyName: "Raja Kurma Indonesia", attendanceStatus: "Confirmed" },
  { name: "Abdul Hakim Thalib", country: "Indonesia", companyName: "Raja Kurma Indonesia", attendanceStatus: "Confirmed" },
  { name: "Syamsul Irawan", country: "Indonesia", companyName: "PT Laya Jivana Trading", attendanceStatus: "Confirmed" },
  { name: "Dhoqi Dofiri", country: "Indonesia", companyName: "PT. Dhodo Web Developer", attendanceStatus: "Confirmed" },
  { name: "Lusi Wilyastuti", country: "Indonesia", companyName: "Stratedgemarketing", attendanceStatus: "Confirmed" },
  { name: "Dewiastuti Kinasih", country: "Indonesia", companyName: "PT. KAS", attendanceStatus: "Confirmed" },
  { name: "Widji Adhi", country: "Indonesia", companyName: "Ammana", attendanceStatus: "Confirmed" },
  { name: "Firly Andini", country: "Indonesia", companyName: "Dapur Jawa and Co.", attendanceStatus: "Confirmed" },
  { name: "Teguh Rahayu", country: "Indonesia", companyName: "Karya Mandiri", attendanceStatus: "Confirmed" },
  { name: "Aep Saepudin Sutarlan", country: "Indonesia", companyName: "PT Media Bisnis KBB", attendanceStatus: "Confirmed" },
  { name: "Aziz Mutaqin", country: "Indonesia", companyName: "PT. Eizem Indonesia", attendanceStatus: "Confirmed" },
  { name: "Irfat Hista Saputra", country: "Indonesia", companyName: "PT Karya Daya Syafarmasi, PT Karya Daya Saintifik dan PT Lab Service International Indonesia", attendanceStatus: "Confirmed" },
];
