import Link from 'next/link';
import { categories } from '@/lib/products';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black text-white">Ô Dù Đại Phát</h2>
          <p className="mt-3 max-w-xl leading-7">Chuyên ô dù ngoài trời, dù che nắng, dù cafe, dù sân vườn, nhà bạt, bàn ghế ngoài trời, xích đu và combo setup quán cafe.</p>
          <p className="mt-4 font-bold text-white">Hotline/Zalo: {site.phone}</p>
        </div>
        <div>
          <h3 className="font-black text-white">Danh mục</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(0, 6).map((category) => (
              <li key={category.slug}><Link href={`/san-pham?danh-muc=${category.slug}`}>{category.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-black text-white">Website</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/san-pham">Sản phẩm</Link></li>
            <li><Link href="/lien-he">Liên hệ</Link></li>
            <li><a href={site.secondaryUrl} rel="noopener noreferrer">Domain phụ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm">© {new Date().getFullYear()} Ô Dù Đại Phát. {site.url}</div>
    </footer>
  );
}
