import type { Metadata } from "next";
import Image from "next/image";
import { CategoryCard, ProjectCard } from "../components/cards";
import { LeadForm } from "../components/lead-form";
import { PhoneLink, ZaloLink } from "../components/conversion-links";
import { QuoteCta } from "../components/quote-cta";
import { BaseSchemas, FAQJsonLd, JsonLd, ProductJsonLd } from "../components/schema";
import { SiteShell } from "../components/site-shell";
import { Button, Container, SectionTitle } from "../components/ui";
import { YoutubeGallery } from "../components/youtube-gallery";
import { homeContent } from "../content/home";
import { mediaContent } from "../content/media";
import { productCategories, products, projects, siteData } from "../lib/site-data";
import { guideVideos } from "../lib/video-data";
import { getYoutubeEmbedUrl, getYoutubeId, getYoutubeThumbnail, getYoutubeWatchUrl } from "../lib/youtube";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: homeContent.metadata.openGraphTitle,
    description: homeContent.metadata.openGraphDescription,
    url: siteData.domain,
    type: "website",
    images: [
      {
        url: siteData.socialImage,
        width: 1200,
        height: 630,
        alt: "Ô dù ngoài trời Ô Dù Đại Phát"
      }
    ]
  }
};

const featuredProductSlugs = [
  "du-lech-tam",
  "du-tron-tam-giua",
  "du-quan-cafe",
  "du-san-vuon",
  "nha-bat-di-dong"
];

const featuredProducts = productCategories.filter((item) => featuredProductSlugs.includes(item.slug));
const featuredProductSchemaItems = products.filter((item) => featuredProductSlugs.includes(item.categorySlug)).slice(0, 8);
const featuredVideos = guideVideos.slice(0, 3);

