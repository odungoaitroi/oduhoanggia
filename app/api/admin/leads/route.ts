import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  await requireAdmin();
  const data = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data });
}
