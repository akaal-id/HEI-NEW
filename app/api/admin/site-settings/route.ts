import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '../../../lib/supabaseServerAuth';
import { getSupabaseAdminClient } from '../../../lib/supabase';
import {
  DEFAULT_SITE_SETTINGS,
  rowToSiteSettings,
  siteSettingsToRow,
  type SiteSettings,
} from '../../../lib/siteSettings';

export async function GET() {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 'default')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ settings: data ? rowToSiteSettings(data) : DEFAULT_SITE_SETTINGS });
}

export async function PUT(request: NextRequest) {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const input = (await request.json()) as SiteSettings;
  const { data, error } = await supabase
    .from('site_settings')
    .upsert({ id: 'default', ...siteSettingsToRow(input) })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ settings: rowToSiteSettings(data) });
}
