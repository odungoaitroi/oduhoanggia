import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BaseSchemas, JsonLd } from "../../../components/schema";
import { SiteShell } from "../../../components/site-shell";
import { Breadcrumbs, Container, SectionTitle, Button } from "../../../components/ui";
import { getPolicyPage, policyPages, siteData } from "../../../lib/site-data";
import Link from "next/link";

export function generateStaticParams() {
  return policyPages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const policy = getPolicyPage(params.slug);
  if (!policy) return {};
  return {
    title: `${policy.seoTitle} | ${siteData.brandName}`,
    description: policy.seoDescription,
    alternates: { canonical: `/chinh-sach/${policy.slug}` },
    openGraph: {
      title: policy.seoTitle,
      description: policy.seoDescription,
      type: "article",
    }
  };
}

export default function PolicyDetailPage({ params }: { params: { slug: string } }) {
  const policy = getPolicyPage(params.slug);
  if (!policy) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": policy.title,
    "description": policy.seoDescription,
    "publisher": {
      "@type": "Organization",
      "name": siteData.brandName,
      "logo": { "@type": "ImageObject", "url": `${siteData.domain}/favicon.svg` }
    },
    "url": `${siteData.domain}/chinh-sach/${policy.slug}`
  };

  return (
    <SiteShell>
      <BaseSchemas />
      <JsonLd data={schema} />
      
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <Breadcrumbs items={[
            { label: "Trang chủ", href: "/" }, 
            { label: "Chính sách", href: "/chinh-sach" }, 
            { label: policy.title }
          ]} />
          <SectionTitle 
            eyebrow="Thông tin minh bạch" 
            title={policy.title} 
            subtitle={policy.intro} 
            align="left" 
            as="h1" 
          />
        </Container>
      </section>

      {/* Chi tiết nội dung chính sách */}
      <section className="section">
        <Container>
          <div className="policy-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '50px', alignItems: 'start' }}>
            
            <article className="article-detail content-card" style={{ padding: '40px' }}>
              {policy.sections.map((block, index) => (
                <section key={index} className="article-block" style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '24px', color: 'var(--primary)', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    {block.heading}
                  </h2>
                  {block.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx} style={{ fontSize: '16px', lineHeight: '1.7', marginBottom: '12px', color: 'var(--text)' }}>
                      {paragraph}
                    </p>
                  ))}
                  {block.bullets ? (
                    <ul className="check-list" style={{ marginTop: '16px' }}>
                      {block.bullets.map((item, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: '8px', fontSize: '16px' }}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {/* Khối chốt hạ niềm tin cuối trang */}
              <div style={{ marginTop: '40px', padding: '24px', background: 'var(--surface)', borderRadius: '16px', borderLeft: '4px solid var(--primary)' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  * {siteData.brandName} cam kết thực hiện đúng các điều khoản nêu trên để đảm bảo quyền lợi tốt nhất cho khách hàng. Mọi hỗ trợ vui lòng liên hệ Hotline {siteData.phoneDisplay}.
                </p>
              </div>
            </article>

            {/* Cột hỗ trợ nhanh (Sidebar) */}
            <aside className="policy-sidebar" style={{ position: 'sticky', top: '100px' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Hỗ trợ trực tuyến</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '20px' }}>
                  Nếu bạn cần giải thích rõ hơn về <strong>{policy.title.toLowerCase()}</strong>, hãy nhắn tin ngay cho đội ngũ Đại Phát.
                </p>
                <Link 
                  href={siteData.zaloLink} 
                  className="button button-primary" 
                  style={{ width: '100%', marginBottom: '12px', display: 'block', textAlign: 'center' }}
                >
                  Chat Zalo ngay
                </Link>
                <Link 
                  href={`tel:${siteData.phone}`} 
                  className="button button-secondary" 
                  style={{ width: '100%', display: 'block', textAlign: 'center' }}
                >
                  Gọi: {siteData.phoneDisplay}
                </Link>
              </div>

              <div style={{ marginTop: '24px', padding: '10px' }}>
                <Link href="/chinh-sach" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)' }}>
                  ← Xem các chính sách khác
                </Link>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .policy-layout { grid-template-columns: 1fr !important; }
          .policy-sidebar { display: none; }
          .article-detail { padding: 24px !important; }
        }
      `}</style>
    </SiteShell>
  );
}
