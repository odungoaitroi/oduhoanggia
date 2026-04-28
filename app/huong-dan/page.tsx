import type { Metadata } from "next";
import { BaseSchemas, BreadcrumbJsonLd, JsonLd } from "../../components/schema";
import { SiteShell } from "../../components/site-shell";
import { Breadcrumbs, Button, Container, SectionTitle } from "../../components/ui";
import { YoutubeGallery } from "../../components/youtube-gallery";
import { guideVideos } from "../../lib/video-data";
import { getYoutubeEmbedUrl, getYoutubeId, getYoutubeThumbnail, getYoutubeWatchUrl } from "../../lib/youtube";
import { siteData } from "../../lib/site-data";
import { getZaloWebUrl } from "../../lib/zalo";

export const metadata: Metadata = {
  title: "Video hướng dẫn sửa chữa ô dù, thay vải, sửa tay quay | Ô Dù Đại Phát",
  description:
    "Tổng hợp video sửa chữa ô dù, sửa dù lệch tâm, sửa dù chính tâm, thay vải dù, sửa tay quay ô dù và bảo trì ô dù cafe.",
  alternates: {
    canonical: "/huong-dan"
  },
  openGraph: {
    title: "Video hướng dẫn sửa chữa và bảo trì ô dù ngoài trời",
    description:
      "Video kỹ thuật sau bán hàng: sửa dù lệch tâm, sửa dù chính tâm, thay vải dù, sửa tay quay và bảo trì ô dù cafe.",
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
          { name: "Video sửa chữa ô dù", url: "/huong-dan" }
        ]}
      />
      {videoSchemas.length > 0 ? <JsonLd data={videoSchemas} /> : null}

      <section className="page-hero">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Video sửa chữa ô dù" }
            ]}
          />
          <SectionTitle
            eyebrow="Video kỹ thuật sau bán hàng"
            title="Video hướng dẫn sửa chữa và bảo trì ô dù"
            subtitle="Tổng hợp video thực tế về sửa chữa, bảo trì và xử lý lỗi thường gặp cho ô dù quán cafe, ô dù sân vườn, dù lệch tâm và dù chính tâm."
            align="left"
            as="h1"
          />
          <div className="page-actions">
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
              Liên hệ kỹ thuật qua Zalo
            </Button>
            <Button href="/bao-gia">Cần tư vấn sửa dù?</Button>
          </div>
        </Container>
      </section>

      <YoutubeGallery
        videos={guideVideos}
        title="Xem video sửa chữa ngay trên website"
        subtitle="Các video tập trung vào thay vải, thay dây, sửa tay quay, bảo trì khung và xử lý lỗi thường gặp; không dùng để thay thế ảnh sản phẩm."
      />

      <section className="section section-soft">
        <Container>
          <div className="mini-cta-box">
            <strong>Cần hỗ trợ thêm?</strong>
            <p>
              Gửi ảnh hoặc video hiện trạng qua Zalo để Ô Dù Đại Phát tư vấn hướng xử lý, thay vải, sửa tay quay hoặc bảo trì khung phù hợp.
            </p>
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
              Liên hệ kỹ thuật qua Zalo
            </Button>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
