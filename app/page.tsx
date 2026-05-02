import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { categories } from '@/lib/products';
import { getPublishedProducts } from '@/lib/db-products';
import { site } from '@/lib/site';

const heroImage = '/images/hero-o-du-ngoai-troi.webp';

export default async function HomePage() {
  const products = await getPublishedProducts();
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name, url: site.url, telephone: site.phone, sameAs: [site.secondaryUrl] },
      { '@type': 'LocalBusiness', '@id': `${site.url}/#localbusiness`, name: site.name, url: site.url, telephone: site.phone, priceRange: 'Liên hệ', image: `${site.url}${heroImage}`, description: site.description, areaServed: 'Việt Nam' },
      { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, publisher: { '@id': `${site.url}/#organization` } },
      { '@type': 'FAQPage', '@id': `${site.url}/#faq`, mainEntity: [
        { '@type': 'Question', name: 'Ô Dù Đại Phát bán những sản phẩm nào?', acceptedAnswer: { '@type': 'Answer', text: 'Ô Dù Đại Phát bán dù lệch tâm, dù đúng tâm, dù cafe, dù sân vườn, dù quảng cáo, nhà bạt, bàn ghế ngoài trời, xích đu và combo setup quán cafe.' } },
        { '@type': 'Question', name: 'Có giao hàng toàn quốc không?', acceptedAnswer: { '@type': 'Answer', text: 'Có. Ô Dù Đại Phát hỗ trợ tư vấn, báo giá và giao hàng toàn quốc.' } },
        { '@type': 'Question', name: 'Liên hệ báo giá bằng cách nào?', acceptedAnswer: { '@type': 'Answer', text: `Gọi hoặc Zalo ${site.phone} để nhận tư vấn và báo giá nhanh.` } }
      ] }
    ]
  };

  return (
    <main>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden bg-blue-950">
        <Image src={heroImage} alt="Ô dù ngoài trời Ô Dù Đại Phát" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/85 to-blue-900/30" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 ring-1 ring-white/20">Chuyên dù che nắng • dù cafe • dù sân vườn • nhà bạt</p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Ô Dù Đại Phát - Ô Dù Ngoài Trời, Dù Che Nắng, Dù Sân Vườn</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">Cung cấp ô dù ngoài trời, dù lệch tâm, dù đúng tâm, dù cafe, dù quảng cáo, nhà bạt, bàn ghế ngoài trời và combo setup quán cafe. Gọi/Zalo {site.phone} để nhận báo giá nhanh.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${site.phone}`} className="rounded-full bg-orange-500 px-7 py-4 text-center font-bold text-white shadow-xl shadow-orange-900/30 transition hover:bg-orange-600">☎ Gọi ngay {site.phone}</a>
              <a href={`https://zalo.me/${site.phone}`} className="rounded-full bg-white px-7 py-4 text-center font-bold text-blue-800 shadow-xl transition hover:bg-blue-50">💬 Chat Zalo báo giá</a>
            </div>
          </div>
          <div className="hidden rounded-[2rem] bg-white/10 p-4 shadow-2xl ring-1 ring-white/20 backdrop-blur lg:block">
            <Image src="/images/showroom-o-du-dai-phat.webp" alt="Showroom ô dù ngoài trời Ô Dù Đại Phát" width={900} height={620} className="h-[440px] w-full rounded-[1.5rem] object-cover" priority />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <nav className="rounded-2xl bg-white px-5 py-3 text-sm text-slate-600 ring-1 ring-slate-100"><Link href="/" className="font-bold text-blue-700">Trang chủ</Link> / Ô dù ngoài trời / Sản phẩm</nav>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="font-bold uppercase tracking-widest text-orange-500">Danh mục bán hàng</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Đầy đủ sản phẩm như thị trường, mở rộng thêm combo setup</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">Từ ô dù ngoài trời đến nhà bạt, bàn ghế, xích đu và combo setup quán cafe, website được cấu trúc để tối ưu SEO từng danh mục và từng sản phẩm.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link href={`/danh-muc/${category.slug}`} key={category.slug} className="rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100 transition hover:-translate-y-1">
              <h3 className="text-xl font-black text-blue-800">{category.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><p className="font-bold uppercase tracking-widest text-orange-500">Sản phẩm nổi bật</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Ô dù ngoài trời bán chạy</h2></div>
            <Link href="/san-pham" className="font-bold text-blue-700">Xem tất cả sản phẩm →</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <article className="rounded-[2rem] bg-white p-7 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100">
          <p className="font-bold uppercase tracking-widest text-orange-500">Nội dung SEO chuyên sâu</p>
          <h2 className="mt-2 text-3xl font-black">Mua ô dù ngoài trời chất lượng cao tại Ô Dù Đại Phát</h2>
          <div className="mt-5 space-y-4 leading-8 text-slate-700">
            <p>Ô Dù Đại Phát cung cấp các dòng ô dù ngoài trời phục vụ nhu cầu che nắng cho quán cafe, nhà hàng, sân vườn, khu nghỉ dưỡng, resort, hồ bơi, sự kiện và điểm bán hàng. Sản phẩm được tư vấn theo không gian sử dụng, kích thước khu vực cần che, phong cách thiết kế và ngân sách.</p>
            <p>Các dòng sản phẩm gồm dù lệch tâm, dù đúng tâm, dù cafe, dù sân vườn, dù quảng cáo in logo, nhà bạt di động, bàn ghế ngoài trời, ghế băng sân vườn, xích đu và combo setup quán cafe. Mỗi mẫu có thể tùy chọn kích thước, màu sắc, chất liệu vải, kiểu khung và phụ kiện.</p>
            <p>Khách hàng có thể gọi hoặc Zalo {site.phone} để gửi hình ảnh mặt bằng, số lượng cần mua và vị trí giao hàng. Đội ngũ Ô Dù Đại Phát sẽ hỗ trợ tư vấn mẫu phù hợp, báo giá nhanh và giao hàng toàn quốc.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
