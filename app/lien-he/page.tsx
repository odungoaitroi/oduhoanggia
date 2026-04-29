import type { Metadata } from "next";
import { LeadForm } from "../../components/lead-form";
import { BaseSchemas } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Button, Container, SectionTitle } from "../../components/ui";
import { siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Liên hệ | ${siteData.brandName}`,
  description: `Liên hệ ${siteData.brandName} tại hotline ${siteData.phoneDisplay} để nhận tư vấn và báo giá ô dù ngoài trời, dù quán cafe, dù sân vườn, dù lệch tâm. Hỗ trợ giao hàng toàn quốc nhanh chóng.`,
  alternates: { canonical: "/lien-he" }
};

export default function ContactPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <SectionTitle
            eyebrow="Kết nối với Đại Phát"
            title="Liên hệ tư vấn & Báo giá ô dù nhanh"
            subtitle="Bạn chỉ cần gửi ảnh vị trí hoặc nhu cầu sử dụng, đội ngũ kỹ thuật của Ô Dù Đại Phát sẽ tư vấn mẫu mã, kích thước và màu sắc phù hợp nhất với không gian của bạn."
            align="left"
            as="h1"
          />
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="lead-grid">
            <div className="lead-panel" style={{ padding: '40px', background: 'var(--surface-strong)', color: '#fff', borderRadius: '32px' }}>
              <p className="eyebrow eyebrow-on-dark" style={{ color: 'var(--primary)', fontWeight: 800 }}>Hỗ trợ 24/7</p>
              <h2 className="section-title-inline" style={{ color: '#fff', fontSize: '28px', marginBottom: '20px' }}>Thông tin liên hệ trực tiếp</h2>
              
              <div style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', opacity: 0.7, textTransform: 'uppercase' }}>Hotline & Zalo</strong>
                  <Link href={`tel:${siteData.phone}`} style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{siteData.phoneDisplay}</Link>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', opacity: 0.7, textTransform: 'uppercase' }}>Email hỗ trợ</strong>
                  <p style={{ fontSize: '18px', margin: 0 }}>{siteData.email}</p>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', opacity: 0.7, textTransform: 'uppercase' }}>Phạm vi phục vụ</strong>
                  <p style={{ fontSize: '18px', margin: 0 }}>Hỗ trợ giao hàng & Lắp đặt {siteData.trustStats[1].value}</p>
                </div>
              </div>

              <div className="hero-actions" style={{ display: 'grid', gap: '12px' }}>
                <Button href={siteData.zaloLink} variant="primary" external style={{ width: '100%', background: '#fff', color: 'var(--primary)' }}>
                  💬 Nhắn Zalo gửi ảnh mặt bằng
                </Button>
                <Button href={`tel:${siteData.phone}`} style={{ width: '100%', border: '1px solid rgba(255,255,255,0.3)' }}>
                  📞 Gọi điện tư vấn ngay
                </Button>
              </div>

              <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', fontSize: '14px' }}>
                <p style={{ margin: 0 }}>💡 <strong>Mẹo nhỏ:</strong> Khách hàng thường nhận được báo giá sát nhất khi cung cấp đủ ảnh chụp thực tế và kích thước khu vực cần che nắng.</p>
              </div>
            </div>

            <div className="form-container" style={{ background: '#fff', padding: '40px', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ fontSize: '22px', marginBottom: '20px', textAlign: 'center' }}>Gửi yêu cầu gọi lại</h3>
              <LeadForm />
              <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginTop: '20px' }}>
                Mọi thông tin liên hệ đều được bảo mật và xử lý trong vòng 10 phút.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Local SEO Section */}
      <section className="section-soft" style={{ padding: '60px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Xưởng Ô Dù Đại Phát phục vụ toàn quốc</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
              Chúng tôi có hệ thống vận chuyển chuyên nghiệp tới 63 tỉnh thành, đặc biệt là các khu vực trọng điểm:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              <Link href="/khu-vuc/ha-noi" className="pill">Hà Nội</Link>
              <Link href="/khu-vuc/tp-hcm" className="pill">TP. Hồ Chí Minh</Link>
              <Link href="/khu-vuc/da-nang" className="pill">Đà Nẵng</Link>
              <Link href="/khu-vuc/hai-phong" className="pill">Hải Phòng</Link>
              <Link href="/khu-vuc/nha-trang" className="pill">Nha Trang</Link>
              <Link href="/khu-vuc/can-tho" className="pill">Cần Thơ</Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
