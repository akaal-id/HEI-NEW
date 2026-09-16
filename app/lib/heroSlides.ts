import { getSupabasePublicClient } from './supabase';
import { heroMedia as fallbackHeroMedia, type HeroMediaItem } from '../data/heroMedia';

export interface HeroSlideRow {
  id: string;
  position: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster: string | null;
  duration: number | null;
  content_key: string;
  eyebrow: string;
  eyebrow_date_time: string;
  title: string;
  date: string;
  location: string;
  button_label: string;
  button_href: string;
  button_disabled: boolean;
}

export function rowToHeroMediaItem(row: HeroSlideRow): HeroMediaItem {
  return {
    type: row.type,
    src: row.src,
    alt: row.alt,
    poster: row.poster ?? undefined,
    duration: row.duration ?? undefined,
    contentKey: row.content_key,
    eyebrow: row.eyebrow,
    eyebrowDateTime: row.eyebrow_date_time,
    title: row.title,
    date: row.date,
    location: row.location,
    buttonLabel: row.button_label,
    buttonHref: row.button_href,
    buttonDisabled: row.button_disabled,
  } as HeroMediaItem;
}

export interface HeroSlideInput {
  position: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string | null;
  duration?: number | null;
  contentKey: string;
  eyebrow: string;
  eyebrowDateTime: string;
  title: string;
  date: string;
  location: string;
  buttonLabel: string;
  buttonHref: string;
  buttonDisabled: boolean;
}

/** Maps the admin form's camelCase input to the DB's snake_case columns. */
export function heroSlideInputToRow(input: HeroSlideInput) {
  return {
    position: input.position,
    type: input.type,
    src: input.src,
    alt: input.alt,
    poster: input.poster || null,
    duration: input.duration || null,
    content_key: input.contentKey,
    eyebrow: input.eyebrow,
    eyebrow_date_time: input.eyebrowDateTime,
    title: input.title,
    date: input.date,
    location: input.location,
    button_label: input.buttonLabel,
    button_href: input.buttonHref,
    button_disabled: input.buttonDisabled,
  };
}

/** Used by the public homepage. Falls back to the static hero data if Supabase isn't configured or the table is empty. */
export async function getHeroSlides(): Promise<HeroMediaItem[]> {
  const supabase = getSupabasePublicClient();
  if (!supabase) return fallbackHeroMedia;

  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('position', { ascending: true });

  if (error || !data || data.length === 0) {
    if (error) console.error('Error fetching hero slides:', error);
    return fallbackHeroMedia;
  }

  return (data as HeroSlideRow[]).map(rowToHeroMediaItem);
}
