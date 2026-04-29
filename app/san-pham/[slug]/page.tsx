"use client";
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
    title: `${category.name} | Giá tại xưởng | ${siteData.brandName}`,
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
      {seo ? <FAQJsonLd items={seo.faqs} /> : null}

      <section className="page-hero" style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <Container>
          <Breadcrumbs items={[{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm", href: "/san-pham" }, { label: category.name }]} />
          <SectionTitle eyebrow="Danh mục sản phẩm chuyên sâu" title={category.name} subtitle={category.intro} align="left" as="h1" />
          <div className="page-actions" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary" style={{ height: '52px', padding: '0 30px' }}>
              💬 Gửi ảnh mặt bằng qua Zalo
            </Button>
            <Button href="/bao-gia" variant="secondary">
              Nhận báo giá nhanh
            </Button>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="content-grid" style={{ marginBottom: '40px' }}>
            <article className="content-card">
              <h2 style={{ color: 'var(--primary)', fontSize: '22px' }}>Tại sao chọn dòng {category.name}?</h2>
              <InfoList items={category.benefits} />
            </article>
            <article className="content-card" style={{ borderLeft: '4px solid var(--primary)', background: '#fff' }}>
              <h2 style={{ fontSize: '22px' }}>Tư vấn in Logo & Thương hiệu</h2>
              <p>Ô Dù Đại Phát hỗ trợ in ấn Logo sắc nét trên mọi chất liệu vải dù của dòng <strong>{category.name}</strong>. Gửi mẫu thiết kế qua Zalo để chúng tôi lên phối cảnh miễn phí cho bạn.</p>
              <div style={{ marginTop: '15px' }}>
                 <Link href={siteData.zaloLink} style={{ fontWeight: 700, color: 'var(--zalo)' }}>→ Chat Zalo tư vấn in ấn</Link>
              </div>
            </article>
          </div>

          <div className="card-grid four-up">
            {items.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      {/* Phân đoạn nội dung SEO chuyên sâu */}
      {seo ? (
        <section className="section section-soft">
          <Container>
            <div className="content-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
              <article className="content-card wide-content-card">
                <h2 style={{ color: 'var(--primary)' }}>{seo.title}</h2>
                <p style={{ fontSize: '17px', lineHeight: '1.8' }}>{seo.lead}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                   <div>
                      <h3 style={{ fontSize: '18px' }}>Ứng dụng thực tế</h3>
                      <InfoList items={seo.applications} />
                   </div>
                   <div>
                      <h3 style={{ fontSize: '18px' }}>Mẹo chọn mẫu dù</h3>
                      <InfoList items={seo.choosingTips} />
                   </div>
                </div>
              </article>

              <article className="content-card">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Bảng gợi ý kích thước</h2>
                <div className="responsive-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Nhu cầu</th>
                        <th>Gợi ý</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seo.sizeGuide.map((row) => (
                        <tr key={row.need}>
                          <td style={{ fontWeight: 600 }}>{row.need}</td>
                          <td>{row.suggestion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: '25px', padding: '20px', background: 'var(--surface)', borderRadius: '16px', textAlign: 'center' }}>
                  <strong>{siteData.trustStats[1].value}</strong>
                  <p style={{ fontSize: '14px', margin: '8px 0' }}>Ô Dù Đại Phát vận chuyển an toàn dòng dù {category.name.toLowerCase()} tận nơi toàn quốc.</p>
                  <Button href={getZaloWebUrl(siteData.phone)} external variant="primary" style={{ width: '100%' }}>
                    Nhắn Zalo kiểm tra cước phí
                  </Button>
                </div>
              </article>
            </div>
          </Container>
        </section>
      ) : null}

      <YoutubeGallery
        title="Kỹ thuật & Bảo trì"
        subtitle={`Hướng dẫn vận hành, thay vải và bảo trì đúng cách cho dòng ${category.name.toLowerCase()} bền đẹp lâu dài.`}
        videos={categoryVideos}
        productSlug={category.slug}
        limit={3}
      />

      {seo ? (
        <section className="section">
          <Container>
            <SectionTitle eyebrow="FAQ" title={`Giải đáp về ${category.name.toLowerCase()}`} />
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

      {/* Footer Links */}
      {seo ? (
        <section className="section section-soft">
          <Container>
            <SectionTitle eyebrow="Khám phá thêm" title="Liên kết hữu ích cho bạn" />
            <div className="route-grid">
              {relatedCategories.map((item) => (
                <Link key={item.slug} href={`/san-pham/${item.slug}`} className="route-card">{item.name}</Link>
              ))}
              {relatedArticles.map((item) => (
                <Link key={item.slug} href={`/kien-thuc/${item.slug}`} className="route-card">{item.title}</Link>
              ))}
              <Link href="/du-an" className="route-card">Công trình thực tế</Link>
              <Link href="/bao-gia" className="route-card">Bảng báo giá mới nhất</Link>
            </div>
          </Container>
        </section>
      ) : null}
    </SiteShell>
  );
}
