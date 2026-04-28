import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BaseSchemas, BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "../../../../components/schema";
import { SiteShell } from "../../../../components/site-shell";
import { Breadcrumbs, Button, Container, InfoList, SectionTitle } from "../../../../components/ui";
import { getCategory, getProduct, products, siteData } from "../../../../lib/site-data";
import { ImageZoom } from "../../../../components/image-zoom";
import { MediaGallery } from "../../../../components/media-gallery";
import { YoutubeGallery } from "../../../../components/youtube-gallery";
import { productGallery, videoGallery } from "../../../../lib/media-data";
import { getProductVideos, getYoutubeEmbedUrl, getYoutubeThumbnail } from "../../../../lib/youtube";
import { VideoConversionCTA } from "../../../../components/video-conversion-cta";
import { getZaloWebUrl } from "../../../../lib/zalo";

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    alternates: { canonical: `/san-pham/chi-tiet/${product.slug}` },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: `${siteData.domain}/san-pham/chi-tiet/${product.slug}`,
      images: [{ url: product.image, alt: `${product.name} tại Ô Dù Đại Phát` }]
    }
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const galleryItems = [...productGallery, ...videoGallery];
  const productVideos = await getProductVideos(product, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription,
    image: `${siteData.domain}${product.image}`,
    brand: { "@type": "Brand", name: siteData.brandName },
    category: category?.name ?? "Ô dù ngoài trời",
    url: `${siteData.domain}/san-pham/chi-tiet/${product.slug}`,
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value
    }))
  };

  const videoSchemas = productVideos
    .map((video) => {
      const thumbnailUrl = getYoutubeThumbnail(video.youtubeUrl, video.youtubeId);
      const embedUrl = getYoutubeEmbedUrl(video.youtubeUrl, video.youtubeId);

      if (!thumbnailUrl || !embedUrl) return null;

      const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: video.title,
        description: video.description || video.title,
        thumbnailUrl: [thumbnailUrl],
        embedUrl,
        contentUrl: video.youtubeUrl,
        url: video.youtubeUrl,
        inLanguage: "vi-VN",
        publisher: {
          "@type": "Organization",
          name: siteData.brandName,
          url: siteData.domain
        }
      };

      if (video.uploadDate) {
        schema.uploadDate = video.uploadDate;
      }

      return schema;
    })
    .filter((schema): schema is Record<string, unknown> => schema !== null);

  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Sản phẩm", url: "/san-pham" },
          { name: category?.name ?? "Danh mục", url: category ? `/san-pham/${category.slug}` : "/san-pham" },
          { name: product.name, url: `/san-pham/chi-tiet/${product.slug}` }
        ]}
      />
      <JsonLd data={productSchema} />
      {videoSchemas.length > 0 ? <JsonLd data={videoSchemas} /> : null}
      <FAQJsonLd items={product.faq} />

      <section className="page-hero">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Sản phẩm", href: "/san-pham" },
              { label: category?.name ?? "Danh mục", href: category ? `/san-pham/${category.slug}` : "/san-pham" },
              { label: product.name }
            ]}
          />
          <SectionTitle eyebrow="Chi tiết sản phẩm" title={product.name} subtitle={product.summary} align="left" as="h1" />
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="product-detail-grid">
            <ImageZoom
              src={product.image}
              alt={`${product.name} - ${category?.name ?? "ô dù ngoài trời"} tại Ô Dù Đại Phát`}
              width={800}
              height={560}
              className="detail-image"
            />

            <div className="content-card">
              <h2>Điểm nổi bật</h2>
              <InfoList items={product.highlights} />

              <div className="spec-grid">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="spec-card">
                    <strong>{spec.label}</strong>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <Button href="/bao-gia" variant="primary">
                  Nhận báo giá
                </Button>
                <Button href={getZaloWebUrl(siteData.phone)} external>
                  Nhắn Zalo
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <MediaGallery
        title="Hình ảnh sản phẩm thực tế"
        subtitle="Tham khảo thêm hình ảnh thực tế của mẫu dù trước khi chọn kích thước, màu sắc và số lượng."
        items={galleryItems}
        productSlug={product.slug}
        limit={6}
      />

      <YoutubeGallery
        title="Video hướng dẫn sửa chữa và bảo trì ô dù"
        subtitle="Video kỹ thuật sau bán hàng liên quan đến thay vải, sửa dây, sửa tay quay và bảo trì; không dùng để minh họa thay thế hình ảnh sản phẩm."
        videos={productVideos}
        productSlug={product.slug}
        limit={3}
      />

      {productVideos.length > 0 ? (
        <section className="section">
          <Container>
            <div className="content-card video-conversion-card">
              <h2>Cần tư vấn sửa chữa hoặc bảo trì mẫu này?</h2>
              <p>Gửi ảnh/video hiện trạng qua Zalo để được tư vấn thay vải, sửa tay quay, sửa khung hoặc phương án bảo trì phù hợp.</p>

              <VideoConversionCTA productSlug={product.slug} productName={product.name} />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="section section-soft">
        <Container>
          <div className="content-grid">
            <article className="content-card">
              <h2>Ứng dụng phù hợp</h2>
              <InfoList items={product.applications} />
            </article>

            <article className="content-card">
              <h2>Câu hỏi về sản phẩm</h2>
              <div className="faq-list compact-faq-list">
                {product.faq.map((item) => (
                  <details key={item.question} className="faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
