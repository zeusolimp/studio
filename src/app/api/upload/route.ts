import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
  }

  const uploadDir = join(process.cwd(), 'public/uploads');

  try {
    await access(uploadDir);
  } catch (error) {
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (mkdirError) {
      console.error('Error creating upload directory:', mkdirError);
      return NextResponse.json({ success: false, error: 'Could not create upload directory' }, { status: 500 });
    }
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
  const path = join(uploadDir, filename);
  
  try {
    await writeFile(path, buffer);
    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to save file' }, { status: 500 });
  }
}
