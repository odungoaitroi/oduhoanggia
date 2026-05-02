import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Ô Dù Đại Phát - Ô Dù Ngoài Trời, Dù Che Nắng, Dù Sân Vườn',
    template: '%s | Ô Dù Đại Phát'
  },
  description: site.description,
  keywords: ['ô dù ngoài trời', 'dù che nắng', 'dù sân vườn', 'dù cafe', 'dù lệch tâm', 'dù đúng tâm', 'nhà bạt', 'bàn ghế ngoài trời', 'xích đu sân vườn'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: site.url,
    siteName: site.name,
    title: 'Ô Dù Đại Phát - Ô Dù Ngoài Trời Chất Lượng Cao',
    description: site.description,
    images: [{ url: '/images/og-image.webp', width: 1200, height: 630, alt: 'Ô Dù Đại Phát - ô dù ngoài trời cao cấp' }]
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {children}
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
