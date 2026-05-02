import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

const updateSchema = z.object({
  slug: z.string().min(3).optional(),
  name: z.string().min(3).optional(),
  category: z.string().min(2).optional(),
  price: z.string().optional(),
  size: z.string().optional(),
  material: z.string().optional(),
  image: z.string().optional(),
  badge: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  applications: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().int().optional()
});

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const payload: any = { ...parsed.data };
  if (payload.applications) payload.applications = JSON.stringify(payload.applications);
  if (payload.keywords) payload.keywords = JSON.stringify(payload.keywords);
  const data = await prisma.product.update({ where: { id }, data: payload });
  return NextResponse.json({ data });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
