import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');

  const [productCount, leadCount, newLeadCount] = await Promise.all([
    prisma.product.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'NEW' } })
  ]).catch(() => [0, 0, 0]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminNav />
      <section className="rounded-[2rem] bg-gradient-to-br from-blue-800 to-slate-950 p-8 text-white">
        <p className="font-bold uppercase tracking-widest text-orange-300">Backend thật + Admin thật</p>
        <h1 className="mt-2 text-4xl font-black">Dashboard Ô Dù Đại Phát</h1>
        <p className="mt-5 max-w-3xl leading-8 text-blue-100">Quản trị sản phẩm, ảnh WebP, đơn báo giá và SEO tự động bằng Next.js API Routes + Prisma + SQLite. Chuẩn Node.js v24 LTS.</p>
      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <Link href="/admin/products" className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-100">
          <div className="text-4xl font-black text-blue-700">{productCount}</div>
          <h2 className="mt-3 text-xl font-black">Sản phẩm</h2>
          <p className="mt-2 text-sm text-slate-600">Thêm, sửa, xóa, ẩn/hiện sản phẩm.</p>
        </Link>
        <Link href="/admin/leads" className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-100">
          <div className="text-4xl font-black text-orange-500">{leadCount}</div>
          <h2 className="mt-3 text-xl font-black">Đơn báo giá</h2>
          <p className="mt-2 text-sm text-slate-600">Theo dõi khách gửi form báo giá.</p>
        </Link>
        <div className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-100">
          <div className="text-4xl font-black text-green-600">{newLeadCount}</div>
          <h2 className="mt-3 text-xl font-black">Lead mới</h2>
          <p className="mt-2 text-sm text-slate-600">Cần gọi/Zalo chăm sóc ngay.</p>
        </div>
      </section>
    </main>
  );
}
