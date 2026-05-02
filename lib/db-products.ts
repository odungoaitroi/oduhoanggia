import { prisma } from './prisma';
import { products as fallbackProducts } from './products';

function parseJsonArray(value: string | null | undefined): string[] {
  try { return JSON.parse(value || '[]'); } catch { return []; }
}

export async function getPublishedProducts() {
  try {
    const rows = await prisma.product.findMany({ where: { isPublished: true }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });
    if (!rows.length) return fallbackProducts;
    return rows.map((p) => ({
      slug: p.slug,
      name: p.name,
      category: p.category as any,
      price: p.price,
      size: p.size,
      material: p.material,
      image: p.image,
      badge: p.badge || '',
      shortDescription: p.shortDescription,
      description: p.description,
      applications: parseJsonArray(p.applications),
      keywords: parseJsonArray(p.keywords)
    }));
  } catch {
    return fallbackProducts;
  }
}

export async function getPublishedProduct(slug: string) {
  const products = await getPublishedProducts();
  return products.find((p) => p.slug === slug) || null;
}
