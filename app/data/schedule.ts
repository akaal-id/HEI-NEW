// HEI 2026 (D8 Halal Expo Indonesia) — Event Schedule Data
// Auto-generated from HEI_Program_rlsd.xlsx ("HEI TALK Agenda", "CulFest Agenda",
// "GRAND SCHEDULE" sheets) on 3 July 2026.
//
// IMPORTANT: This is the single source of truth for all schedule content on the site.
// Components must import from this file only — do not hardcode schedule data in JSX.
//
// A few source rows had messy/inconsistent data entry (see comments inline below where
// a value was manually cleaned up). If the source spreadsheet is updated, re-run the
// conversion and spot-check against the notes in the accompanying prompt.

export type ScheduleTrack =
  | "hei-talk"
  | "cultural-festival"
  | "business-matching"
  | "business-lounge";

export type ScheduleStatus = "confirmed" | "to-be-confirmed";

export interface ScheduleItem {
  id: string;
  track: ScheduleTrack;
  agendaName: string;
  day: string;         // e.g. "Wednesday"
  date: string;         // e.g. "8 July 2026"
  time: string;         // e.g. "13.00 - 15.00 WIB"
  performers: string[]; // speaker / performer / country / role — may be empty for open/unbooked slots
  host?: string;         // cultural festival host/MC, when specified in the source
  status: ScheduleStatus;
}

