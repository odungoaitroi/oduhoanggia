import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "../../../components/cards";
import { BaseSchemas, BreadcrumbJsonLd, JsonLd } from "../../../components/schema";
import { SiteShell } from "../../../components/site-shell";
import { Breadcrumbs, Button, Container, SectionTitle } from "../../../components/ui";
import { articles, getArticle, getRelatedProducts, siteData } from "../../../lib/site-data";

export function generateStaticParams() { 
  return articles.map((item) => ({ slug: item.slug })); 
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticle(params.slug); 
  if (!article) return {};
  return { 
    title: `${article.title} | Tư vấn từ ${siteData.brandName}`, 
    description: article.seoDescription, 
    alternates: { canonical: `/kien-thuc/${article.slug}` }, 
    openGraph: { 
      title: article.seoTitle, 
      description: article.seoDescription, 
      url: `${siteData.domain}/kien-thuc/${article.slug}`, 
      type: "article",
      images: [{ url: article.image || "/og-image.jpg" }]
    } 
  };
}

function renderParagraph(text: string) {
  return text.split(/(\/san-pham\/[a-z0-9-]+|\/san-pham|\/kien-thuc\/[a-z0-9-]+|\/bao-gia|\/du-an)/g).map((part, index) => 
    part.startsWith("/") ? <Link key={`${part}-${index}`} href={part} className="inline-text-link">{part.replace(/^\//, "")}</Link> : part
  );
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug); 
  if (!article) notFound();
  
  const relatedProducts = getRelatedProducts(article.relatedProductSlugs);
  
  const articleSchema = { 
    "@context": "https://schema.org", 
    "@type": "Article", 
    "headline": article.title, 
    "description": article.seoDescription, 
    "image": article.image || `${siteData.domain}/og-image.jpg`,
    "inLanguage": "vi-VN", 
    "mainEntityOfPage": `${siteData.domain}/kien-thuc/${article.slug}`, 
    "author": { "@type": "Organization", name: siteData.brandName, url: siteData.domain }, 
    "publisher": { 
      "@type": "Organization", 
      "name": siteData.brandName, 
      "logo": { "@type": "ImageObject", "url": `${siteData.domain}/favicon.svg` } 
    } 
  };

  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd items={[
        { name: "Trang chủ", url: "/" }, 
        { name: "Kiến thức", url: "/kien-thuc" }, 
        { name: article.title, url: `/kien-thuc/${article.slug}` }
      ]} />
      <JsonLd data={articleSchema} />

      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <Container>
          <Breadcrumbs items={[
            { label: "Trang chủ", href: "/" }, 
            { label: "Kiến thức", href: "/kien-thuc" }, 
            { label: article.title }
          ]} />
          <div className="article-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
            <SectionTitle 
              eyebrow={`Chủ đề: ${article.topic}`} 
              title={article.title} 
              subtitle={article.excerpt} 
              align="left" 
              as="h1" 
            />
            <div className="page-actions" style={{ display: 'flex', gap: '12px' }}>
              <Button href={siteData.zaloLink} external variant="primary">💬 Chat Zalo tư vấn ngay</Button>
              <Button href="/bao-gia" variant="secondary">Nhận báo giá sản phẩm</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="article-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '50px', alignItems: 'start' }}>
            
            <article className="article-content">
              {/* Mục lục nhanh */}
              <div className="table-of-contents" style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', marginBottom: '40px', border: '1px solid var(--border)' }}>
                <p style={{ fontWeight: 700, marginBottom: '12px', fontSize: '18px' }}>Nội dung chính bài viết:</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {article.content.map((block, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      <a href={`#section-${index}`} style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '15px' }}>
                        {index + 1}. {block.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Render các khối nội dung */}
              {article.content.map((block, index) => (
                <section key={index} id={`section-${index}`} className="article-block" style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '26px', color: 'var(--primary)', marginBottom: '20px' }}>{block.heading}</h2>
                  {block.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px' }}>
                      {renderParagraph(paragraph)}
                    </p>
                  ))}
                  {block.bullets ? (
                    <ul className="check-list" style={{ marginTop: '20px' }}>
                      {block.bullets.map((item) => <li key={item} style={{ marginBottom: '10px' }}>{item}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}

              {/* Box Cam kết chốt hạ bài viết */}
              <div className="mini-cta-box" style={{ background: 'var(--surface-strong)', color: '#fff', padding: '32px', borderRadius: '24px', marginTop: '50px' }}>
                <h3 style={{ color: '#fff', marginBottom: '12px' }}>Bạn cần tư vấn chi tiết hơn?</h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '20px' }}>
                  Đội ngũ kỹ thuật của <strong>{siteData.brandName}</strong> luôn sẵn sàng hỗ trợ khảo sát mặt bằng và tư vấn mẫu ô dù tối ưu nhất cho không gian của bạn.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Button href={siteData.zaloLink} external variant="primary" style={{ border: '2px solid #fff' }}>
                    Nhắn Zalo: {siteData.phoneDisplay}
                  </Button>
                  <Button href={`tel:${siteData.phone}`} variant="secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                    📞 Gọi tư vấn trực tiếp
                  </Button>
                </div>
              </div>
            </article>

            {/* Cột bên phải (Sidebar) */}
            <aside className="article-sidebar" style={{ position: 'sticky', top: '100px' }}>
              <div style={{ padding: '24px', background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Dịch vụ tại Đại Phát</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', display: 'grid', gap: '12px' }}>
                  <li>✅ Giá gốc tại xưởng sản xuất</li>
                  <li>✅ Bảo hành khung & vải 12 tháng</li>
                  <li>✅ Hỗ trợ in logo thương hiệu</li>
                  <li>✅ Giao hàng toàn quốc an toàn</li>
                </ul>
                <hr style={{ margin: '20px 0', borderColor: 'var(--border)' }} />
                <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '15px' }}>
                  Mọi sản phẩm của {siteData.brandName} đều được kiểm tra kỹ lưỡng trước khi xuất xưởng.
                </p>
                <Button href="/bao-gia" style={{ width: '100%' }}>Xem bảng giá tổng hợp</Button>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* Sản phẩm liên quan */}
      <section className="section section-soft">
        <Container>
          <SectionTitle 
            eyebrow="Gợi ý mua sắm" 
            title="Các mẫu ô dù phù hợp với bạn" 
            subtitle="Dựa trên nội dung bạn vừa xem, đây là những mẫu ô dù ngoài trời được nhiều khách hàng ưu tiên lựa chọn."
          />
          <div className="card-grid four-up">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .article-layout { grid-template-columns: 1fr !important; }
          .article-sidebar { display: none; }
        }
      `}</style>
    </SiteShell>
  );
}
