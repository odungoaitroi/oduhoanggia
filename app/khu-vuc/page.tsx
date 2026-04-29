import type { Metadata } from "next";
import { AreaCard } from "../../components/cards";
import { BaseSchemas } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { areas, siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Khu vực giao hàng ô dù ngoài trời | ${siteData.brandName}`,
  description: `Ô Dù Đại Phát hỗ trợ giao hàng và lắp đặt ô dù ngoài trời tại Hà Nội, TP.HCM, Đà Nẵng và toàn quốc. Tư vấn mẫu dù phù hợp theo ảnh thực tế mặt bằng.`,
  alternates: { canonical: "/khu-vuc" }
};

export default function AreasPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '70px 0' }}>
        <Container>
          <SectionTitle
            eyebrow="Phạm vi phục vụ"
            title="Giao hàng & Hỗ trợ lắp đặt toàn quốc"
            subtitle={`Dù bạn ở bất kỳ tỉnh thành nào, ${siteData.brandName} đều hỗ trợ vận chuyển tận nơi. Khách ở xa chỉ cần gửi ảnh vị trí qua Zalo để đội ngũ tư vấn mẫu dù, kích thước và màu sắc tối ưu nhất.`}
            align="left"
            as="h1"
          />
          <div className="hero-actions" style={{ marginTop: '28px' }}>
            <Link href={siteData.zaloLink} className="button button-primary">
              Nhận tư vấn khu vực của bạn
            </Link>
            <Link href="/chinh-sach/van-chuyen" className="button button-secondary">
              Xem chính sách vận chuyển
            </Link>
          </div>
        </Container>
      </section>

      {/* Grid danh sách khu vực trọng điểm */}
      <section className="section">
        <Container>
          <div className="split-heading" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Khu vực trọng điểm</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '500px' }}>
              Danh sách các tỉnh thành Ô Dù Đại Phát thường xuyên triển khai lắp đặt cho quán cafe, nhà hàng và resort.
            </p>
          </div>
          
          <div className="card-grid four-up">
            {areas.map((item) => (
              <AreaCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cam kết vận chuyển toàn quốc */}
      <section className="section-dark" style={{ background: 'var(--surface-strong)', color: '#fff', padding: '60px 0' }}>
        <Container>
          <div className="hero-grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '60px' }}>
            <div>
              <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '20px' }}>Làm sao để đặt dù khi bạn ở xa?</h2>
              <ul className="check-list" style={{ color: 'rgba(255,255,255,0.8)' }}>
                <li style={{ marginBottom: '12px' }}><strong>Bước 1:</strong> Gửi ảnh mặt bằng cần che nắng qua Zalo {siteData.phoneDisplay}.</li>
                <li style={{ marginBottom: '12px' }}><strong>Bước 2:</strong> Nhận tư vấn mẫu dù và phối cảnh màu sắc phù hợp không gian.</li>
                <li style={{ marginBottom: '12px' }}><strong>Bước 3:</strong> Chốt số lượng và nhận báo giá chi tiết phí vận chuyển.</li>
                <li style={{ marginBottom: '12px' }}><strong>Bước 4:</strong> Đại Phát đóng gói kỹ lưỡng và giao hàng qua hệ thống vận chuyển chuyên nghiệp.</li>
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '40px', borderRadius: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '24px', marginBottom: '10px' }}>{siteData.trustStats[1].value}</h3>
              <p style={{ fontSize: '18px' }}>Hỗ trợ vận chuyển an toàn tới 63 tỉnh thành.</p>
              <hr style={{ margin: '20px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
              <p>Mọi sản phẩm đều được kiểm tra kỹ lưỡng và bọc lót chống trầy xước trước khi xuất xưởng.</p>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .split-heading { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </SiteShell>
  );
}
