import { BaseSchemas } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Button, Container, SectionTitle } from "../../components/ui";
import { siteData } from "../../lib/site-data";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Giới thiệu về ${siteData.brandName} | Xưởng sản xuất ô dù uy tín`,
  description: `Tìm hiểu về ${siteData.brandName}, xưởng sản xuất ô dù ngoài trời, dù lệch tâm hàng đầu Việt Nam. Cam kết giá gốc, bảo hành 2 năm, giao hàng toàn quốc.`,
  alternates: { canonical: "/gioi-thieu" }
};

export default function AboutPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '80px 0', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <SectionTitle
            eyebrow="Câu chuyện thương hiệu"
            title={`Về ${siteData.brandName}`}
            subtitle={`${siteData.brandName} tự hào là đơn vị tiên phong trong lĩnh vực sản xuất và cung cấp giải pháp che nắng ngoài trời chuyên nghiệp. Chúng tôi không chỉ bán ô dù, chúng tôi mang đến giải pháp làm đẹp không gian và bảo vệ sức khỏe cho khách hàng.`}
            align="left"
            as="h1"
          />
        </Container>
      </section>

      {/* Stats Section - Trích xuất từ siteData */}
      <section style={{ marginTop: '-40px' }}>
        <Container>
          <div className="stats-grid" style={{ background: 'var(--primary)', color: '#fff', borderRadius: '32px', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
            {siteData.trustStats.map((stat, index) => (
              <div key={index}>
                <strong style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>{stat.value}</strong>
                <span style={{ fontSize: '16px', opacity: 0.9 }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="content-grid" style={{ gap: '60px' }}>
            <article className="content-card" style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '20px' }}>Tầm nhìn & Sứ mệnh</h2>
              <p style={{ fontSize: '17px', lineHeight: '1.8' }}>{siteData.companySummary}</p>
              <p style={{ fontSize: '17px', lineHeight: '1.8' }}>
                Tại <strong>{siteData.brandName}</strong>, mỗi sản phẩm ô dù đều được kiểm soát khắt khe từ khâu chọn phôi thép khung dù đến chất lượng sợi vải tán dù. Chúng tôi hiểu rằng, một chiếc dù ngoài trời cần phải chịu được sự khắc nghiệt của thời tiết Việt Nam.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link href="/san-pham" className="text-link" style={{ fontWeight: 700 }}>Khám phá các dòng sản phẩm của chúng tôi →</Link>
              </div>
            </article>

            <article className="content-card" style={{ padding: '40px', borderLeft: '4px solid var(--primary)' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Tại sao khách hàng tin chọn Đại Phát?</h2>
              <ul className="check-list" style={{ display: 'grid', gap: '16px' }}>
                <li><strong>Tư vấn trực quan:</strong> Chúng tôi tư vấn mẫu mã dựa trên ảnh mặt bằng thực tế hoặc video hiện trạng của bạn.</li>
                <li><strong>Ảnh thật, việc thật:</strong> Kho dữ liệu hơn 500+ công trình thực tế đã thi công giúp bạn dễ dàng lựa chọn.</li>
                <li><strong>Giá gốc tại xưởng:</strong> Tiết kiệm chi phí trung gian, đảm bảo giá thành tốt nhất đi kèm chất lượng cao nhất.</li>
                <li><strong>Hỗ trợ tận tâm:</strong> Giao hàng toàn quốc an toàn và hỗ trợ kỹ thuật lắp đặt nhanh chóng.</li>
              </ul>
            </article>
          </div>

          {/* Banner Chuyển đổi */}
          <div className="cta-banner" style={{ marginTop: '80px', padding: '50px', background: 'var(--surface-strong)', color: '#fff', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={{ color: '#fff', fontSize: '32px', marginBottom: '16px' }}>Đồng hành cùng không gian của bạn</h2>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>
                Bạn đang băn khoăn về kích thước hay màu sắc dù? Gửi ảnh vị trí ngay, đội ngũ kỹ thuật của Đại Phát sẽ hỗ trợ bạn miễn phí.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Button href={siteData.zaloLink} variant="primary" style={{ border: '2px solid #fff' }}>
                Tư vấn qua Zalo ngay
              </Button>
              <Button href="/bao-gia" variant="secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Nhận bảng báo giá
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .cta-banner { flex-direction: column; text-align: center; padding: 40px 24px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </SiteShell>
  );
}