// ---------------------------------------------------------------------------
// HEI TALK — parsed from the "HEI TALK Agenda" sheet
// ---------------------------------------------------------------------------
export const heiTalkSchedule: ScheduleItem[] = [
  {
    "id": "ht-01",
    "track": "hei-talk",
    "agendaName": "OPENING HEI",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "09.00 - 10.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-02",
    "track": "hei-talk",
    "agendaName": "Why Halal Economy in Indonesia's D-8 Chairmanship",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "13.00 - 15.00",
    "performers": [
      "Special Staff to The Minister of Foreign Affairs for Strengthening Multilateral Issue Policy — Tri Tharyat",
      "Director of Inter-Regional Negotiations and International Organizations, Ministry of Trade",
      "Director of Business and Enterpreunership, KNEKS — Putu Rahwidhiyasa",
      "Chairman Standing Committee D8 & ICCD, KADIN — Irawati Hermawan",
      "Moderator: Ministry of Foreign Affairs — Adkhilni Mudkhola Sidqi, Diplomat Ahli Madya Kementerian Luar Negeri"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-03",
    "track": "hei-talk",
    "agendaName": "Driving Social Impact through Islamic Ultra Micro Financing for Rural and Women",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "15.30 - 16.30",
    "performers": [
      "CEO of PT. PNM, Indonesia — Bapak Lalu Dodot Patria Ary Direktur Operasional dan Hubungan Kelembagaan PT PNM",
      "CEO of Lembaga Pemegang Amanah Ikhtiar, Malaysia",
      "Dr. Muhammad Amjad Saqib – Founder & Chairman of Akhuwat, Pakistan",
      "Moderator : Director of Center for Islamic Economics and Business (PEBS), Universitas Indonesia — Ibu Rachmatina"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-04",
    "track": "hei-talk",
    "agendaName": "Driving the Future of Global Halal Trade: Strategic Synergies Between Indonesia, Pakistan and Iran",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "09.00 – 10.30",
    "performers": [
      "His Exellency Ambassador of Pakistan — H.E. Zahid Hafeez Chaudhri",
      "His Exellency Ambassador of Iran — H.E. Mohammad Boroujerdi",
      "COO of Sinarmas Group — Harry Hanawi",
      "Moderator: Head of CSED INDEF — Prof. Akhmad Affandi Mahfudz (Prof. Affandi)"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-05",
    "track": "hei-talk",
    "agendaName": "Halal Critical Raw Material Innovation",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "10.30 - 12.00",
    "performers": [
      "IPB University — Prof Mala Nurilmala",
      "Direktur Produksi PT Phapros Tbk — Ida Rahmi Kurniasih",
      "Direktur Investasi dan Ekonomi Kreatif, Kementerian Luar Negeri — Royhan Nevy Wahab",
      "Moderator : Umar Aditiawarman — Umar Aditiawarman"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-06",
    "track": "hei-talk",
    "agendaName": "TBA",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "13.00 – 14.30",
    "performers": [
      "BSI SESSION (TBC For Speakers)"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-07",
    "track": "hei-talk",
    "agendaName": "Driving the Future of Global Halal Trade: Strategic Synergies between Indonesia, Türkiye and Azerbaijan",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "16.00 – 17.30",
    "performers": [
      "His Exellency Ambassador of Turkiye — Konfirmasi Hadir",
      "His Exellency Ambassador of Azerbaijan — Ambassador Mr. Ramil Ryazev",
      "President Director of PT. Indofood, Tbk",
      "Moderator: Director of CIBEST-IPB — Prof. Dr. Irfan Syauqi Beik, S.P., M.Sc.Ec"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-08",
    "track": "hei-talk",
    "agendaName": "Unlocking Blended Financing in D-8 through CWLS and CWLD",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "09.30 – 11.00",
    "performers": [
      "Head of Islamic Economy and Finance Departemen, BI — Pak Dadang Muljawan - Kepala DEKS BI",
      "Head of Development Capital Market, OJK",
      "Director of Islamic Social Finance, KNEKS — Dwi Irianti Hadiningtyas",
      "Chairman & Independent Director, Social Islami Bank PLC",
      "Moderator: Mhd. Iqbal Balative (DJPPR) — hadir"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-09",
    "track": "hei-talk",
    "agendaName": "JUMMAAH PRAY",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "11.00 – 13.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-10",
    "track": "hei-talk",
    "agendaName": "Driving the Future of Global Halal Trade & Economy Intra D-8: Lesson Learn From Malaysia, dan Bangladesh",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "13.30 – 15.00",
    "performers": [
      "His Exellency Ambassador of Malaysia — Konfirmasi Hadir",
      "His Exellency Ambassador of Nigeria",
      "Group CEO ParagonCorp /Biofarma",
      "Moderator:Head of CSED INDEF — Konfirmasi hadir"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-11",
    "track": "hei-talk",
    "agendaName": "Developing Muslim-Friendly Tourism for Sustainable Economic Growth in D-8",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "16.00 - 17.30",
    "performers": [
      "CEO & Founder Crescentrating — Tawfiq Salam Ikhtianto - Head of Research and Capacity Buidling",
      "Expert Staff to the Minister for Digital Transformation and Tourism Innovation, Ministry of Tourism — hadir",
      "Managing Director Artotel Group",
      "Moderator: Umar Aditiawarman, Ph.D — Hadir"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-12",
    "track": "hei-talk",
    "agendaName": "Reviving Investment & Business Ethic to redefine future Halal Intelligent",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "18.30 - 20.00",
    "performers": [
      "Inspigo — 1. Tyo Guritno",
      "Muslim Capital Club — 2. Abdelbasset Ouissa",
      "Muslim Capital Club — 3.Ramzi Qane",
      "Proposed Moderator"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-13",
    "track": "hei-talk",
    "agendaName": "FORUM WAKAF PRODUKTIF : Youth-Powered Development: Mobilising Talent, Faith-Based Finance, and Green Innovation for Shared Prosperity",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "09.00 - 10.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-14",
    "track": "hei-talk",
    "agendaName": "Halal Youth & Passion as Entrepreneurs (HYPE)",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "10.30 – 12.00",
    "performers": [
      "Chairman of BPP HIPMI — 1. Ade Jona Prasetyo",
      "Chairman Of Banom BPP HIPMI Syariah — 2. TB. Iman Taufik",
      "CEO Moria Fund — 3.Musab Mazen Bin Nusair",
      "Moderator : Literature & Education Division HIPMI Syariah — Noviyanti Setiyaningsih-"
    ],
    "status": "confirmed"
  },
  {
    "id": "ht-15",
    "track": "hei-talk",
    "agendaName": "KATADATA : The state of Halal & Sharia Economy in Indonesia : Dari Pasar Terbesart menuju Pusat Ekonomi Syariah Dunia",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "13.00 - 15.00",
    "performers": [
      "Analyst Assistant Manager Katadata Insight Center — Hanif Gusman",
      "KNEKS",
      "Ekonom Syariah Senior",
      "Moderator: Manager of Databoks by Katadata — Jamalianuri"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-16",
    "track": "hei-talk",
    "agendaName": "D-8 in a Changing Global Order: Strengthening Cooperation for a Resilient Future",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "16.00 - 17.30",
    "performers": [
      "Dean of Faculty of Social Sciences, Indonesian International Islamic University (UIII) — Mr. Philips J. Vermonte",
      "Representative from the Ministry of Foreign Affairs of the Republic of Indonesia",
      "Representative from a D-8 Member State Embassy (Non-Indonesian Diplomat)",
      "Founder of SiPalingHI! Media — Moderator: Rafliansyah"
    ],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-17",
    "track": "hei-talk",
    "agendaName": "BPKH : Haji Muda",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "09.00 - 10.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-18",
    "track": "hei-talk",
    "agendaName": "Talent Maping",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "10.30 - 12.00",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "ht-19",
    "track": "hei-talk",
    "agendaName": "Creating Value Through Halal Travel Entrepreneurship",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "13.00 – 15.00",
    "performers": [
      "Bena Kribo",
      "Islamic Tourism Malaysia : Hurin Ain binti Mohd Noor Assistant Executive, Industry Development Division Islamic Tourism Malaysia",
      "Rohayat Binti Din Senior Director of Sales & Marketing Lotus Resort & HotelS",
      "Moderator"
    ],
    "status": "to-be-confirmed"
  }
];

// ---------------------------------------------------------------------------
// D8 HEI CULTURAL FESTIVAL — parsed from the "CulFest Agenda" sheet
// ---------------------------------------------------------------------------
export const culturalFestivalSchedule: ScheduleItem[] = [
  {
    "id": "cf-01",
    "track": "cultural-festival",
    "agendaName": "OPENING CEREMONY",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "09.00 - 10.30",
    "performers": [
      "TARI PIRING & TABUH GENDANG"
    ],
    "status": "to-be-confirmed",
    "host": "MS. Nadira Livi"
  },
  {
    "id": "cf-02",
    "track": "cultural-festival",
    "agendaName": "13.30 - 14.30 Tarian -Palestine (60')",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "13.30 - 14.00",
    "performers": [
      "PALESTINE EMBASSY"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-03",
    "track": "cultural-festival",
    "agendaName": "Kajian Ustadz - Fast Life, Slow Iman ?",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "16.00 - 17.30",
    "performers": [
      "HABIB ISA ALKAFF"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-04",
    "track": "cultural-festival",
    "agendaName": "SESSION 5 - Open for Cultural Performance (D-8)",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "19.15 - 20.00",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-05",
    "track": "cultural-festival",
    "agendaName": "SESSION 1 - Open For Cultural Performance (D-8)",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "10.00 - 11.45",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-06",
    "track": "cultural-festival",
    "agendaName": "Kajian Ustadz",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "13.00 - 14.30",
    "performers": [
      "Syekh Faris Baswedan"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-07",
    "track": "cultural-festival",
    "agendaName": "SESSION 4",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "16.00 - 16.15",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-08",
    "track": "cultural-festival",
    "agendaName": "SESSION 5 - Culinary and cooking",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "16.30 - 17.30",
    "performers": [
      "Iran - Cultural Counsellor of Embassy of I.R. of IRAN"
    ],
    "status": "confirmed",
    "host": "MC"
  },
  {
    "id": "cf-09",
    "track": "cultural-festival",
    "agendaName": "*YOUTH PROGRAM SIPALINGHI - D-8 Youth Perspective: Voices Beyond Borders",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "18.45 - 20.00",
    "performers": [
      "Speakers 1. Astrid Nadya Rizqita, President of OIC Youth Indonesia 2. Amina Uuroj MA in Political Science student, Faculty of Social Science (FOSS) UIII from Pakistan 3. Eslam El-Sheikh, Master of Public Policy on Climate Change student, Faculty of Social Science (FOSS) UIII from Egypt"
    ],
    "status": "confirmed",
    "host": "Rafliansyah, Founder of SiPalingHI! (Media & Academy)"
  },
  {
    "id": "cf-10",
    "track": "cultural-festival",
    "agendaName": "SESSION 1 - Open for Cultural Performance (D-8)",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "09.00 - 09.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-11",
    "track": "cultural-festival",
    "agendaName": "DELTA FOODS COOKING DEMO (90')",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "13.30 - 15.00",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "cf-12",
    "track": "cultural-festival",
    "agendaName": "16.00 - 16.15 Saman Performance — SESSION 5",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "16.00 - 17.30",
    "performers": [
      "SMAN 35"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-13",
    "track": "cultural-festival",
    "agendaName": "SESSION 6 - Open for Cultural Performance (D-8)",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "19.15 - 20.00",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-14",
    "track": "cultural-festival",
    "agendaName": "SESSION 1 - Proposing : Waste Management",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "09.00 - 10.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-15",
    "track": "cultural-festival",
    "agendaName": "Cooking Demo",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "10.30 – 12.00",
    "performers": [
      "kedai Nasi Lemak Waleed"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-16",
    "track": "cultural-festival",
    "agendaName": "Pakistan Fashion show",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "13.00 - 14.00",
    "performers": [
      "PAKISTAN EMBASSY"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-17",
    "track": "cultural-festival",
    "agendaName": "SESSION 4",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "14.00 - 15.00",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-18",
    "track": "cultural-festival",
    "agendaName": "Angklung Srikandi Kemuning Lagu yg akan dibawakan : 1. Koyo Jogyakarta 2. Hujan Gerimis 3. Sayang 4. Kemuning — Tarian : 1. Mapadendang 2. Lancangkuning",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "16.00 - 17.45",
    "performers": [
      "KUL-IND"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-19",
    "track": "cultural-festival",
    "agendaName": "SESSION 7 - RAMPAK BEDUG (TBC)",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "19.15- 20.00",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-20",
    "track": "cultural-festival",
    "agendaName": "TALK SHOW - Tema : Women's Role in the Halal Economy Empowering Women to Drive Innovation, Inclusion, and Sustainable Growth",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "09.00 - 10.30",
    "performers": [
      "DR. Syifa Fauzia (90')"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-21",
    "track": "cultural-festival",
    "agendaName": "SESSION 2 - Art and Crafts & Interactive Games - Open for Cultural Performance",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "10.30 - 12.00",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-22",
    "track": "cultural-festival",
    "agendaName": "SESSION 3 - Interactive Games (15\")",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "13.00 – 14.30",
    "performers": [],
    "status": "to-be-confirmed"
  },
  {
    "id": "cf-23",
    "track": "cultural-festival",
    "agendaName": "SESSION 4 - TALK SHOW",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "14.30 – 15.00",
    "performers": [
      "JULEHA (75\")"
    ],
    "status": "to-be-confirmed",
    "host": "KNEKS-HIPMI"
  },
  {
    "id": "cf-24",
    "track": "cultural-festival",
    "agendaName": "Menggapai solusi dan rejeki yg halal dan mudah",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "16.00 - 17.45",
    "performers": [
      "Ustad Indra Firmansyah"
    ],
    "status": "confirmed"
  },
  {
    "id": "cf-25",
    "track": "cultural-festival",
    "agendaName": "SESSION 7 - CLOSING",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "19.15 - 20.00",
    "performers": [
      "Akustik bamboo percussion"
    ],
    "status": "to-be-confirmed"
  }
];

// ---------------------------------------------------------------------------
// BUSINESS MATCHING — derived from the "GRAND SCHEDULE" sheet (one flowing
// session per day; the source sheet repeats the same label across every
// time-slot row for the day, so this collapses that into a single day-span entry)
// ---------------------------------------------------------------------------
export const businessMatchingSchedule: ScheduleItem[] = [
  {
    "id": "bm-01",
    "track": "business-matching",
    "agendaName": "One-on-One Business Matching Session (Flowing)",
    "day": "Wednesday",
    "date": "8 July 2026",
    "time": "13.30 - 20.00",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bm-02",
    "track": "business-matching",
    "agendaName": "One-on-One Business Matching Session (Flowing)",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "09.00 - 20.00",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bm-03",
    "track": "business-matching",
    "agendaName": "One-on-One Business Matching Session (Flowing)",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "09.30 - 20.00",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bm-04",
    "track": "business-matching",
    "agendaName": "One-on-One Business Matching Session (Flowing)",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "09.00 - 20.00",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bm-05",
    "track": "business-matching",
    "agendaName": "One-on-One Business Matching Session (Flowing)",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "09.00 - 20.00",
    "performers": [],
    "status": "confirmed"
  }
];

// ---------------------------------------------------------------------------
// BUSINESS LOUNGE — derived from the "GRAND SCHEDULE" sheet
// ---------------------------------------------------------------------------
export const businessLoungeSchedule: ScheduleItem[] = [
  {
    "id": "bl-01",
    "track": "business-lounge",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "10.30 - 12.00",
    "agendaName": "Delegation Meeting (Open Schedule)",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bl-02",
    "track": "business-lounge",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "13.00 – 14.30",
    "agendaName": "BSI",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bl-03",
    "track": "business-lounge",
    "day": "Thursday",
    "date": "9 July 2026",
    "time": "18.30 - 20.00",
    "agendaName": "BSI",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bl-04",
    "track": "business-lounge",
    "day": "Friday",
    "date": "10 July 2026",
    "time": "13.30 – 15.00",
    "agendaName": "Delegation Meeting (Turkey)",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bl-05",
    "track": "business-lounge",
    "day": "Saturday",
    "date": "11 July 2026",
    "time": "10.30 – 12.00",
    "agendaName": "Delegation Meeting (Open Schedule)",
    "performers": [],
    "status": "confirmed"
  },
  {
    "id": "bl-06",
    "track": "business-lounge",
    "day": "Sunday",
    "date": "12 July 2026",
    "time": "10.30 - 12.00",
    "agendaName": "Delegation Meeting (Open Schedule)",
    "performers": [],
    "status": "confirmed"
  }
];

// ---------------------------------------------------------------------------
// GRAND SCHEDULE — derived (not separately parsed) from the four arrays above,
// so it can never drift out of sync with HEI Talk / Cultural Festival / Business
// Matching / Business Lounge. Merge + sort chronologically by date then start time.
// ---------------------------------------------------------------------------

function parseSortKey(item: ScheduleItem): number {
  // date is formatted like "8 July 2026"; time like "13.00 - 15.00" or "09.00 – 10.30"
  const dateMs = Date.parse(item.date) || 0;
  const startTimeRaw = item.time.split(/[–-]/)[0].trim(); // "13.00"
  const [h, m] = startTimeRaw.split(".").map((n) => parseInt(n, 10) || 0);
  return dateMs + (h * 60 + m) * 60 * 1000;
}

export const grandSchedule: ScheduleItem[] = [
  ...heiTalkSchedule,
  ...culturalFestivalSchedule,
  ...businessMatchingSchedule,
  ...businessLoungeSchedule,
].sort((a, b) => parseSortKey(a) - parseSortKey(b));