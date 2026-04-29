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
  title: "Video sửa chữa ô dù, sửa dù lệch tâm, thay vải dù | Ô Dù Đại Phát",
  description: "Tổng hợp video kỹ thuật thực tế về sửa chữa ô dù lệch tâm, dù chính tâm, thay vải dù và bảo trì ô dù cafe từ xưởng Ô Dù Đại Phát.",
  alternates: {
    canonical: "/video-huong-dan"
  },
  openGraph: {
    title: "Video thực tế hướng dẫn sửa chữa và bảo trì ô dù",
    description: "Xem video hướng dẫn thay vải, sửa tay quay, thay dây cáp và bảo trì ô dù ngoài trời bền đẹp từ đội ngũ kỹ thuật Đại Phát.",
    url: `${siteData.domain}/video-huong-dan`,
    type: "website",
    images: [
      {
        url: siteData.socialImage,
        width: 1200,
        height: 630,
        alt: "Video kỹ thuật Ô Dù Đại Phát"
      }
    ]
  }
};

export default function VideoGuidePage() {
  // Cấu trúc dữ liệu Video để Google hiển thị trên tab Video Search
  const videoSchemas = guideVideos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description || video.title,
    "thumbnailUrl": getYoutubeThumbnail(video.youtubeUrl, video.youtubeId),
    "uploadDate": video.uploadDate || "2024-01-01",
    "embedUrl": getYoutubeEmbedUrl(video.youtubeUrl, video.youtubeId),
    "contentUrl": getYoutubeWatchUrl(video.youtubeUrl, video.youtubeId),
    "publisher": {
      "@type": "Organization",
      "name": siteData.brandName,
      "logo": { "@type": "ImageObject", "url": `${siteData.domain}/favicon.svg` }
    }
  }));

  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Video hướng dẫn", url: "/video-huong-dan" }
        ]}
      />
      <JsonLd data={videoSchemas} />

      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Video hướng dẫn" }
            ]}
          />
          <SectionTitle
            eyebrow="Hỗ trợ kỹ thuật qua Video"
            title="Thư viện Video hướng dẫn & Bảo trì thực tế"
            subtitle="Ô Dù Đại Phát cung cấp các video hướng dẫn chi tiết giúp bạn tự xử lý các vấn đề kỹ thuật tại nhà như: thay vải dù, nối dây cáp, sửa bộ tời tay quay..."
            align="left"
            as="h1"
          />
          <div className="page-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
              💬 Nhận video hướng dẫn qua Zalo
            </Button>
            <Button href="/huong-dan" variant="secondary">
              Xem cẩm nang chi tiết
            </Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <YoutubeGallery
            videos={guideVideos}
            title="Danh sách Video kỹ thuật mới nhất"
            subtitle="Đội ngũ kỹ thuật Đại Phát liên tục cập nhật các video xử lý sự cố thực tế để hỗ trợ khách hàng tốt nhất."
          />
        </Container>
      </section>

      {/* Khối tương tác hỗ trợ từ xa */}
      <section className="section-soft">
        <Container>
          <div className="content-card" style={{ background: 'var(--surface-strong)', color: '#fff', padding: '40px', borderRadius: '32px', textAlign: 'center' }}>
            <h2 style={{ color: '#fff', fontSize: '26px', marginBottom: '15px' }}>Dù của bạn gặp lỗi lạ chưa có video hướng dẫn?</h2>
            <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto 30px' }}>
              Hãy quay clip ngắn hiện trạng chiếc dù và gửi qua Zalo cho kỹ thuật Đại Phát. Chúng tôi sẽ xem và hướng dẫn bạn cách khắc phục ngay lập tức.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link href={siteData.zaloLink} className="button button-primary" style={{ border: '2px solid #fff' }}>
                Gửi Video cho Kỹ thuật
              </Link>
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
