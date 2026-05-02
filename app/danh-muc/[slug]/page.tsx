import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories } from '@/lib/products';
import { getPublishedProducts } from '@/lib/db-products';
import { ProductCard } from '@/components/ProductCard';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.title} | Ô Dù Đại Phát`,
    description: category.description,
    alternates: { canonical: `/danh-muc/${category.slug}` },
    openGraph: {
      title: `${category.title} | Ô Dù Đại Phát`,
      description: category.description,
      url: `${site.url}/danh-muc/${category.slug}`,
      images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: category.title }]
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const products = (await getPublishedProducts()).filter((p) => p.category === category.slug);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `${site.url}/danh-muc/${category.slug}`,
    mainEntity: products.map((p) => ({ '@type': 'Product', name: p.name, image: `${site.url}${p.image}`, url: `${site.url}/san-pham/${p.slug}` }))
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-blue-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-orange-300">Danh mục sản phẩm</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">{category.title}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-blue-100">{category.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
        <article className="mt-12 rounded-[2rem] bg-white p-8 leading-8 text-slate-700 shadow-lg shadow-slate-200 ring-1 ring-slate-100">
          <h2 className="text-3xl font-black text-slate-900">Tư vấn {category.name} tại Ô Dù Đại Phát</h2>
          <p className="mt-4">{category.description} Khách hàng có thể gọi hoặc Zalo {site.phone} để được tư vấn kích thước, màu sắc, chất liệu và phương án giao hàng phù hợp.</p>
          <p className="mt-4">Tất cả sản phẩm đều ưu tiên ảnh WebP, nội dung rõ ràng, heading chuẩn SEO và dữ liệu có cấu trúc để hỗ trợ Google hiểu đúng sản phẩm.</p>
        </article>
      </section>
    </main>
  );
}
