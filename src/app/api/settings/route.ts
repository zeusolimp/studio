import { NextRequest, NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/settings';
import { SiteSettings } from '@/types';

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(request: NextRequest) {
  try {
    const settings: SiteSettings = await request.json();
    const result = await saveSettings(settings);
    if (result.success) {
      return NextResponse.json({ success: true, message: 'Settings saved successfully.' });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Invalid JSON format or server error.' }, { status: 400 });
  }
}
