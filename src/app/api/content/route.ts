import { NextRequest, NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/content';
import { LandingContent } from '@/types';

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  try {
    const content: LandingContent = await request.json();
    const result = await saveContent(content);
    if (result.success) {
      return NextResponse.json({ success: true, message: 'Content saved successfully.' });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Invalid JSON format or server error.' }, { status: 400 });
  }
}
