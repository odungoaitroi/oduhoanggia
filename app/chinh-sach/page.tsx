import type { Metadata } from "next";
import Link from "next/link";
import { BaseSchemas, BreadcrumbJsonLd } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { policyPages, siteData } from "../../lib/site-data";

export const metadata: Metadata = {
  title: `Chính sách mua hàng & Dịch vụ | ${siteData.brandName}`,
  description: `Thông tin chi tiết về chính sách vận chuyển toàn quốc, quy định bảo hành 24 tháng, đổi trả và bảo mật tại ${siteData.brandName}. Cam kết minh bạch, bảo vệ quyền lợi khách hàng.`,
  alternates: { canonical: "/chinh-sach" }
};

export default function PolicyHubPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Chính sách", url: "/chinh-sach" }]} />
      
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '70px 0', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <SectionTitle
            eyebrow="Quyền lợi khách hàng"
            title="Chính sách & Quy định bán hàng"
            subtitle={`Chào mừng bạn đến với hệ thống chính sách của ${siteData.brandName}. Chúng tôi cam kết cung cấp thông tin minh bạch về vận chuyển, bảo hành và thanh toán để bạn hoàn toàn yên tâm khi đặt mua ô dù ngoài trời, đặc biệt là các đơn hàng giao đi tỉnh xa.`}
            align="left"
            as="h1"
          />
        </Container>
      </section>

      {/* Grid danh sách chính sách */}
      <section className="section">
        <Container>
          <div className="card-grid three-up">
            {policyPages.map((item) => (
              <Link key={item.slug} href={`/chinh-sach/${item.slug}`} className="route-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
                <div style={{ color: 'var(--primary)', fontSize: '24px', marginBottom: '8px' }}>
                  {item.slug === 'van-chuyen' && '🚚'}
                  {item.slug === 'bao-hanh' && '🛡️'}
                  {item.slug === 'doi-tra' && '🔄'}
                  {item.slug === 'thanh-toan' && '💳'}
                  {item.slug === 'bao-mat' && '🔒'}
                </div>
                <strong style={{ fontSize: '20px' }}>{item.title}</strong>
                <span style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6' }}>{item.intro}</span>
                <div style={{ marginTop: 'auto', paddingTop: '16px', fontWeight: 700, color: 'var(--primary)', fontSize: '14px' }}>
                  Xem chi tiết →
                </div>
              </Link>
            ))}
          </div>

          {/* Banner hỗ trợ trực tiếp */}
          <div className="content-card" style={{ marginTop: '60px', textAlign: 'center', background: 'var(--surface)', padding: '50px 30px', borderRadius: '32px', border: '1px dashed var(--primary)' }}>
            <h2 style={{ marginBottom: '16px' }}>Bạn cần giải đáp thêm về điều khoản?</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
              Nếu có bất kỳ thắc mắc nào về quy trình giao hàng hoặc điều kiện bảo hành cho từng mẫu dù cụ thể, đừng ngần ngại liên hệ trực tiếp với đội ngũ hỗ trợ của chúng tôi.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={siteData.zaloLink} className="button button-primary">
                Chat Zalo hỗ trợ: {siteData.phoneDisplay}
              </Link>
              <Link href={`tel:${siteData.phone}`} className="button button-secondary">
                Gọi hotline trực tiếp
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        .route-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid var(--border);
          background: #fff;
        }
        .route-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }
      `}</style>
    </SiteShell>
  );
}
