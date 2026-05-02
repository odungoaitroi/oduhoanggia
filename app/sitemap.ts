import type { MetadataRoute } from 'next';
import { categories, products } from '@/lib/products';
import { locations } from '@/lib/locations';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/san-pham`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/lien-he`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...categories.map((category) => ({ url: `${site.url}/danh-muc/${category.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.86 })),
    ...locations.map((location) => ({ url: `${site.url}/khu-vuc/${location.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.78 })),
    ...products.map((product) => ({ url: `${site.url}/san-pham/${product.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 }))
  ];
}
