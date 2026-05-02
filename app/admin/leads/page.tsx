import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/AdminNav';
import { getAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login');
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <AdminNav />
      <h1 className="text-4xl font-black">Đơn yêu cầu báo giá</h1>
      <div className="mt-8 grid gap-4">
        {leads.length === 0 ? <p className="rounded-3xl bg-white p-6 text-slate-500 shadow">Chưa có lead.</p> : leads.map((lead) => (
          <article key={lead.id} className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200 ring-1 ring-slate-100">
            <div className="flex flex-col justify-between gap-3 md:flex-row">
              <div>
                <h2 className="text-xl font-black">{lead.name} • {lead.phone}</h2>
                <p className="mt-1 text-sm text-slate-500">Khu vực: {lead.area || 'Chưa nhập'} • Trạng thái: {lead.status}</p>
              </div>
              <time className="text-sm text-slate-500">{lead.createdAt.toLocaleString('vi-VN')}</time>
            </div>
            <p className="mt-4 leading-7 text-slate-700">{lead.message || 'Không có ghi chú'}</p>
            <p className="mt-3 text-sm text-slate-500">Sản phẩm quan tâm: {lead.items}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
