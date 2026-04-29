import type { Metadata } from "next";
import { CategoryCard, ProductCard } from "../../components/cards";
import { BaseSchemas, BreadcrumbJsonLd, ProductJsonLd } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { productCategories, products, siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Sản phẩm ô dù ngoài trời | ${siteData.brandName}`,
  description: `Xưởng Ô Dù Đại Phát cung cấp các dòng dù ngoài trời, dù lệch tâm, dù quán cafe, dù sân vườn bền đẹp. Giá tại xưởng, bảo hành 24 tháng, giao hàng toàn quốc.`,
  alternates: { canonical: "/san-pham" }
};

export default function ProductsPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Sản phẩm", url: "/san-pham" }]} />
      <ProductJsonLd items={products} />
      
      {/* Hero Section - Nhấn mạnh vào dịch vụ tư vấn */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '70px 0' }}>
        <Container>
          <SectionTitle
            eyebrow="Danh mục sản phẩm"
            title="Các mẫu ô dù ngoài trời bền đẹp, giá tại xưởng"
            subtitle={`Chọn mẫu dù phù hợp cho không gian của bạn từ xưởng sản xuất ${siteData.brandName}. Chúng tôi hỗ trợ tư vấn kích thước và phối màu theo ảnh chụp mặt bằng thực tế qua Zalo.`}
            align="left"
            as="h1"
          />
          <div className="hero-actions" style={{ marginTop: '32px' }}>
            <Link href={siteData.zaloLink} className="button button-primary">
              Nhận tư vấn mẫu & Báo giá nhanh
            </Link>
            <Link href="/du-an" className="button button-secondary">
              Xem ảnh công trình thực tế
            </Link>
          </div>
        </Container>
      </section>

      {/* Danh mục sản phẩm - Dùng CategoryCard */}
      <section className="section">
        <Container>
          <div className="split-heading" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Nhóm sản phẩm tiêu biểu</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '500px' }}>
              Phân loại ô dù theo công năng sử dụng giúp bạn dễ dàng tìm kiếm giải pháp che nắng tối ưu nhất.
            </p>
          </div>
          <div className="card-grid four-up">
            {productCategories.map((item) => (
              <CategoryCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Banner cam kết chất lượng */}
      <section className="section-soft" style={{ background: 'var(--surface-strong)', color: '#fff', textAlign: 'center' }}>
        <Container>
          <div className="cta-banner" style={{ border: 'none', background: 'transparent', margin: 0 }}>
            <div className="cta-content">
              <h2 style={{ color: '#fff' }}>Tại sao khách hàng chọn Ô Dù Đại Phát?</h2>
              <div className="stats-grid" style={{ marginTop: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div style={{ padding: '20px' }}>
                  <strong style={{ fontSize: '24px', display: 'block', color: 'var(--primary)' }}>{siteData.trustStats[2].value}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Sản xuất tại xưởng, không trung gian</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <strong style={{ fontSize: '24px', display: 'block', color: 'var(--primary)' }}>{siteData.trustStats[3].value}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Cam kết độ bền khung và vải dù</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <strong style={{ fontSize: '24px', display: 'block', color: 'var(--primary)' }}>{siteData.trustStats[1].value}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>Giao hàng nhanh 63 tỉnh thành</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tất cả mẫu dù - Dùng ProductCard */}
      <section className="section">
        <Container>
          <SectionTitle
            eyebrow="Bộ sưu tập"
            title="Các mẫu ô dù ngoài trời phổ biến nhất"
            subtitle="Tổng hợp các dòng dù lệch tâm, dù tâm giữa và dù quảng cáo được nhiều quán cafe, resort và biệt thự tin dùng."
          />
          <div className="card-grid four-up">
            {products.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <div style={{ display: 'inline-block', padding: '30px', background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '15px' }}>Bạn cần in ấn logo thương hiệu lên dù?</h3>
              <p style={{ marginBottom: '20px', color: 'var(--muted)' }}>Đại Phát hỗ trợ thiết kế và in ấn logo sắc nét, bền màu theo yêu cầu của chuỗi quán cafe và doanh nghiệp.</p>
              <Link href={siteData.zaloLink} className="button button-primary">
                Gửi mẫu Logo qua Zalo tư vấn
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 760px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .hero-actions .button { width: 100%; margin-bottom: 10px; }
        }
      `}</style>
    </SiteShell>
  );
}
