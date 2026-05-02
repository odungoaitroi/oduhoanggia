import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';
import { categories, getCategory } from '@/lib/products';
import { getPublishedProducts } from '@/lib/db-products';
import { canonical, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sản phẩm ô dù ngoài trời, nhà bạt, bàn ghế sân vườn',
  description: 'Danh mục sản phẩm Ô Dù Đại Phát: dù lệch tâm, dù đúng tâm, dù cafe, dù sân vườn, dù quảng cáo, nhà bạt, bàn ghế ngoài trời, xích đu.',
  alternates: { canonical: canonical('/san-pham') }
};

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ 'danh-muc'?: string }> }) {
  const sp = await searchParams;
  const allProducts = await getPublishedProducts();
  const category = sp?.['danh-muc'] ? getCategory(sp['danh-muc']) : undefined;
  const displayProducts = category ? allProducts.filter((p) => p.category === category.slug) : allProducts;
  const title = category ? category.title : 'Tất cả sản phẩm Ô Dù Đại Phát';
  const description = category ? category.description : 'Danh mục đầy đủ ô dù ngoài trời, nhà bạt, bàn ghế ngoài trời, xích đu và combo setup quán cafe.';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonical(category ? `/san-pham?danh-muc=${category.slug}` : '/san-pham'),
    isPartOf: { '@id': `${site.url}/#website` },
    mainEntity: displayProducts.map((p) => ({ '@type': 'Product', name: p.name, image: `${site.url}${p.image}`, url: `${site.url}/san-pham/${p.slug}` }))
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-blue-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-blue-100"><Link href="/">Trang chủ</Link> / Sản phẩm</nav>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">{description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          <Link href="/san-pham" className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold ${!category ? 'bg-blue-700 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'}`}>Tất cả</Link>
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/danh-muc/${cat.slug}`} className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold ${category?.slug === cat.slug ? 'bg-blue-700 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200'}`}>{cat.name}</Link>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
        <article className="mt-12 rounded-[2rem] bg-white p-7 leading-8 text-slate-700 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100">
          <h2 className="text-2xl font-black text-slate-900">Tư vấn chọn {category?.name.toLowerCase() || 'ô dù ngoài trời'} phù hợp</h2>
          <p className="mt-4">Để chọn đúng sản phẩm, khách hàng nên xác định kích thước khu vực cần che, số lượng bàn ghế, hướng nắng, phong cách không gian và ngân sách. Ô Dù Đại Phát hỗ trợ tư vấn theo hình ảnh mặt bằng, gợi ý mẫu phù hợp và báo giá nhanh qua Hotline/Zalo {site.phone}.</p>
        </article>
      </section>
    </main>
  );
}