type VideoObjectSchema = {
  "@context": "https://schema.org";
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string;
  embedUrl: string;
  contentUrl: string;
  uploadDate?: string;
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
  return featuredVideos.flatMap((video) => {
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

export default function HomePage() {
  const videoSchemas = getVideoSchemas();

  return (
    <SiteShell>
      <BaseSchemas />
      <FAQJsonLd items={homeContent.faqs} />
      <ProductJsonLd items={featuredProductSchemaItems} />
      {videoSchemas.length > 0 ? <JsonLd data={videoSchemas} /> : null}

      <section className="hero-section home-hero-premium">
        <Container>
          <div className="hero-grid">
            <div>
              <span className="pill">{homeContent.hero.eyebrow}</span>
              <h1 className="hero-title">{homeContent.hero.headline}</h1>
              <p className="hero-subheadline">{homeContent.hero.subheadline}</p>
              <p className="hero-description hero-description-compact">{homeContent.hero.description}</p>
              <div className="hero-actions">
                <PhoneLink placement="homepage_hero" className="button button-primary">
                  {homeContent.hero.primaryCta}
                </PhoneLink>
                <ZaloLink placement="homepage_hero" className="button button-zalo">
                  {homeContent.hero.zaloCta}
                </ZaloLink>
                <QuoteCta source="homepage_hero" className="button button-secondary">Nhận báo giá</QuoteCta>
              </div>
              <p className="hero-cta-note">{homeContent.hero.ctaNote}</p>
              <div className="trust-bar" aria-label="Điểm mạnh của Ô Dù Đại Phát">
                {homeContent.trustItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="hero-card premium-hero-card">
              <Image
                src={mediaContent.heroImage}
                alt={homeContent.hero.imageAlt}
                width={960}
                height={720}
                priority
                className="hero-image"
              />
              <div className="hero-mini-grid compact-mini-grid">
                <div>
                  <strong>{homeContent.hero.miniCards[0].title}</strong>
                  <p>{homeContent.hero.miniCards[0].text}</p>
                </div>
                <div>
                  <strong>
                    {homeContent.hero.miniCards[1].title} {siteData.phoneDisplay}
                  </strong>
                  <p>{homeContent.hero.miniCards[1].text}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="conversion-trust-section" aria-label="Cam kết tư vấn và giao hàng của Ô Dù Đại Phát">
        <Container>
          <div className="conversion-trust-grid">
            {homeContent.conversionTrustItems.map((item) => (
              <div key={item} className="conversion-trust-card">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-soft home-section-compact">
        <Container>
          <SectionTitle
            eyebrow={homeContent.consultationSection.eyebrow}
            title={homeContent.consultationSection.title}
            subtitle={homeContent.consultationSection.subtitle}
          />
          <div className="card-grid three-up home-benefit-grid">
            {homeContent.problemSolutions.map((item) => (
              <div key={item.title} className="stat-card">
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section home-section-compact">
        <Container>
          <SectionTitle
            eyebrow={homeContent.productsSection.eyebrow}
            title={homeContent.productsSection.title}
            subtitle={homeContent.productsSection.subtitle}
          />
          <div className="card-grid four-up">
            {featuredProducts.map((item) => (
              <CategoryCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="section section-soft home-section-compact">
        <Container>
          <div className="split-heading">
            <div>
              <p className="eyebrow">{homeContent.projectsSection.eyebrow}</p>
              <h2 className="section-title-inline">{homeContent.projectsSection.title}</h2>
              <p className="section-subtitle">{homeContent.projectsSection.subtitle}</p>
            </div>
            <Button href="/du-an">{homeContent.projectsSection.cta}</Button>
          </div>
          <div className="card-grid three-up">
            {projects.slice(0, 3).map((item) => (
              <ProjectCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <YoutubeGallery
        videos={featuredVideos}
        title={homeContent.videoSection.title}
        subtitle={homeContent.videoSection.subtitle}
        source="homepage_video_funnel"
      />

      <section className="section home-section-compact">
        <Container>
          <SectionTitle
            eyebrow={homeContent.quoteProcessSection.eyebrow}
            title={homeContent.quoteProcessSection.title}
            subtitle={homeContent.quoteProcessSection.subtitle}
          />
          <div className="card-grid four-up home-benefit-grid">
            {homeContent.quoteSteps.map((step, index) => (
              <div key={step.title} className="stat-card">
                <strong>
                  {index + 1}. {step.title}
                </strong>
                <span>{step.text}</span>
              </div>
            ))}
          </div>
          <div className="hero-actions center-actions">
            <ZaloLink placement="homepage_quote_process" className="button button-zalo">
              {homeContent.hero.zaloCta}
            </ZaloLink>
            <PhoneLink placement="homepage_quote_process">Gọi {siteData.phoneDisplay}</PhoneLink>
          </div>
        </Container>
      </section>

      <section className="section section-soft home-section-compact" id="faq">
        <Container>
          <div className="lead-grid">
            <div className="lead-panel">
              <p className="eyebrow eyebrow-on-dark">{homeContent.leadPanel.eyebrow}</p>
              <h2 className="section-title-inline">{homeContent.leadPanel.title}</h2>
              <p>{homeContent.leadPanel.paragraph}</p>
              <ul className="check-list">
                {homeContent.leadPanel.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="hero-actions">
                <QuoteCta source="homepage_lead_panel">{homeContent.leadPanel.cta}</QuoteCta>
                <ZaloLink placement="homepage_lead_panel">
                  {homeContent.leadPanel.zaloCta}
                </ZaloLink>
              </div>
            </div>
            <LeadForm />
          </div>

          <section className="final-quote-cta" aria-label="Nhận báo giá ô dù">
            <h2>{homeContent.finalCta.title}</h2>
            <p>{homeContent.finalCta.description}</p>
            <div className="hero-actions center-actions">
              <QuoteCta source="homepage_final_cta">{homeContent.finalCta.cta}</QuoteCta>
              <PhoneLink placement="homepage_final_cta">Gọi {siteData.phoneDisplay}</PhoneLink>
              <ZaloLink placement="homepage_final_cta" className="button button-zalo">
                Nhắn Zalo
              </ZaloLink>
            </div>
          </section>

          <div className="faq-list compact-faq-list">
            {homeContent.faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
