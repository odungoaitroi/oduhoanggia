"use client";
import type { Metadata } from "next";
import { ArticleCard } from "../../components/cards";
import { BaseSchemas } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { articles, siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Kinh nghiệm chọn ô dù ngoài trời | ${siteData.brandName}`,
  description: `Tổng hợp kinh nghiệm chọn mua ô dù ngoài trời, báo giá dù quán cafe, dù sân vườn và dù lệch tâm. Tư vấn kỹ thuật và cách sử dụng bền đẹp từ chuyên gia ${siteData.brandName}.`,
  alternates: { canonical: "/kien-thuc" },
  openGraph: {
    title: `Cẩm nang ô dù ngoài trời - ${siteData.brandName}`,
    description: `Tư vấn chọn mua và sử dụng ô dù ngoài trời hiệu quả, bền đẹp.`,
    type: "website",
  }
};

export default function ArticlesPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      
      {/* Hero Section - Tăng tính chuyên gia */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '70px 0', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <SectionTitle
            eyebrow="Cẩm nang & Kinh nghiệm"
            title="Tư vấn chọn ô dù ngoài trời từ chuyên gia"
            subtitle={`Các bài viết chia sẻ thực tế giúp bạn chọn đúng mẫu dù, tối ưu chi phí và nắm rõ cách vận hành bền bỉ cho không gian của mình. Mọi kiến thức đều được đúc kết từ hơn 500+ công trình của ${siteData.brandName}.`}
            align="left"
            as="h1"
          />
          
          {/* Nút hỗ trợ nhanh cho người đang tìm hiểu */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <Link href={siteData.zaloLink} className="button button-primary">
              Nhận tư vấn mẫu dù phù hợp qua Zalo
            </Link>
            <Link href="/bao-gia" className="button button-secondary">
              Xem bảng báo giá mới nhất
            </Link>
          </div>
        </Container>
      </section>

      {/* Danh sách bài viết */}
      <section className="section">
        <Container>
          <div className="card-grid three-up">
            {articles.map((item) => (
              <ArticleCard key={item.slug} item={item} />
            ))}
          </div>

          {/* Box cam kết hỗ trợ cuối danh sách bài viết */}
          <div className="content-card" style={{ marginTop: '60px', background: 'var(--surface)', borderLeft: '5px solid var(--primary)', padding: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '26px', marginBottom: '15px' }}>Bạn vẫn còn thắc mắc về kỹ thuật?</h2>
                <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '0' }}>
                  Ngoài các bài viết chia sẻ, đội ngũ kỹ thuật của {siteData.brandName} luôn sẵn sàng hỗ trợ khảo sát mặt bằng qua ảnh chụp và tư vấn trực tiếp 24/7. Đừng ngần ngại liên hệ để chọn được sản phẩm ưng ý nhất.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Link 
                  href={`tel:${siteData.phone}`} 
                  className="button button-secondary" 
                  style={{ width: '100%', marginBottom: '12px', display: 'block' }}
                >
                  Gọi hotline: {siteData.phoneDisplay}
                </Link>
                <Link 
                  href={siteData.zaloLink} 
                  className="button button-primary" 
                  style={{ width: '100%', display: 'block' }}
                >
                  Chat Zalo ngay
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Phần liên kết nhanh hỗ trợ SEO */}
      <section className="section-soft" style={{ padding: '60px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Tìm kiếm nhiều nhất</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              <Link href="/san-pham/du-lech-tam" className="pill">Dù lệch tâm</Link>
              <Link href="/san-pham/du-quan-cafe" className="pill">Dù quán cafe</Link>
              <Link href="/san-pham/du-san-vuon" className="pill">Dù sân vườn</Link>
              <Link href="/du-an" className="pill">Công trình thực tế</Link>
              <Link href="/khu-vuc/ha-noi" className="pill">Ô dù Hà Nội</Link>
              <Link href="/khu-vuc/tp-hcm" className="pill">Ô dù TP.HCM</Link>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 860px) {
          .content-card div { grid-template-columns: 1fr !important; gap: 24px !important; text-align: center; }
        }
      `}</style>
    </SiteShell>
  );
}
