import { siteData } from "../lib/site-data";

type BreadcrumbItem = { readonly name: string; readonly url: string };
type FAQItem = { readonly question: string; readonly answer: string };
type ProductSchemaItem = {
  readonly name: string;
  readonly summary: string;
  readonly image: string;
  readonly slug: string;
  readonly categorySlug?: string;
};

export function JsonLd({
  data
}: {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items
}: {
  items: readonly BreadcrumbItem[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url.startsWith("http")
            ? item.url
            : `${siteData.domain}${item.url}`
        }))
      }}
    />
  );
}

export function ProductJsonLd({
  items
}: {
  items: readonly ProductSchemaItem[];
}) {
  return (
    <JsonLd
      data={items.map((item) => ({
        "@context": "https://schema.org",
        "@type": "Product",
        name: item.name,
        description: item.summary,
        image: item.image.startsWith("http")
          ? item.image
          : `${siteData.domain}${item.image}`,
        url: `${siteData.domain}/san-pham#${item.slug}`,
        brand: {
          "@type": "Brand",
          name: siteData.brandName
        },
        category: item.categorySlug || "Ô dù ngoài trời",
        offers: {
          "@type": "Offer",
          priceCurrency: "VND",
          availability: "https://schema.org/InStock",
          url: `${siteData.domain}/bao-gia`
        }
      }))}
    />
  );
}

export function FAQJsonLd({ items }: { items: readonly FAQItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer
          }
        }))
      }}
    />
  );
}

export function BaseSchemas() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: siteData.brandName,
    url: siteData.domain,
    telephone: siteData.phone,
    email: siteData.email,
    image: `${siteData.domain}${siteData.socialImage}`,
    areaServed: {
      "@type": "Country",
      name: "Vietnam"
    },
    description: siteData.seoDescription,
    sameAs: [siteData.zaloLink, siteData.secondaryDomain],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteData.phone,
        contactType: "sales",
        areaServed: "VN",
        availableLanguage: ["vi"]
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.brandName,
    url: siteData.domain,
    inLanguage: "vi-VN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteData.domain}/kien-thuc?tu-khoa={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return <JsonLd data={[organizationSchema, websiteSchema]} />;
}
