import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'Không có file' }, { status: 400 });
  if (!file.type.includes('webp')) return NextResponse.json({ error: 'Chỉ cho phép ảnh .webp' }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  if (bytes.length > 500 * 1024) return NextResponse.json({ error: 'Ảnh nên nhỏ hơn 500KB' }, { status: 400 });
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-').replace(/-+/g, '-');
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });
  const filename = `${Date.now()}-${safeName.endsWith('.webp') ? safeName : `${safeName}.webp`}`;
  await writeFile(path.join(uploadDir, filename), bytes);
  return NextResponse.json({ url: `/uploads/${filename}` });
}
