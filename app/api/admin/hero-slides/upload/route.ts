import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '../../../../lib/adminAuth';
import { getSupabaseAdminClient } from '../../../../lib/supabase';

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const extension = file.name.split('.').pop() || 'bin';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabase.storage.from('hero-media').upload(path, bytes, {
    contentType: file.type || undefined,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from('hero-media').getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
