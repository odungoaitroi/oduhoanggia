import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { canonical, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Liên hệ báo giá ô dù ngoài trời',
  description: `Liên hệ Ô Dù Đại Phát qua Hotline/Zalo ${site.phone} để nhận tư vấn và báo giá ô dù ngoài trời, dù cafe, dù sân vườn, nhà bạt, bàn ghế ngoài trời.`,
  alternates: { canonical: canonical('/lien-he') }
};

export default function ContactPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Liên hệ Ô Dù Đại Phát', url: canonical('/lien-he'), telephone: site.phone };
  return (
    <main>
      <JsonLd data={schema} />
      <section className="bg-blue-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black sm:text-5xl">Liên hệ báo giá ô dù ngoài trời</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-blue-100">Gửi nhu cầu, kích thước, số lượng và khu vực giao hàng để Ô Dù Đại Phát tư vấn mẫu phù hợp.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-black">Ô Dù Đại Phát</h2>
          <div className="mt-6 space-y-4 text-lg text-slate-700">
            <p>☎ Hotline/Zalo: <b>{site.phone}</b></p>
            <p>🌐 Website chính: {site.url}</p>
            <p>🌐 Website phụ: {site.secondaryUrl}</p>
            <p>🚚 Hỗ trợ giao hàng toàn quốc</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${site.phone}`} className="rounded-full bg-orange-500 px-7 py-4 text-center font-black text-white">Gọi ngay</a>
            <a href={`https://zalo.me/${site.phone}`} className="rounded-full bg-blue-700 px-7 py-4 text-center font-black text-white">Chat Zalo</a>
          </div>
        </div>
        <form className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200 ring-1 ring-slate-100">
          <h2 className="text-2xl font-black">Form yêu cầu báo giá</h2>
          <div className="mt-5 grid gap-4">
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600" placeholder="Họ tên" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600" placeholder="Số điện thoại" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600" placeholder="Khu vực giao hàng" />
            <textarea className="h-32 rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-600" placeholder="Nhu cầu: loại dù, số lượng, kích thước, màu sắc..." />
            <button type="button" className="rounded-full bg-orange-500 px-6 py-4 font-black text-white">Gửi yêu cầu</button>
          </div>
        </form>
      </section>
    </main>
  );
}
