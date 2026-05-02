# Ô Dù Đại Phát - Full Backend + Admin + SEO Auto

Project bán ô dù ngoài trời chuẩn **Node.js v24 LTS**, Next.js App Router, TypeScript, Tailwind CSS, Prisma SQLite, admin thật, API backend và SEO tự động.

## Tính năng

- Frontend bán hàng: trang chủ, danh mục, sản phẩm, chi tiết, liên hệ.
- Backend API thật bằng Next.js Route Handlers.
- Admin đăng nhập bằng session cookie HTTP-only.
- Quản lý sản phẩm: thêm/sửa/xóa/ẩn hiện.
- Upload ảnh `.webp` vào `/public/uploads`.
- Quản lý lead/báo giá.
- Prisma + SQLite dễ chạy local/VPS.
- SEO auto:
  - `/san-pham/[slug]`
  - `/danh-muc/[slug]`
  - `/khu-vuc/[slug]`
  - `sitemap.xml`
  - `robots.txt`
  - Product/Collection/LocalBusiness JSON-LD
  - Open Graph image `.webp`

## Yêu cầu

```bash
Node.js v24 LTS
npm >= 10
```

## Cài đặt

```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

Mở:

```txt
http://localhost:3000
```

Admin:

```txt
http://localhost:3000/admin/login
```

Tài khoản mặc định từ `.env`:

```txt
admin@odudaiphat.com
admin0349596898
```

> Trước khi deploy thật, đổi `ADMIN_PASSWORD` và `AUTH_SECRET`, sau đó chạy seed lại hoặc tạo user admin mới.

## Build production

```bash
npm run type-check
npm run build
npm start
```

## Push GitHub

```bash
git init
git add .
git commit -m "Full backend admin seo auto node24"
git branch -M main
git remote add origin https://github.com/oduhoanggia-cmd/odudaiphat.git
git push -u origin main
```

## Deploy VPS

```bash
npm install
npm run db:push
npm run db:seed
npm run build
npm start
```

Hoặc dùng PM2:

```bash
npm i -g pm2
pm2 start npm --name odudaiphat -- start
pm2 save
```

## Ghi chú upload ảnh

Route `/api/upload` lưu ảnh vào `/public/uploads`. Cách này phù hợp VPS. Nếu deploy Vercel/serverless, nên đổi sang Cloudinary/R2/S3 vì filesystem không bền.

## Checklist SEO

- Không dùng ảnh Unsplash production.
- Ảnh sản phẩm dùng `.webp`.
- Tên file không dấu, có keyword.
- Dùng `next/image`.
- Mỗi sản phẩm có alt riêng.
- Kiểm tra `/sitemap.xml` và `/robots.txt`.
- Chạy Lighthouse: SEO 100, Performance > 90.

## Lưu ý cài đặt Tailwind CSS

Project này dùng **Tailwind CSS v3.4.17** để tránh lỗi registry `403 Forbidden` khi môi trường chặn package `@tailwindcss/postcss` của Tailwind v4.

Không cần cài:

```bash
npm install @tailwindcss/postcss
```

Nếu môi trường của bạn đang trỏ sang registry mirror bị chặn, chạy:

```bash
npm config set registry https://registry.npmjs.org/
rm -rf node_modules package-lock.json
npm install
```

## GitHub-ready notes

Bản này đã bỏ `@tailwindcss/postcss` và dùng Tailwind CSS v3.4.17, nên không cần tải package đang bị registry trả `403 Forbidden`.

Trước khi push, kiểm tra nhanh:

```bash
git status --short
```

Không được commit các file sau:

```txt
.env
*.db
prisma/*.db
public/uploads/
node_modules/
.next/
```

GitHub Actions đã có biến môi trường test trong `.github/workflows/ci.yml` để `npm install`, `prisma generate`, `type-check` và `next build` không lỗi vì thiếu `.env`.
