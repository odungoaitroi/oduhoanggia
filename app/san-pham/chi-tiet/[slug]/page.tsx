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
import Link from "next/link";

export function generateStaticParams() {
  return products.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${siteData.brandName}`,
    description: product.seoDescription,
    alternates: { canonical: `/san-pham/chi-tiet/${product.slug}` },
    openGraph: {
      title: `${product.name} - Giá tại xưởng Ô Dù Đại Phát`,
      description: product.seoDescription,
      url: `${siteData.domain}/san-pham/chi-tiet/${product.slug}`,
      images: [{ url: product.image, alt: `${product.name} chính hãng Ô Dù Đại Phát` }]
    }
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const galleryItems = [...productGallery, ...videoGallery];
  const productVideos = await getProductVideos(product, 3);

  // Schema nâng cao để hiển thị giá "Liên hệ" chuyên nghiệp trên Google
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription,
    image: `${siteData.domain}${product.image}`,
    brand: { "@type": "Brand", name: siteData.brandName },
    sku: product.slug,
    category: category?.name ?? "Ô dù ngoài trời",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "VND",
      url: `${siteData.domain}/san-pham/chi-tiet/${product.slug}`
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value
    }))
  };

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
      <FAQJsonLd items={product.faq} />

      <section className="page-hero" style={{ padding: '40px 0', background: 'var(--surface)' }}>
        <Container>
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Sản phẩm", href: "/san-pham" },
              { label: category?.name ?? "Danh mục", href: category ? `/san-pham/${category.slug}` : "/san-pham" },
              { label: product.name }
            ]}
          />
          <SectionTitle eyebrow="Thông số kỹ thuật chuẩn xưởng" title={product.name} subtitle={product.summary} align="left" as="h1" />
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="product-detail-grid">
            <div className="image-side">
              <ImageZoom
                src={product.image}
                alt={`${product.name} - Ô Dù Đại Phát`}
                width={800}
                height={560}
                className="detail-image"
              />
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="pill">✓ Bảo hành 24 tháng</span>
                <span className="pill">✓ Giá gốc tại xưởng</span>
                <span className="pill">✓ Miễn phí in logo*</span>
              </div>
            </div>

            <div className="content-card" style={{ padding: '30px' }}>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '24px' }}>Giá: Liên hệ báo giá xưởng</span>
                <p style={{ margin: '5px 0 0', color: 'var(--muted)', fontSize: '14px' }}>* Giá thay đổi theo số lượng và khu vực giao hàng</p>
              </div>

              <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Ưu điểm vượt trội</h2>
              <InfoList items={product.highlights} />

              <div className="spec-grid" style={{ margin: '25px 0' }}>
                {product.specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="spec-card" style={{ padding: '12px' }}>
                    <strong style={{ fontSize: '13px' }}>{spec.label}</strong>
                    <span style={{ fontSize: '15px' }}>{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="hero-actions" style={{ display: 'grid', gap: '12px' }}>
                <Button href={getZaloWebUrl(siteData.phone)} external variant="primary" style={{ height: '56px', fontSize: '18px' }}>
                  💬 Nhắn Zalo nhận báo giá ngay
                </Button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <Button href="/bao-gia" variant="secondary">Gửi yêu cầu nhanh</Button>
                  <Button href={`tel:${siteData.phone}`} variant="secondary">📞 Gọi: {siteData.phoneDisplay}</Button>
                </div>
              </div>
              
              <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#166534', fontWeight: 600 }}>
                  💡 Mẹo: Chụp ảnh mặt bằng gửi Zalo để Ô Dù Đại Phát tư vấn phối màu dù phù hợp nhất!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Phần thông số chi tiết mở rộng */}
      <section className="section-soft">
        <Container>
          <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <article className="content-card">
              <h2>Thông số kỹ thuật đầy đủ</h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {product.specs.map(spec => (
                  <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                    <span style={{ color: 'var(--muted)' }}>{spec.label}</span>
                    <span style={{ fontWeight: 600 }}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </article>
            <article className="content-card">
              <h2>Ứng dụng thực tế</h2>
              <InfoList items={product.applications} />
            </article>
          </div>
        </Container>
      </section>

      <MediaGallery
        title="Hình ảnh dự án thực tế"
        subtitle={`Xem các bộ ${product.name} đã được Ô Dù Đại Phát bàn giao cho khách hàng toàn quốc.`}
        items={galleryItems}
        productSlug={product.slug}
        limit={6}
      />

      <YoutubeGallery
        title="Video hướng dẫn & Vận hành"
        subtitle="Để đảm bảo ô dù luôn bền đẹp, hãy tham khảo các video hướng dẫn vận hành từ đội ngũ kỹ thuật Đại Phát."
        videos={productVideos}
        productSlug={product.slug}
        limit={3}
      />

      <section className="section">
        <Container>
          <div className="content-card" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Câu hỏi thường gặp về {product.name}</h2>
            <div className="faq-list compact-faq-list" style={{ textAlign: 'left', marginTop: '25px' }}>
              {product.faq.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Nút Call/Zalo Mobile cố định cuối màn hình được kế thừa từ SiteShell & globals.css */}
    </SiteShell>
  );
}
