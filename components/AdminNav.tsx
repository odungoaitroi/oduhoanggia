import Link from 'next/link';

export function AdminNav() {
  return (
    <nav className="mb-8 flex flex-wrap gap-3 rounded-3xl bg-slate-950 p-4 text-sm font-bold text-white">
      <Link className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20" href="/admin">Dashboard</Link>
      <Link className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20" href="/admin/products">Sản phẩm</Link>
      <Link className="rounded-full bg-white/10 px-4 py-2 hover:bg-white/20" href="/admin/leads">Báo giá</Link>
      <Link className="rounded-full bg-orange-500 px-4 py-2 hover:bg-orange-600" href="/">Xem web</Link>
    </nav>
  );
}
