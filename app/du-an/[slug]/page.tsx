import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BaseSchemas, JsonLd } from "../../../components/schema";
import { SiteShell } from "../../../components/site-shell";
import { Breadcrumbs, Button, Container, InfoList, SectionTitle } from "../../../components/ui";
import { getProject, getRelatedProducts, projects, siteData } from "../../../lib/site-data";
import { ProductCard } from "../../../components/cards";
import { ImageZoom } from "../../../components/image-zoom";
import { MediaGallery } from "../../../components/media-gallery";
import { YoutubeGallery } from "../../../components/youtube-gallery";
import { projectGallery, videoGallery } from "../../../lib/media-data";
import { guideVideos } from "../../../lib/video-data";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Công trình thực tế | ${siteData.brandName}`,
    description: project.description,
    alternates: { canonical: `/du-an/${project.slug}` },
    openGraph: {
      images: [{ url: project.image }]
    }
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();
  
  const relatedProducts = getRelatedProducts(project.relatedProductSlugs);
  const galleryItems = [...projectGallery, ...videoGallery];

  // Schema nâng cao để Google index dự án theo địa phương
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "description": project.description,
    "image": `${siteData.domain}${project.image}`,
    "author": {
      "@type": "Organization",
      "name": siteData.brandName
    },
    "publisher": {
      "@type": "Organization",
      "name": siteData.brandName,
      "logo": { "@type": "ImageObject", "url": `${siteData.domain}/logo.png` }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteData.domain}/du-an/${project.slug}`
    }
  };

  return (
    <SiteShell>
      <BaseSchemas />
      <JsonLd data={projectSchema} />
      
      {/* Hero Section - Tối ưu Breadcrumbs cho SEO */}
      <section className="page-hero" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <Container>
          <Breadcrumbs 
            items={[
              { label: "Trang chủ", href: "/" }, 
              { label: "Công trình thực tế", href: "/du-an" }, 
              { label: project.title }
            ]} 
          />
          <SectionTitle 
            eyebrow={`Dự án tại: ${project.locationName}`} 
            title={project.title} 
            subtitle={project.description} 
            align="left" 
            as="h1" 
          />
        </Container>
      </section>

      {/* Chi tiết nội dung công trình */}
      <section className="section">
        <Container>
          <div className="product-detail-grid">
            <div className="image-side">
              <ImageZoom 
                src={project.image} 
                alt={`${project.title} - Ảnh thật từ Ô Dù Đại Phát`} 
                width={800} 
                height={560} 
                className="detail-image" 
              />
              <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                <span className="pill">#ẢnhThật100%</span>
                <span className="pill">#{project.type}</span>
              </div>
            </div>

            <div className="content-card" style={{ padding: '32px' }}>
              <h2 style={{ fontSize: '22px', borderBottom: '2px solid var(--primary)', display: 'inline-block', marginBottom: '16px' }}>
                Chi tiết triển khai
              </h2>
              <p style={{ marginBottom: '24px', whiteSpace: 'pre-line' }}>{project.content}</p>
              
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '10px' }}>Nhu cầu của khách hàng</h3>
                <p>{project.challenge}</p>
              </div>

              <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Giải pháp từ {siteData.brandName}</h3>
              <InfoList items={project.solution} />
              
              <div style={{ marginTop: '24px', padding: '20px', background: 'var(--surface)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Kết quả đạt được</h3>
                <p style={{ fontWeight: 500 }}>{project.outcome}</p>
              </div>

              <div className="hero-actions" style={{ marginTop: '32px' }}>
                <Button href="/bao-gia" variant="primary" style={{ width: '100%' }}>
                  Nhận báo giá công trình tương tự
                </Button>
                <Link 
                  href={siteData.zaloLink} 
                  className="button button-secondary" 
                  style={{ width: '100%', marginTop: '12px', display: 'flex', gap: '8px', color: 'var(--zalo)' }}
                >
                  💬 Chat Zalo tư vấn mẫu dù này
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Hình ảnh thực tế */}
      <div style={{ background: 'var(--surface)', padding: '60px 0' }}>
        <MediaGallery 
          title="Thư viện hình ảnh công trình" 
          subtitle="Các góc chụp chi tiết khung dù, vải dù và cách bố trí bàn ghế thực tế tại công trình." 
          items={galleryItems} 
          projectSlug={project.slug} 
          limit={6} 
        />
      </div>

      {/* Video Hướng dẫn (Nếu có) */}
      <YoutubeGallery
        title="Hướng dẫn kỹ thuật & Vận hành"
        subtitle="Để đảm bảo ô dù luôn bền đẹp, hãy tham khảo các video hướng dẫn vận hành và bảo trì từ đội ngũ kỹ thuật Đại Phát."
        videos={guideVideos}
        projectSlug={project.slug}
        limit={3}
      />

      {/* Sản phẩm liên quan - Thúc đẩy mua hàng */}
      <section className="section section-soft">
        <Container>
          <SectionTitle 
            eyebrow="Sản phẩm sử dụng" 
            title="Tham khảo mẫu dù trong dự án" 
            subtitle="Đây là những mẫu dù đã được khách hàng lựa chọn cho công trình phía trên."
          />
          <div className="card-grid four-up">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/san-pham" className="text-link">Xem tất cả sản phẩm của Đại Phát →</Link>
          </div>
        </Container>
      </section>
      
      <style jsx>{`
        .image-side { position: sticky; top: 100px; }
        @media (max-width: 960px) {
          .image-side { position: static; }
        }
      `}</style>
    </SiteShell>
  );
}
