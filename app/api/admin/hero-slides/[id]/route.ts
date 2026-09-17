import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '../../../../lib/supabaseServerAuth';
import { getSupabaseAdminClient } from '../../../../lib/supabase';
import { heroSlideInputToRow, type HeroSlideInput } from '../../../../lib/heroSlides';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const { id } = await params;
  const input = (await request.json()) as HeroSlideInput;
  const { data, error } = await supabase
    .from('hero_slides')
    .update(heroSlideInputToRow(input))
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ slide: data });
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const { id } = await params;
  const { error } = await supabase.from('hero_slides').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
