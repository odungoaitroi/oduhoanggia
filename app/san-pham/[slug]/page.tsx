import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "../../../components/cards";
import { BaseSchemas, BreadcrumbJsonLd, FAQJsonLd, JsonLd } from "../../../components/schema";
import { SiteShell } from "../../../components/site-shell";
import { Breadcrumbs, Button, Container, InfoList, SectionTitle } from "../../../components/ui";
import { VideoConversionCTA } from "../../../components/video-conversion-cta";
import { YoutubeGallery } from "../../../components/youtube-gallery";
import { articles, getCategory, getProductsByCategory, productCategories, siteData } from "../../../lib/site-data";
import { categorySeoContent } from "../../../lib/seo-content";
import { getCategoryVideos, getYoutubeEmbedUrl, getYoutubeThumbnail } from "../../../lib/youtube";
import { getZaloWebUrl } from "../../../lib/zalo";
type ProductCategoryItem = NonNullable<ReturnType<typeof getCategory>>;
type ArticleItem = (typeof articles)[number];

function isProductCategoryItem(value: ProductCategoryItem | undefined): value is ProductCategoryItem {
  return Boolean(value);
}

function isArticleItem(value: ArticleItem | undefined): value is ArticleItem {
  return Boolean(value);
}



export function generateStaticParams() {
  return productCategories.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = getCategory(params.slug);
  if (!category) return {};

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: { canonical: `/san-pham/${category.slug}` },
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `${siteData.domain}/san-pham/${category.slug}`,
      images: [{ url: category.heroImage, alt: `${category.name} tại Ô Dù Đại Phát` }]
    }
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);
  const seo = categorySeoContent[category.slug];
  const relatedCategories = seo?.relatedCategorySlugs.map((slug) => getCategory(slug)).filter(isProductCategoryItem) ?? [];
  const relatedArticles = seo?.relatedArticleSlugs.map((slug) => articles.find((article) => article.slug === slug)).filter(isArticleItem) ?? [];
  const categoryVideos = await getCategoryVideos(category, 3);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.seoDescription,
    url: `${siteData.domain}/san-pham/${category.slug}`,
    mainEntity: items.map((item) => ({
      "@type": "Product",
      name: item.name,
      description: item.summary,
      image: `${siteData.domain}${item.image}`,
      brand: { "@type": "Brand", name: siteData.brandName },
      url: `${siteData.domain}/san-pham/chi-tiet/${item.slug}`,
      category: category.name
    }))
  };

  const videoSchemas = categoryVideos
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
          { name: category.name, url: `/san-pham/${category.slug}` }
        ]}
      />
      <JsonLd data={collectionSchema} />
      {videoSchemas.length > 0 ? <JsonLd data={videoSchemas} /> : null}
      {seo ? <FAQJsonLd items={seo.faqs} /> : null}

      <section className="page-hero">
        <Container>
          <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/san-pham" }, { label: category.name }]} />
          <SectionTitle eyebrow="Danh mục sản phẩm" title={category.name} subtitle={category.intro} align="left" as="h1" />
          <div className="page-actions">
            <Button href="/bao-gia" variant="primary">
              Nhận báo giá nhanh
            </Button>
            <Button href={getZaloWebUrl(siteData.phone)} external>
              Gửi ảnh qua Zalo
            </Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="content-grid">
            <article className="content-card">
              <h2>Điểm phù hợp của dòng sản phẩm này</h2>
              <InfoList items={category.benefits} />
            </article>
            <article className="content-card">
              <h2>Tư vấn theo mặt bằng thực tế</h2>
              <p>Mỗi không gian sẽ cần kiểu dù, kích thước và màu sắc khác nhau. Nếu chưa chắc nên chọn mẫu nào, bạn có thể gửi ảnh vị trí qua Zalo để được tư vấn nhanh hơn.</p>
            </article>
          </div>

          <div className="card-grid four-up">
            {items.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <YoutubeGallery
        title="Video hướng dẫn sửa chữa và bảo trì ô dù"
        subtitle="Video kỹ thuật sau bán hàng liên quan đến sửa chữa, thay vải, thay dây, sửa tay quay và bảo trì dòng dù này; không dùng để thay thế ảnh sản phẩm."
        videos={categoryVideos}
        productSlug={category.slug}
        limit={3}
      />

      {categoryVideos.length > 0 ? (
        <section className="section">
          <Container>
            <div className="content-card video-conversion-card">
              <h2>Cần tư vấn sửa chữa hoặc bảo trì dòng dù này?</h2>
              <p>Gửi ảnh/video hiện trạng qua Zalo để được tư vấn thay vải, sửa tay quay, sửa khung hoặc phương án bảo trì phù hợp.</p>
              <VideoConversionCTA productSlug={category.slug} productName={category.name} />
            </div>
          </Container>
        </section>
      ) : null}

      {seo ? (
        <section className="section section-soft">
          <Container>
            <div className="content-grid">
              <article className="content-card wide-content-card">
                <h2>{seo.title}</h2>
                <p>{seo.lead}</p>
                <h3>Ứng dụng thực tế</h3>
                <InfoList items={seo.applications} />
                <h3>Gợi ý chọn theo nhu cầu</h3>
                <InfoList items={seo.choosingTips} />
              </article>

              <article className="content-card">
                <h2>Bảng gợi ý kích thước</h2>
                <div className="responsive-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Nhu cầu</th>
                        <th>Gợi ý</th>
                        <th>Lưu ý</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seo.sizeGuide.map((row) => (
                        <tr key={row.need}>
                          <td>{row.need}</td>
                          <td>{row.suggestion}</td>
                          <td>{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mini-cta-box">
                  <strong>Cần chọn nhanh?</strong>
                  <p>Gửi ảnh mặt bằng qua Zalo để được gợi ý mẫu, kích thước và số lượng phù hợp.</p>
                  <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
                    Gửi ảnh qua Zalo
                  </Button>
                </div>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      {seo ? (
        <section className="section">
          <Container>
            <SectionTitle eyebrow="FAQ" title={`Câu hỏi thường gặp về ${category.name.toLowerCase()}`} />
            <div className="faq-list">
              {seo.faqs.map((item) => (
                <details key={item.question} className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {seo ? (
        <section className="section section-soft">
          <Container>
            <SectionTitle
              eyebrow="Xem thêm"
              title="Liên kết hữu ích trước khi đặt mua"
              subtitle="Các trang liên quan giúp bạn so sánh mẫu, xem thêm kinh nghiệm chọn dù và gửi yêu cầu báo giá chính xác hơn."
            />
            <div className="route-grid">
              {relatedCategories.map((item) =>
                item ? (
                  <Link key={item.slug} href={`/san-pham/${item.slug}`} className="route-card">
                    {item.name}
                  </Link>
                ) : null
              )}
              {relatedArticles.map((item) =>
                item ? (
                  <Link key={item.slug} href={`/kien-thuc/${item.slug}`} className="route-card">
                    {item.title}
                  </Link>
                ) : null
              )}
              <Link href="/du-an" className="route-card">
                Xem công trình thực tế
              </Link>
              <Link href="/bao-gia" className="route-card">
                Nhận báo giá nhanh
              </Link>
            </div>
          </Container>
        </section>
      ) : null}
    </SiteShell>
  );
}
