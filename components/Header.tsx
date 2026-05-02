import Link from 'next/link';
import { site } from '@/lib/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ô Dù Đại Phát trang chủ">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white shadow-lg shadow-blue-200">ĐP</span>
          <span>
            <span className="block text-lg font-black tracking-tight text-blue-800">Ô Dù Đại Phát</span>
            <span className="block text-xs font-medium text-slate-500">Ô dù ngoài trời chất lượng cao</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex" aria-label="Menu chính">
          <Link href="/">Trang chủ</Link>
          <Link href="/san-pham">Sản phẩm</Link>
          <Link href="/san-pham/du-lech-tam-tron-3m-xoay-360">Dù lệch tâm</Link>
          <Link href="/lien-he">Liên hệ</Link>
        </nav>
        <a href={`tel:${site.phone}`} className="hidden rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 md:inline-flex">
          Gọi {site.phone}
        </a>
        <span className="text-2xl lg:hidden">☰</span>
      </div>
    </header>
  );
}
