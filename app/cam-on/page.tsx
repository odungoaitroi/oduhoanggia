import type { Metadata } from "next";
import { BaseSchemas, BreadcrumbJsonLd } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Cảm ơn bạn đã gửi yêu cầu | ${siteData.brandName}`,
  description: "Ô Dù Đại Phát đã nhận yêu cầu báo giá. Đội ngũ tư vấn sẽ liên hệ sớm qua điện thoại hoặc Zalo.",
  alternates: { canonical: "/cam-on" },
  robots: { index: false, follow: false } // Giữ nguyên để tránh index trang cảm ơn lên Google
};

export default function ThankYouPage() {
  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Cảm ơn", url: "/cam-on" }]} />
      
      <section className="page-hero thank-you-hero" style={{ background: 'var(--surface)', padding: '100px 0' }}>
        <Container>
          <div style={{ maxWidth: '800px' }}>
            <SectionTitle
              eyebrow="Gửi yêu cầu thành công"
              title="Ô Dù Đại Phát đã nhận được thông tin từ bạn!"
              subtitle="Chúng tôi sẽ xử lý yêu cầu và phản hồi sớm nhất trong vòng 5-10 phút (trong giờ làm việc). Để nhận báo giá chính xác và nhanh nhất, bạn có thể chủ động thực hiện các bước dưới đây."
              align="left"
              as="h1"
            />
            
            <div className="next-steps-card" style={{ background: '#fff', padding: '30px', borderRadius: '24px', marginTop: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--primary)' }}>Bạn nên làm gì tiếp theo?</h2>
              <ul className="check-list" style={{ marginBottom: '30px' }}>
                <li><strong>Gửi ảnh mặt bằng:</strong> Nhấn vào nút Zalo bên dưới để gửi ảnh vị trí cần lắp dù.</li>
                <li><strong>Nhận phối màu:</strong> Đội ngũ Đại Phát sẽ gửi cho bạn các mẫu dù phối màu thực tế.</li>
                <li><strong>Kiểm tra điện thoại:</strong> Nhân viên sẽ gọi hoặc nhắn tin tư vấn mẫu phù hợp.</li>
              </ul>

              <div className="page-actions" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link 
                  href={siteData.zaloLink} 
                  className="button button-primary"
                  style={{ padding: '0 32px' }}
                >
                  Nhắn Zalo Gửi Ảnh: {siteData.phoneDisplay}
                </Link>
                <Link 
                  href={`tel:${siteData.phone}`} 
                  className="button button-secondary"
                >
                  Gọi trực tiếp hỗ trợ
                </Link>
              </div>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <p style={{ margin: 0, fontWeight: 700 }}>Hoặc bạn có thể:</p>
              <Link href="/du-an" className="text-link" style={{ fontWeight: 700 }}>Xem thêm công trình thực tế →</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Re-assure Section */}
      <section className="section-soft" style={{ textAlign: 'center' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
            <div>
              <strong style={{ fontSize: '24px', display: 'block', color: 'var(--primary)' }}>{siteData.trustStats[3].value}</strong>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Cam kết bảo hành tận tâm</span>
            </div>
            <div>
              <strong style={{ fontSize: '24px', display: 'block', color: 'var(--primary)' }}>{siteData.trustStats[2].value}</strong>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Giá gốc từ xưởng sản xuất</span>
            </div>
            <div>
              <strong style={{ fontSize: '24px', display: 'block', color: 'var(--primary)' }}>{siteData.trustStats[1].value}</strong>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Hỗ trợ giao hàng toàn quốc</span>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
