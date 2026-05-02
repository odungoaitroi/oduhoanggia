import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations } from '@/lib/locations';
import { categories } from '@/lib/products';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) return {};
  const title = `Ô dù ngoài trời tại ${location.name} | Ô Dù Đại Phát`;
  const description = `Báo giá ô dù ngoài trời, dù cafe, dù sân vườn, dù lệch tâm tại ${location.name}. Gọi/Zalo ${site.phone}.`;
  return {
    title,
    description,
    alternates: { canonical: `/khu-vuc/${location.slug}` },
    openGraph: { title, description, url: `${site.url}/khu-vuc/${location.slug}`, images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: title }] }
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = locations.find((l) => l.slug === slug);
  if (!location) notFound();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Ô dù ngoài trời tại ${location.name}`,
    provider: { '@type': 'LocalBusiness', name: 'Ô Dù Đại Phát', telephone: site.phone, url: site.url },
    areaServed: location.name,
    serviceType: 'Cung cấp ô dù ngoài trời, dù cafe, dù sân vườn, nhà bạt, bàn ghế ngoài trời'
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-blue-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-orange-300">SEO khu vực</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">Ô dù ngoài trời tại {location.name}</h1>
          <p className="mt-5 max-w-3xl leading-8 text-blue-100">Báo giá ô dù ngoài trời, dù cafe, dù sân vườn, dù lệch tâm, nhà bạt và bàn ghế ngoài trời tại {location.name}.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="rounded-[2rem] bg-white p-8 leading-8 text-slate-700 shadow-lg shadow-slate-200 ring-1 ring-slate-100">
          <h2 className="text-3xl font-black text-slate-900">Báo giá ô dù ngoài trời tại {location.name}</h2>
          <p className="mt-4">Ô Dù Đại Phát cung cấp các mẫu ô dù ngoài trời cho quán cafe, nhà hàng, sân vườn, hồ bơi, resort, sự kiện và điểm bán hàng tại {location.name}. Khách hàng có thể gửi hình ảnh mặt bằng qua Zalo {site.phone} để được tư vấn mẫu phù hợp.</p>
          <p className="mt-4">Các nhóm sản phẩm phổ biến gồm {categories.map((c) => c.name.toLowerCase()).join(', ')}. Mỗi nhóm sản phẩm đều có thể tối ưu nội dung SEO riêng, giúp website mở rộng hệ thống landing page theo khu vực.</p>
          <h3 className="mt-8 text-2xl font-black text-slate-900">Quy trình đặt hàng tại {location.name}</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-6">
            <li>Gửi nhu cầu, kích thước khu vực cần che và số lượng.</li>
            <li>Ô Dù Đại Phát tư vấn mẫu, màu sắc, chất liệu và phương án vận chuyển.</li>
            <li>Báo giá nhanh qua điện thoại/Zalo.</li>
            <li>Chốt đơn, giao hàng và hỗ trợ sau bán.</li>
          </ol>
        </article>
      </section>
    </main>
  );
}
