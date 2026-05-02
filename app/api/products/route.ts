import { NextResponse } from 'next/server';
import { getPublishedProducts } from '@/lib/db-products';

export async function GET() {
  const data = await getPublishedProducts();
  return NextResponse.json({ data });
}
