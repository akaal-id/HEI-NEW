// data/exhibitors.ts
// Auto-extracted from LIST_EXHIBITOR.pdf (D-8 Halal Expo Indonesia 2026)
// Edit freely — add/remove/reorder entries, this is the single source of truth
// for the "Our Delegates" > Exhibitors tab (used on both the homepage section
// and the full /our-delegates page).

export type ExhibitorZone = "Indoor" | "Special Booth" | "Outdoor" | "Food Truck";

export interface Exhibitor {
  /** Booth number as printed on the floor plan, e.g. "22-23" */
  boothNumber: string;
  /** Company / fascia name */
  companyName: string;
  /**
   * Country of origin. Left blank ("") where the source PDF did not specify
   * a country — fill these in manually. A few were inferable from the fascia
   * name itself (e.g. "IRAN PAVILION") and have been pre-filled.
   */
  country: string;
  /** Which floor-plan zone the booth belongs to */
  zone: ExhibitorZone;
}

export const EXHIBITORS: Exhibitor[] = [
  // ─── INDOOR ───────────────────────────────────────────────
  { boothNumber: "1", companyName: "PT Jakarta Infrastruktur Propertindo", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "2", companyName: "Sky Kraft Private Limited", country: "", zone: "Indoor" },
  { boothNumber: "6", companyName: "PT Sinar Continental", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "9", companyName: "Meghna Group of Industries", country: "Bangladesh", zone: "Indoor" },
  { boothNumber: "12", companyName: "LPH Hidayatullah", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "22-23", companyName: "Karindo LED", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "24-26", companyName: "Exhibitor Lounge", country: "", zone: "Indoor" },
  { boothNumber: "31", companyName: "KNEKS", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "32", companyName: "Kementerian Luar Negeri", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "33", companyName: "KADIN", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "37", companyName: "Sian-Enterprises", country: "", zone: "Indoor" },
  { boothNumber: "38", companyName: "Rafhan Maize Products Co Ltd", country: "", zone: "Indoor" },
  { boothNumber: "39", companyName: "Bell More Aromatics", country: "", zone: "Indoor" },
  { boothNumber: "40", companyName: "WZD Industry", country: "", zone: "Indoor" },
  { boothNumber: "49", companyName: "Pran Foods Ltd", country: "Bangladesh", zone: "Indoor" },
  { boothNumber: "50", companyName: "Pasar Palestina", country: "Palestine", zone: "Indoor" },
  { boothNumber: "55-56", companyName: "IBBCI", country: "", zone: "Indoor" }, // NOTE: possibly same org as "IBCCI" in Special Booth list — verify spelling
  { boothNumber: "57", companyName: "IForte", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "58", companyName: "Noor Dinar", country: "", zone: "Indoor" },
  { boothNumber: "63", companyName: "Islamic Tourism Centre", country: "", zone: "Indoor" },
  { boothNumber: "64", companyName: "MIHAS 2026 & MATRADE", country: "Malaysia", zone: "Indoor" },
  { boothNumber: "67-68", companyName: "Forum Wakaf Produktif", country: "Indonesia", zone: "Indoor" }, // NOTE: also listed in Special Booth — verify if duplicate
  { boothNumber: "69-72", companyName: "Iran Pavilion", country: "Iran", zone: "Indoor" },
  { boothNumber: "73", companyName: "PT Toros Farm Indonesia", country: "Indonesia", zone: "Indoor" },
  { boothNumber: "74", companyName: "Wazaran Foods", country: "", zone: "Indoor" },

  // ─── SPECIAL BOOTH (Indoor) ───────────────────────────────
  { boothNumber: "3", companyName: "Illiyeen", country: "Bangladesh", zone: "Special Booth" },
  { boothNumber: "5", companyName: "Dawa Minuman Rempah", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "8", companyName: "International Creative Exchanges", country: "", zone: "Special Booth" },
  { boothNumber: "15", companyName: "PT Permodalan Nasional Madani (PNM)", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "27", companyName: "PT Emas Antam Indonesia", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "34", companyName: "PT Kharisma Persada Buana", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "41-46", companyName: "Bank Indonesia", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "47", companyName: "PT Graha Buana Cikarang (KIH Jababeka)", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "48", companyName: "PT Makmur Berkah Amanda Tbk (KIH Sidoarjo)", country: "Indonesia", zone: "Special Booth" },
  { boothNumber: "55-56", companyName: "IBCCI (Indonesia - Bangladesh Chamber Commerce & Industry)", country: "", zone: "Special Booth" }, // NOTE: possibly same org as "IBBCI" above — verify spelling
  { boothNumber: "67-68", companyName: "Forum Wakaf Produktif", country: "Indonesia", zone: "Special Booth" }, // NOTE: also listed under Indoor above — verify if duplicate
  { boothNumber: "75-78", companyName: "Kementerian UMKM", country: "Indonesia", zone: "Special Booth" },

  // ─── OUTDOOR ──────────────────────────────────────────────
  { boothNumber: "5", companyName: "Sipaling Hi! Media & Community", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "7", companyName: "Rumah Pecel Mba Sri", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "8", companyName: "Ayam Keprabon Express", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "9", companyName: "Nasi Gudeg & Ramesan Bu Lies", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "12", companyName: "Kedai Nasi Lemak Waleed", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "17", companyName: "Bakwan Malang Blok M", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "18", companyName: "Dapur Bang Izzi & Soto Mie Bang Asep", country: "Indonesia", zone: "Outdoor" },
  { boothNumber: "19", companyName: "Yunus Emre Enstitüsü", country: "Türkiye", zone: "Outdoor" },
  { boothNumber: "20", companyName: "Bang Syariah Indonesia", country: "Indonesia", zone: "Outdoor" }, // NOTE: likely a typo for "Bank Syariah Indonesia" in source PDF — verify
  { boothNumber: "21", companyName: "Sri Lanka Pavilion", country: "Sri Lanka", zone: "Outdoor" },
  { boothNumber: "22", companyName: "Pasar Palestina", country: "Palestine", zone: "Outdoor" },
  { boothNumber: "23", companyName: "Iran Pavilion", country: "Iran", zone: "Outdoor" },
  { boothNumber: "24", companyName: "Fezkinara", country: "", zone: "Outdoor" },
  { boothNumber: "33", companyName: "Nigeria Halal Strategy Committee", country: "Nigeria", zone: "Outdoor" },
  { boothNumber: "34", companyName: "Nasgokambonsir Sejak 1958", country: "Indonesia", zone: "Outdoor" },

  // ─── FOOD TRUCK ───────────────────────────────────────────
  { boothNumber: "13-14", companyName: "Foodtruck Burger Bangor", country: "Indonesia", zone: "Food Truck" },
  { boothNumber: "15", companyName: "Foodtruck Doner Kebab", country: "", zone: "Food Truck" },
];
