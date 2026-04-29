"use client";
import type { Metadata } from "next";
import { BaseSchemas, BreadcrumbJsonLd, JsonLd } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Breadcrumbs, Button, Container, SectionTitle } from "../../components/ui";
import { YoutubeGallery } from "../../components/youtube-gallery";
import { guideVideos } from "../../lib/video-data";
import { getYoutubeEmbedUrl, getYoutubeId, getYoutubeThumbnail, getYoutubeWatchUrl } from "../../lib/youtube";
import { siteData } from "../../lib/site-data";
import { getZaloWebUrl } from "../../lib/zalo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Video hướng dẫn sửa chữa ô dù, thay vải, sửa tay quay | Ô Dù Đại Phát",
  description:
    "Tổng hợp video hướng dẫn sửa dù lệch tâm, dù chính tâm, thay vải dù, sửa tay quay và bảo trì ô dù cafe tại xưởng Ô Dù Đại Phát.",
  alternates: {
    canonical: "/huong-dan"
  },
  openGraph: {
    title: "Video hướng dẫn kỹ thuật & Bảo trì ô dù ngoài trời",
    description:
      "Hướng dẫn chi tiết cách xử lý lỗi thường gặp, thay linh kiện và bảo trì ô dù giúp tăng tuổi thọ sản phẩm.",
    url: `${siteData.domain}/huong-dan`,
    type: "website",
    images: [
      {
        url: siteData.socialImage,
        width: 1200,
        height: 630,
        alt: "Video hướng dẫn sửa chữa và bảo trì ô dù Ô Dù Đại Phát"
      }
    ]
  }
};

type VideoObjectSchema = {
  "@context": "https://schema.org";
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate?: string;
  embedUrl: string;
  contentUrl: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
};

function getVideoSchemas(): VideoObjectSchema[] {
  return guideVideos.flatMap((video) => {
    const youtubeId = getYoutubeId(video.youtubeUrl, video.youtubeId);
    if (!youtubeId) return [];

    const schema: VideoObjectSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.description || video.title,
      thumbnailUrl: getYoutubeThumbnail(video.youtubeUrl, video.youtubeId),
      embedUrl: getYoutubeEmbedUrl(video.youtubeUrl, video.youtubeId),
      contentUrl: getYoutubeWatchUrl(video.youtubeUrl, video.youtubeId),
      publisher: {
        "@type": "Organization",
        name: siteData.brandName,
        logo: {
          "@type": "ImageObject",
          url: `${siteData.domain}/favicon.svg`
        }
      }
    };

    if (video.uploadDate) {
      schema.uploadDate = video.uploadDate;
    }

    return [schema];
  });
}

export default function GuideVideoPage() {
  const videoSchemas = getVideoSchemas();

  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Video hỗ trợ kỹ thuật", url: "/huong-dan" }
        ]}
      />
      {videoSchemas.length > 0 ? <JsonLd data={videoSchemas} /> : null}

      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Video hỗ trợ kỹ thuật" }
            ]}
          />
          <SectionTitle
            eyebrow="Hỗ trợ sau bán hàng"
            title="Video hướng dẫn kỹ thuật & Bảo trì ô dù"
            subtitle="Đội ngũ kỹ thuật Ô Dù Đại Phát tổng hợp các video thực tế giúp bạn dễ dàng tự thay vải dù, sửa tay quay hoặc bảo trì khung dù tại nhà một cách chuẩn xác nhất."
            align="left"
            as="h1"
          />
          <div className="page-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
              💬 Chat Zalo nhận video hướng dẫn
            </Button>
            <Button href={`tel:${siteData.phone}`} variant="secondary">
              📞 Gọi kỹ thuật: {siteData.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>

      {/* Grid Video chính */}
      <section className="section">
        <Container>
          <YoutubeGallery
            videos={guideVideos}
            title="Thư viện video kỹ thuật thực tế"
            subtitle="Tập trung vào các kỹ năng: thay vải dù, thay dây cáp, sửa bộ tời tay quay và các mẹo bảo trì khung dù bền đẹp lâu dài."
          />
        </Container>
      </section>

      {/* Khối hỗ trợ tư vấn qua Video - Tăng tỷ lệ Zalo */}
      <section className="section-soft">
        <Container>
          <div className="content-card" style={{ background: 'var(--surface-strong)', color: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center' }}>
            <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '16px' }}>Ô dù của bạn gặp vấn đề không có trong video?</h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 32px' }}>
              Đừng lo lắng, hãy quay một đoạn video ngắn về hiện trạng của chiếc dù và gửi qua Zalo cho chúng tôi. Đội ngũ kỹ thuật Đại Phát sẽ xem và hướng dẫn bạn cách xử lý miễn phí.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={getZaloWebUrl(siteData.phone)} className="button button-primary" style={{ border: '2px solid #fff' }}>
                Gửi Video qua Zalo ngay
              </Link>
              <Link href="/bao-gia" className="button button-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Mua linh kiện thay thế
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="content-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
             <div className="content-card">
                <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Dịch vụ thay vải dù</h3>
                <p>Đại Phát cung cấp vải dù thay thế cao cấp cho mọi dòng dù lệch tâm, dù chính tâm với màu sắc đa dạng và hỗ trợ in ấn logo theo yêu cầu.</p>
             </div>
             <div className="content-card">
                <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Linh kiện chính hãng</h3>
                <p>Sẵn kho bát dù, dây cáp, tay quay, nan dù... dành riêng cho các dòng dù do Đại Phát sản xuất và phân phối toàn quốc.</p>
             </div>
             <div className="content-card">
                <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Bảo trì định kỳ</h3>
                <p>Chúng tôi hướng dẫn cách tra dầu, vệ sinh khung và bảo quản vải dù giúp tăng tuổi thọ sản phẩm lên đến hơn 5 năm sử dụng.</p>
             </div>
          </div>
        </Container>
      </section>

      <style jsx>{`
        @media (max-width: 760px) {
          .page-actions .button { width: 100%; }
        }
      `}</style>
    </SiteShell>
  );
}
