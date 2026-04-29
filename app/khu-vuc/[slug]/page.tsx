import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard, ProjectCard } from "../../../components/cards";
import { BaseSchemas, JsonLd } from "../../../components/schema";
import { SiteShell } from "../../../components/site-shell";
import { Breadcrumbs, Button, Container, InfoList, SectionTitle } from "../../../components/ui";
import { areas, getArea, getRelatedProducts, getRelatedProjects, siteData } from "../../../lib/site-data";
import Link from "next/link";

export function generateStaticParams() {
  return areas.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const area = getArea(params.slug);
  if (!area) return {};
  return {
    title: area.seoTitle,
    description: area.seoDescription,
    alternates: { canonical: `/khu-vuc/${area.slug}` },
    openGraph: {
      title: area.seoTitle,
      description: area.seoDescription,
      url: `${siteData.domain}/khu-vuc/${area.slug}`,
      locale: "vi_VN",
      type: "website",
    }
  };
}

export default function AreaDetailPage({ params }: { params: { slug: string } }) {
  const area = getArea(params.slug);
  if (!area) notFound();
  const products = getRelatedProducts(area.featuredProductSlugs);
  const projects = getRelatedProjects(area.featuredProjectSlugs);

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `Ô dù ngoài trời tại ${area.name} - Ô Dù Đại Phát`,
    "description": area.seoDescription,
    "url": `${siteData.domain}/khu-vuc/${area.slug}`,
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": siteData.domain },
        { "@type": "ListItem", "position": 2, "name": "Khu vực", "item": `${siteData.domain}/khu-vuc` },
        { "@type": "ListItem", "position": 3, "name": area.name }
      ]
    }
  };

  return (
    <SiteShell>
      <BaseSchemas />
      <JsonLd data={localSchema} />

      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Khu vực", href: "/khu-vuc" }, { label: area.name }]} />
          <SectionTitle 
            eyebrow={`Phục vụ tại ${area.name}`} 
            title={`Ô dù ngoài trời ${area.name}`} 
            subtitle={area.intro} 
            align="left" 
            as="h1" 
          />
          <div className="page-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button href="/bao-gia" variant="primary">Nhận báo giá tại {area.name}</Button>
            <Link href={siteData.zaloLink} className="button button-secondary" style={{ display: 'flex', gap: '8px', color: 'var(--zalo)' }}>
              💬 Chat Zalo tư vấn ngay
            </Link>
          </div>
        </Container>
      </section>

      {/* Nhu cầu & Vận chuyển */}
      <section className="section">
        <Container>
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <article className="content-card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--primary)' }}>Nhu cầu phổ biến tại {area.name}</h2>
              <p style={{ marginBottom: '16px', color: 'var(--muted)' }}>Dựa trên các dự án đã triển khai, khách hàng tại {area.name} thường ưu tiên các giải pháp:</p>
              <InfoList items={area.demand} />
            </article>

            <article className="content-card" style={{ padding: '32px', borderLeft: '4px solid var(--primary)' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Vận chuyển & Hỗ trợ</h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                <p><strong>🚚 Vận chuyển:</strong> {area.shipping}</p>
                <p><strong>🛠️ Hỗ trợ kỹ thuật:</strong> {area.support}</p>
                <p style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '14px' }}>
                  * Ô Dù Đại Phát cam kết đóng gói kỹ lưỡng và hướng dẫn lắp đặt chi tiết qua video call cho khách hàng tại {area.name}.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* Sản phẩm tiêu biểu */}
      <section className="section section-soft">
        <Container>
          <SectionTitle 
            eyebrow="Gợi ý sản phẩm" 
            title={`Mẫu ô dù được yêu thích tại ${area.name}`} 
            subtitle={`Các dòng sản phẩm bền đẹp, chịu được thời tiết đặc thù tại khu vực ${area.name}.`}
          />
          <div className="card-grid four-up">
            {products.map((item) => <ProductCard key={item.slug} item={item} />)}
          </div>
        </Container>
      </section>

      {/* Công trình thực tế */}
      <section className="section">
        <Container>
          <SectionTitle 
            eyebrow="Hình ảnh thực tế" 
            title={`Công trình tham khảo tại ${area.name}`} 
            subtitle={`Xem thêm các mẫu dù đã được ${siteData.brandName} lắp đặt cho quán cafe, sân vườn và resort tại ${area.name}.`}
          />
          <div className="card-grid three-up">
            {projects.map((item) => <ProjectCard key={item.slug} item={item} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Button href="/du-an" variant="secondary">Xem thêm hàng trăm công trình khác</Button>
          </div>
        </Container>
      </section>

      {/* CTA Cuối trang */}
      <section className="section-dark" style={{ background: 'var(--surface-strong)', color: '#fff', textAlign: 'center', padding: '80px 0' }}>
        <Container>
          <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Bạn đang cần tư vấn ô dù tại {area.name}?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', maxWidth: '700px', marginInline: 'auto' }}>
            Gửi ảnh mặt bằng hoặc nhu cầu của bạn qua Zalo để đội ngũ kỹ thuật của {siteData.brandName} hỗ trợ đo đạc và tư vấn mẫu phù hợp nhất.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={siteData.zaloLink} className="button button-primary">Chat Zalo ngay: {siteData.phoneDisplay}</Link>
            <Link href="/bao-gia" className="button button-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Gửi yêu cầu báo giá</Link>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
