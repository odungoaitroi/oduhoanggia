import type { Metadata } from "next";
import GuideVideoPage from "../huong-dan/page";
import { siteData } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Video sửa chữa ô dù, sửa dù lệch tâm, thay vải dù | Ô Dù Đại Phát",
  description:
    "Video kỹ thuật sau bán hàng về sửa chữa ô dù, sửa dù lệch tâm, sửa dù chính tâm, thay vải dù, sửa tay quay ô dù và bảo trì ô dù cafe.",
  alternates: {
    canonical: "/video-huong-dan"
  },
  openGraph: {
    title: "Video hướng dẫn sửa chữa và bảo trì ô dù",
    description:
      "Tổng hợp video thực tế về thay vải, sửa tay quay, sửa khung, sửa dù lệch tâm/chính tâm và bảo trì ô dù cafe.",
    url: `${siteData.domain}/video-huong-dan`,
    type: "website",
    images: [
      {
        url: siteData.socialImage,
        width: 1200,
        height: 630,
        alt: "Video hướng dẫn sửa chữa và bảo trì ô dù Ô Dù Đại Phát"
      }
    ]
  }
};

export default GuideVideoPage;
