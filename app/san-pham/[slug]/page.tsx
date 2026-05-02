import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { getCategory, products } from '@/lib/products';
import { getPublishedProduct } from '@/lib/db-products';
import { canonical, site } from '@/lib/site';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} - Báo giá ${product.keywords[0]}`,
    description: `${product.shortDescription} Liên hệ/Zalo ${site.phone} để nhận báo giá nhanh từ Ô Dù Đại Phát.`,
    keywords: product.keywords,
    alternates: { canonical: canonical(`/san-pham/${product.slug}`) },
    openGraph: {
      title: `${product.name} | Ô Dù Đại Phát`,
      description: product.shortDescription,
      images: [{ url: product.image, width: 1200, height: 800, alt: `${product.name} tại Ô Dù Đại Phát` }]
    }
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getPublishedProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `${site.url}${product.image}`,
    description: product.description,
    brand: { '@type': 'Brand', name: site.name },
    category: category?.name,
    offers: { '@type': 'Offer', priceCurrency: 'VND', price: '0', availability: 'https://schema.org/InStock', url: canonical(`/san-pham/${product.slug}`) }
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="rounded-2xl bg-white px-5 py-3 text-sm text-slate-600 ring-1 ring-slate-100"><Link href="/">Trang chủ</Link> / <Link href="/san-pham">Sản phẩm</Link> / {product.name}</nav>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-slate-100 shadow-xl shadow-slate-200">
          <Image src={product.image} alt={`${product.name} chất lượng cao tại Ô Dù Đại Phát`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="font-bold uppercase tracking-widest text-orange-500">{category?.name}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{product.description}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-100"><b>Kích thước</b><p className="mt-1 text-slate-600">{product.size}</p></div>
            <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-100"><b>Giá</b><p className="mt-1 text-slate-600">{product.price}</p></div>
            <div className="rounded-3xl bg-white p-5 ring-1 ring-slate-100 sm:col-span-2"><b>Chất liệu</b><p className="mt-1 text-slate-600">{product.material}</p></div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${site.phone}`} className="rounded-full bg-orange-500 px-7 py-4 text-center font-black text-white shadow-lg shadow-orange-200 hover:bg-orange-600">Gọi báo giá {site.phone}</a>
            <a href={`https://zalo.me/${site.phone}`} className="rounded-full bg-blue-700 px-7 py-4 text-center font-black text-white shadow-lg shadow-blue-200 hover:bg-blue-800">Chat Zalo</a>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black">Ứng dụng của {product.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.applications.map((item) => <div key={item} className="rounded-3xl bg-slate-50 p-5 font-bold ring-1 ring-slate-100">✓ {item}</div>)}
          </div>
          <article className="mt-10 leading-8 text-slate-700">
            <h2 className="text-2xl font-black text-slate-900">Vì sao nên mua {product.name} tại Ô Dù Đại Phát?</h2>
            <p className="mt-4">Ô Dù Đại Phát tư vấn sản phẩm theo nhu cầu sử dụng thực tế, hỗ trợ lựa chọn kích thước, màu sắc, chất liệu và phương án giao hàng. Khách hàng có thể gửi ảnh mặt bằng qua Zalo để nhận gợi ý sản phẩm phù hợp, tránh mua sai mẫu hoặc sai kích thước.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
