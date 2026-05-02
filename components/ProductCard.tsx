import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { site } from '@/lib/site';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/70 ring-1 ring-slate-100 transition hover:-translate-y-1">
      <div className="relative h-56">
        <Image src={product.image} alt={`${product.name} ngoài trời tại Ô Dù Đại Phát`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-black text-white">{product.badge}</span>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-700">{product.keywords[0]}</p>
        <h3 className="mt-2 text-lg font-black text-slate-900"><Link href={`/san-pham/${product.slug}`}>{product.name}</Link></h3>
        <p className="mt-2 line-clamp-2 min-h-[56px] text-sm leading-7 text-slate-600">{product.shortDescription}</p>
        <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
          <div><b>Kích thước:</b> {product.size}</div>
          <div><b>Giá:</b> {product.price}</div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href={`/san-pham/${product.slug}`} className="rounded-full border border-blue-200 px-4 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-50">Chi tiết</Link>
          <a href={`tel:${site.phone}`} className="rounded-full bg-blue-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-800">Báo giá</a>
        </div>
      </div>
    </article>
  );
}
