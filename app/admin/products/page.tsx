import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { categories } from '@/lib/products';
import AdminProductsClient from './products-client';

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const rows = await prisma.product.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] }).catch(() => []);
  const products = rows.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() }));
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminNav />
      <AdminProductsClient initialProducts={products} categories={categories} />
    </main>
  );
}
