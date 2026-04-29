import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { siteData } from "../lib/site-data";
import { Analytics } from "../components/analytics";

// Cấu hình font chữ Be Vietnam Pro chuẩn tiếng Việt giúp website load nhanh và đẹp
const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  preload: true
});

// Metadata điều khiển cách website hiển thị trên Google, Zalo và Facebook
export const metadata: Metadata = {
  metadataBase: new URL(siteData.domain),
  title: {
    default: siteData.seoTitle, // Hiển thị: Ô Dù Đại Phát | Xưởng Sản Xuất...
    template: `%s | ${siteData.brandName}`
  },
  description: siteData.seoDescription,
  applicationName: siteData.brandName,
  alternates: {
    canonical: "/" // Tự động trỏ về link chuẩn để tránh lỗi trùng lặp nội dung khi dùng nhiều domain
  },
  openGraph: {
    title: siteData.seoTitle,
    description: siteData.seoDescription,
    url: siteData.domain,
    siteName: siteData.brandName,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: siteData.socialImage,
        width: 1200,
        height: 630,
        alt: siteData.brandName
      }
    ]
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.seoTitle,
    description: siteData.seoDescription,
    images: [{ url: siteData.socialImage, width: 1200, height: 630, alt: siteData.brandName }]
  },
  robots: {
    index: true,
    follow: true
  },
  other: {
    "format-detection": "telephone=no"
  }
};

// themeColor sẽ đổi màu thanh trạng thái trình duyệt trên di động sang màu thương hiệu
export const viewport: Viewport = {
  themeColor: "#dc2626" // Màu đỏ của Ô Dù Đại Phát
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <head>
        {/* Dữ liệu cấu trúc giúp Google xác nhận số điện thoại 0349596898 là chính chủ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": siteData.brandName,
              "telephone": siteData.phone,
              "url": siteData.domain,
              "image": `${siteData.domain}${siteData.socialImage}`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hà Nội",
                "addressCountry": "VN"
              },
              "priceRange": "VND",
              "openingHours": "Mo-Su 08:00-21:00"
            }),
          }}
        />
      </head>
      <body className={beVietnamPro.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
