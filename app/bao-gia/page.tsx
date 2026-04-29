"use client";
import type { Metadata } from "next";
import { LeadForm } from "../../components/lead-form";
import { BaseSchemas } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Báo giá ô dù ngoài trời | ${siteData.brandName}`,
  description: `Nhận báo giá ô dù ngoài trời, dù quán cafe, dù sân vườn, dù lệch tâm và dù quảng cáo. Tư vấn nhanh qua Zalo, báo giá rõ ràng theo nhu cầu thực tế.`,
  alternates: { canonical: "/bao-gia" }
};

export default function QuotePage() {
  return (
    <SiteShell>
      <BaseSchemas />
      
      {/* Header Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <Container>
          <SectionTitle
            eyebrow="Báo giá nhanh"
            title="Nhận báo giá ô dù ngoài trời nhanh qua Zalo"
            subtitle={`Gửi nhu cầu, ảnh vị trí hoặc kích thước khu vực cần che nắng. ${siteData.brandName} sẽ tư vấn mẫu phù hợp và báo giá rõ ràng cho quán cafe, nhà hàng, sân vườn hoặc công trình của bạn.`}
            align="left"
            as="h1"
          />
          <div style={{ marginTop: '24px' }}>
            <Link 
              href={siteData.zaloLink}
              className="button button-primary"
              style={{ padding: '0 40px', fontSize: '18px' }}
            >
              Chat Zalo Báo Giá Ngay: {siteData.phoneDisplay}
            </Link>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'start' }}>
            
            <div className="content-left">
              {/* Hướng dẫn chuẩn bị */}
              <article className="content-card" style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px', color: 'var(--primary)' }}>
                  Để nhận báo giá chính xác, bạn nên cung cấp:
                </h2>
                <ul className="check-list">
                  <li><strong>Ảnh thực tế:</strong> Vị trí cần lắp hoặc khu vực cần che phủ.</li>
                  <li><strong>Nhu cầu:</strong> Sử dụng cho quán cafe, sân vườn, resort hay quảng cáo.</li>
                  <li><strong>Kích thước:</strong> Diện tích dự kiến hoặc số lượng ô dù cần thiết.</li>
                  <li><strong>Yêu cầu riêng:</strong> Màu sắc vải dù, in ấn logo thương hiệu.</li>
                </ul>
              </article>

              {/* Quy trình làm việc */}
              <article className="content-card">
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Quy trình nhận báo giá</h2>
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span style={{ background: 'var(--primary)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700 }}>1</span>
                    <p>Khách hàng gửi thông tin nhu cầu qua Form hoặc Zalo.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span style={{ background: 'var(--primary)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700 }}>2</span>
                    <p>Nhân viên {siteData.brandName} liên hệ tư vấn mẫu dù và chất liệu phù hợp.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <span style={{ background: 'var(--primary)', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0, fontWeight: 700 }}>3</span>
                    <p>Gửi bảng báo giá chi tiết kèm chi phí vận chuyển, lắp đặt (nếu có).</p>
                  </div>
                </div>
              </article>
              
              {/* Cam kết */}
              <div style={{ marginTop: '32px', padding: '20px', borderLeft: '4px solid var(--primary)', background: 'var(--surface)' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  * Cam kết giá tại xưởng, bảo hành lên tới 24 tháng. Hỗ trợ giao hàng {siteData.trustStats[1].value} nhanh chóng.
                </p>
              </div>
            </div>

            <aside className="content-right" style={{ position: 'sticky', top: '100px' }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
                <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Gửi thông tin nhận báo giá</h3>
                <LeadForm />
                <p style={{ fontSize: '13px', textAlign: 'center', marginTop: '15px', color: 'var(--muted)' }}>
                  Thông tin của bạn được bảo mật tuyệt đối.
                </p>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* CSS bổ sung trực tiếp cho trang này nếu cần */}
      <style jsx>{`
        @media (max-width: 960px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .content-right { position: static !important; }
        }
      `}</style>
    </SiteShell>
  );
}
