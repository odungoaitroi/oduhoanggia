"use client";
import type { Metadata } from "next";
import { ProjectCard } from "../../components/cards";
import { BaseSchemas } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Container, SectionTitle } from "../../components/ui";
import { projects, siteData } from "../../lib/site-data";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Công trình ô dù ngoài trời thực tế | ${siteData.brandName}`,
  description: `Tổng hợp hình ảnh công trình ô dù ngoài trời thực tế: dù lệch tâm quán cafe, dù sân vườn biệt thự, dù che nắng resort. Ảnh thật, việc thật từ ${siteData.brandName}.`,
  alternates: { canonical: "/du-an" }
};

export default function ProjectsPage() {
  // Lấy danh sách các loại hình dự án duy nhất để làm bộ lọc nhanh
  const projectTypes = Array.from(new Set(projects.map(p => p.type)));

  return (
    <SiteShell>
      <BaseSchemas />
      
      {/* Hero Section */}
      <section className="page-hero" style={{ background: 'var(--surface)', padding: '70px 0' }}>
        <Container>
          <SectionTitle
            eyebrow="Dự án thực tế"
            title="Hình ảnh công trình ô dù che nắng toàn quốc"
            subtitle="Tham khảo hơn 500+ công trình thực tế giúp bạn dễ dàng lựa chọn kiểu dáng, màu sắc vải dù và cách bố trí phù hợp nhất cho không gian kinh doanh hoặc gia đình."
            align="left"
            as="h1"
          />
          
          {/* Bộ lọc nhanh (Quick Filter Tags) */}
          <div className="tag-row" style={{ marginTop: '28px' }}>
            <span style={{ background: 'var(--primary)', color: '#fff' }}>Tất cả công trình</span>
            {projectTypes.map((type) => (
              <span key={type} style={{ cursor: 'pointer' }}>{type}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Grid dự án */}
      <section className="section">
        <Container>
          <div className="card-grid three-up">
            {projects.map((item) => (
              <ProjectCard key={item.slug} item={item} />
            ))}
          </div>

          {/* Banner hỗ trợ giữa danh sách */}
          <div className="cta-banner" style={{ marginTop: '60px' }}>
            <div className="cta-content">
              <h2>Bạn muốn xem mẫu dù thực tế tại khu vực của mình?</h2>
              <p>Ô Dù Đại Phát hỗ trợ lắp đặt và giao hàng {siteData.serviceArea}. Nhắn tin Zalo để nhận thêm video thực tế.</p>
            </div>
            <Link href={siteData.zaloLink} className="button button-primary">
              Nhận tư vấn qua Zalo ngay
            </Link>
          </div>
        </Container>
      </section>

      {/* Phần cam kết cuối trang để tăng uy tín */}
      <section className="section-soft">
        <Container>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="emoji-icon">🏗️</span>
              <strong>100% Ảnh thật</strong>
              <p>Mọi hình ảnh đều từ công trình thực tế Đại Phát đã thi công.</p>
            </div>
            <div className="stat-card">
              <span className="emoji-icon">🎨</span>
              <strong>Đa dạng mẫu mã</strong>
              <p>Dù lệch tâm, dù tâm giữa, dù in logo theo yêu cầu thương hiệu.</p>
            </div>
            <div className="stat-card">
              <span className="emoji-icon">🚚</span>
              <strong>Giao hàng nhanh</strong>
              <p>Hệ thống vận chuyển phủ khắp các tỉnh thành toàn quốc.</p>
            </div>
            <div className="stat-card">
              <span className="emoji-icon">💬</span>
              <strong>Tư vấn tận tâm</strong>
              <p>Hỗ trợ khảo sát mặt bằng qua ảnh chụp và video call.</p>
            </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .tag-row span {
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid var(--border);
          font-weight: 700;
          font-size: 14px;
          transition: 0.3s;
          background: #fff;
        }
        .tag-row span:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .cta-banner {
          background: var(--surface-strong);
          color: #fff;
          padding: 40px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .cta-content h2 { color: #fff; margin: 0; font-size: 24px; }
        .cta-content p { color: rgba(255,255,255,0.8); margin: 10px 0 0; }
        
        @media (max-width: 960px) {
          .cta-banner { flex-direction: column; text-align: center; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SiteShell>
  );
}
