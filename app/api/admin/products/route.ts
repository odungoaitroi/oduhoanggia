import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

const productSchema = z.object({
  slug: z.string().min(3),
  name: z.string().min(3),
  category: z.string().min(2),
  price: z.string().default('Liên hệ'),
  size: z.string().min(1),
  material: z.string().min(1),
  image: z.string().min(1),
  badge: z.string().optional(),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  applications: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export async function GET() {
  await requireAdmin();
  const data = await prisma.product.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  await requireAdmin();
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const p = parsed.data;
  const data = await prisma.product.create({ data: { ...p, applications: JSON.stringify(p.applications), keywords: JSON.stringify(p.keywords) } });
  return NextResponse.json({ data }, { status: 201 });
}
