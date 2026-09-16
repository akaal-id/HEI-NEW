import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '../../../lib/adminAuth';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import { heroSlideInputToRow, type HeroSlideInput } from '../../../lib/heroSlides';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slides: data });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const input = (await request.json()) as HeroSlideInput;
  const { data, error } = await supabase
    .from('hero_slides')
    .insert(heroSlideInputToRow(input))
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slide: data });
}
