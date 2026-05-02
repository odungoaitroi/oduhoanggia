import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  area: z.string().optional(),
  message: z.string().optional(),
  items: z.array(z.string()).default([])
});

export async function POST(request: Request) {
  const parsed = leadSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const data = await prisma.lead.create({ data: { ...parsed.data, items: JSON.stringify(parsed.data.items) } });
  return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
}
