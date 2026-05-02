import { prisma } from '../lib/prisma';
import { hashPassword } from '../lib/password';
import { products } from '../lib/products';
import { categories } from '../lib/products';
import { locations } from '../lib/locations';

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@odudaiphat.com';
  const password = process.env.ADMIN_PASSWORD || 'admin0349596898';

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Admin Ô Dù Đại Phát', passwordHash: hashPassword(password), role: 'ADMIN' }
  });

  for (const [index, p] of products.entries()) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        category: p.category,
        price: p.price,
        size: p.size,
        material: p.material,
        image: p.image,
        badge: p.badge,
        shortDescription: p.shortDescription,
        description: p.description,
        applications: JSON.stringify(p.applications),
        keywords: JSON.stringify(p.keywords),
        isPublished: true,
        sortOrder: index
      },
      create: {
        slug: p.slug,
        name: p.name,
        category: p.category,
        price: p.price,
        size: p.size,
        material: p.material,
        image: p.image,
        badge: p.badge,
        shortDescription: p.shortDescription,
        description: p.description,
        applications: JSON.stringify(p.applications),
        keywords: JSON.stringify(p.keywords),
        isPublished: true,
        sortOrder: index
      }
    });
  }

  for (const c of categories) {
    await prisma.seoPage.upsert({
      where: { slug: `danh-muc-${c.slug}` },
      update: {},
      create: {
        slug: `danh-muc-${c.slug}`,
        type: 'CATEGORY',
        title: `${c.title} | Ô Dù Đại Phát`,
        description: c.description,
        h1: c.title,
        content: `${c.description}\n\nÔ Dù Đại Phát tư vấn chọn mẫu, kích thước, màu sắc và phương án giao hàng phù hợp cho khách hàng trên toàn quốc.`,
        keywords: JSON.stringify(c.keywords)
      }
    });
  }

  for (const l of locations) {
    await prisma.seoPage.upsert({
      where: { slug: `khu-vuc-${l.slug}` },
      update: {},
      create: {
        slug: `khu-vuc-${l.slug}`,
        type: 'LOCATION',
        title: `Ô dù ngoài trời tại ${l.name} | Ô Dù Đại Phát`,
        description: `Báo giá ô dù ngoài trời, dù cafe, dù sân vườn, dù lệch tâm tại ${l.name}. Gọi/Zalo 0349596898.`,
        h1: `Ô dù ngoài trời tại ${l.name}`,
        content: `Ô Dù Đại Phát cung cấp ô dù ngoài trời, dù che nắng, dù cafe, dù sân vườn, nhà bạt, bàn ghế ngoài trời và combo setup quán cafe tại ${l.name}. Khách hàng có thể gửi hình ảnh mặt bằng qua Zalo để được tư vấn nhanh.`,
        keywords: JSON.stringify([`ô dù ngoài trời ${l.name}`, `dù cafe ${l.name}`, `dù sân vườn ${l.name}`])
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());
