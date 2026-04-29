import { mediaContent } from "../content/media";
import { productCategories, products } from "../content/products";
import { projects } from "../content/projects";

export type ProductCategory = {
  slug: string;
  name: string;
  shortName: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  heroImage: string;
  benefits: string[];
};

export type Product = {
  slug: string;
  categorySlug: string;
  name: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  applications: string[];
  faq: { question: string; answer: string }[];
};

export type Project = {
  slug: string;
  title: string;
  locationSlug: string;
  locationName: string;
  type: string;
  summary: string;
  description: string;
  content: string;
  image: string;
  challenge: string;
  solution: string[];
  outcome: string;
  relatedProductSlugs: string[];
};

export type Area = {
  slug: string;
  name: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  shipping: string;
  support: string;
  demand: string[];
  featuredProductSlugs: string[];
  featuredProjectSlugs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  topic: string;
  content: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  relatedProductSlugs: string[];
};

export type PolicyPage = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

const productionDomain = "https://odudaiphat.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = configuredSiteUrl?.startsWith("https://") ? configuredSiteUrl.replace(/\/$/, "") : productionDomain;

export const siteData = {
  brandName: "Ô Dù Đại Phát",
  domain: siteUrl,
  phone: "0349596898",
  phoneDisplay: "0349 596 898",
  zaloLink: "https://zalo.me/0349596898",
  email: "odudaiphat@gmail.com",
  primaryKeyword: "ô dù ngoài trời toàn quốc",
  companySummary:
    "Ô Dù Đại Phát chuyên sản xuất và cung cấp ô dù ngoài trời, dù lệch tâm, dù quán cafe, dù sân vườn và dù che nắng chất lượng cao cho khách lẻ, dự án trên toàn quốc.",
  seoTitle:
    "Ô Dù Đại Phát | Xưởng Sản Xuất Ô Dù Ngoài Trời, Dù Lệch Tâm Giá Rẻ",
  seoDescription:
    "Xưởng Ô Dù Đại Phát chuyên ô dù ngoài trời, dù lệch tâm, dù quán cafe, dù sân vườn bền đẹp. Giá tại xưởng, bảo hành 2 năm, giao hàng toàn quốc. Gọi ngay 0349596898.",
  socialImage: mediaContent.ogImage,
  serviceArea: "Toàn quốc",
  secondaryDomain: "https://odungoaitroi.com",
  leadSuccessText: "Cảm ơn bạn! Ô Dù Đại Phát đã nhận yêu cầu và sẽ phản hồi sớm qua Zalo 0349596898 trong 5-10 phút.",
  leadErrorText: "Chưa gửi được yêu cầu. Vui lòng gọi trực tiếp 0349596898 để Ô Dù Đại Phát hỗ trợ nhanh nhất.",
  trustStats: [
    { value: "500+", label: "Công trình thực tế" },
    { value: "Toàn quốc", label: "Hỗ trợ giao hàng" },
    { value: "100%", label: "Giá gốc tại xưởng" },
    { value: "24 Th", label: "Bảo hành tận tâm" }
  ],
  benefits: [
    {
      title: "Giá gốc tại xưởng",
      text: "Sản xuất trực tiếp giúp Ô Dù Đại Phát mang đến mức giá cạnh tranh nhất, phù hợp cả khách lẻ và khách dự án.",
      icon: "💰"
    },
    {
      title: "Chống nắng tia UV",
      text: "Sử dụng vải dù cao cấp chuyên dụng, chống thấm nước và cản tia UV hiệu quả, bảo vệ sức khỏe người dùng.",
      icon: "☀️"
    },
    {
      title: "Công trình thực tế",
      text: "Hình ảnh công trình thật từ quán cafe, villa, resort giúp khách hàng dễ dàng chọn mẫu dù phù hợp.",
      icon: "🏗️"
    },
    {
      title: "Tư vấn chuyên sâu",
      text: "Đội ngũ Ô Dù Đại Phát đề xuất mẫu theo diện tích, phong cách và ngân sách thực tế qua Zalo 0349596898.",
      icon: "💬"
    }
  ],
  process: [
    "Khách gửi ảnh vị trí hoặc nhu cầu qua Zalo 0349596898.",
    "Tư vấn mẫu dù Đại Phát phù hợp nhất với không gian.",
    "Gửi báo giá nhanh kèm phương án vận chuyển.",
    "Chốt đơn, đóng gói và giao hàng toàn quốc.",
    "Hướng dẫn lắp đặt và hỗ trợ bảo hành dài hạn."
  ],
  testimonials: [
    {
      name: "Anh Tuấn",
      region: "TP.HCM",
      text: "Được Ô Dù Đại Phát tư vấn rất kỹ, dù lệch tâm vuông giao đúng mẫu, khung cực kỳ chắc chắn."
    },
    {
      name: "Chị Lan",
      region: "Đà Nẵng",
      text: "Mua online lúc đầu hơi lo nhưng nhận hàng của Đại Phát rất ưng ý, vải dày dặn, màu sắc đẹp."
    },
    {
      name: "Anh Hùng",
      region: "Hải Phòng",
      text: "Giá tốt vì mua tận xưởng, đội ngũ hỗ trợ nhiệt tình qua Zalo ngay cả khi đã nhận hàng."
    }
  ],
  faqs: [
    {
      question: "Ô Dù Đại Phát có giao hàng toàn quốc không?",
      answer:
        "Có. Ô Dù Đại Phát hỗ trợ vận chuyển nhanh toàn quốc cho cả khách lẻ và dự án số lượng lớn."
    },
    {
      question: "Làm sao để nhận báo giá ô dù nhanh nhất?",
      answer:
        "Quý khách vui lòng gửi ảnh mặt bằng hoặc mẫu dù quan tâm qua Zalo 0349 596 898 để nhận báo giá chi tiết sau 2 phút."
    },
    {
      question: "Sản phẩm của Đại Phát có được bảo hành không?",
      answer:
        "Tất cả sản phẩm chính hãng của Ô Dù Đại Phát đều được bảo hành khung và hỗ trợ thay thế vải dù khi khách hàng có nhu cầu."
    }
  ]
} as const;

export { productCategories, products, projects };

export const areas: Area[] = [
  {
    slug: "ha-noi",
    name: "Hà Nội",
    intro: "Ô Dù Đại Phát cung cấp giải pháp che nắng chuyên nghiệp cho quán cafe, biệt thự và nhà hàng tại Hà Nội với độ bền vượt trội.",
    seoTitle: "Ô dù ngoài trời Hà Nội | Xưởng Ô Dù Đại Phát Giá Rẻ",
    seoDescription: "Xưởng Ô Dù Đại Phát chuyên bán dù lệch tâm, dù chính tâm tại Hà Nội. Giao hàng nhanh, giá gốc tại xưởng. Hotline: 0349596898.",
    shipping: "Giao hàng siêu tốc trong ngày tại Hà Nội.",
    support: "Hỗ trợ lắp đặt trực tiếp hoặc hướng dẫn chi tiết qua video.",
    demand: ["Dù lệch tâm cafe", "Dù sân vườn biệt thự", "Dù che nắng nhà hàng"],
    featuredProductSlugs: ["du-chinh-tam-tron-3m-quay-tay", "du-lech-tam-3mx3m-khung-hop-kim-nhom-cao-cap"],
    featuredProjectSlugs: ["lap-du-san-vuon-ha-noi"]
  },
  {
    slug: "tp-hcm",
    name: "TP.HCM",
    intro: "Tại TP.HCM, Ô Dù Đại Phát mang đến các mẫu dù che nắng hiện đại, chịu được thời tiết khắc nghiệt, phù hợp không gian kinh doanh sôi động.",
    seoTitle: "Ô dù ngoài trời TP.HCM | Dù Cafe, Dù Lệch Tâm Đại Phát",
    seoDescription: "Bán ô dù ngoài trời tại TP.HCM. Ô Dù Đại Phát chuyên dù lệch tâm vuông, dù tròn cafe giá rẻ, bền đẹp. Gọi 0349596898.",
    shipping: "Vận chuyển toàn khu vực TP.HCM và các tỉnh lân cận.",
    support: "Tư vấn nhanh qua Zalo 0349596898 kèm hình ảnh thực tế.",
    demand: ["Dù hồ bơi", "Dù quán cafe", "Dù che nắng sân thượng"],
    featuredProductSlugs: ["du-lech-tam-3mx3m-tay-don-bay", "du-chinh-tam-chu-nhat-2m5x3m"],
    featuredProjectSlugs: ["lap-du-quan-cafe-tp-hcm"]
  },
  {
    slug: "da-nang",
    name: "Đà Nẵng",
    intro: "Ô Dù Đại Phát là đối tác tin cậy cho các resort, homestay và nhà hàng ven biển Đà Nẵng với dòng dù chống han gỉ cực tốt.",
    seoTitle: "Ô dù ngoài trời Đà Nẵng | Xưởng Sản Xuất Ô Dù Đại Phát",
    seoDescription: "Cung cấp ô dù che nắng tại Đà Nẵng cho resort, quán cafe. Dù Đại Phát bền đẹp, chống chịu gió biển tốt. Hotline: 0349596898.",
    shipping: "Hỗ trợ vận chuyển tận nơi tại Đà Nẵng.",
    support: "Tư vấn mẫu dù hợp concept nghỉ dưỡng qua Zalo.",
    demand: ["Dù resort biển", "Dù homestay", "Dù quán cafe phố"],
    featuredProductSlugs: ["du-chinh-tam-chu-nhat-2m5x3m", "du-lech-tam-3mx3m-khung-hop-kim-nhom-cao-cap"],
    featuredProjectSlugs: ["thi-cong-du-nha-hang-da-nang"]
  }
];

export const articles: Article[] = [
  {
    slug: "gia-o-du-ngoai-troi-bao-nhieu",
    title: "Giá ô dù ngoài trời bao nhiêu? Báo giá xưởng Ô Dù Đại Phát",
    excerpt: "Giá ô dù phụ thuộc vào kích thước và chất liệu. Ô Dù Đại Phát cam kết giá gốc tại xưởng, không qua trung gian. Hotline: 0349596898.",
    seoTitle: "Giá ô dù ngoài trời bao nhiêu? Báo giá Ô Dù Đại Phát 2026",
    seoDescription: "Cập nhật bảng giá ô dù ngoài trời, dù lệch tâm, dù cafe mới nhất tại xưởng Ô Dù Đại Phát. Liên hệ ngay để có giá tốt.",
    topic: "Báo giá ô dù",
    content: [
      { heading: "Tại sao nên mua ô dù trực tiếp tại xưởng Đại Phát?", paragraphs: ["Mua tại xưởng giúp bạn tiết kiệm từ 20-30% chi phí so với mua qua cửa hàng bán lẻ. Ô Dù Đại Phát trực tiếp sản xuất nên kiểm soát được chất lượng khung và vải dù.", "Khi liên hệ qua Zalo 0349 596 898, bạn sẽ nhận được báo giá sát nhất dựa trên số lượng và khu vực giao hàng."], bullets: ["Giá rẻ nhất thị trường", "Chế độ bảo hành trực tiếp từ nhà sản xuất", "Tùy chỉnh màu sắc theo yêu cầu"] }
    ],
    relatedProductSlugs: ["du-lech-tam-3mx3m-tay-don-bay", "du-chinh-tam-tron-3m-quay-tay"]
  },
  {
    slug: "nen-chon-du-quan-cafe-loai-nao",
    title: "Tư vấn chọn dù quán cafe chuẩn đẹp từ Ô Dù Đại Phát",
    excerpt: "Chọn đúng loại dù giúp quán cafe thu hút khách hơn. Đại Phát gợi ý các mẫu dù lệch tâm và chính tâm bền đẹp nhất.",
    seoTitle: "Nên chọn dù quán cafe loại nào? Tư vấn từ Ô Dù Đại Phát",
    seoDescription: "Hướng dẫn chọn dù cho quán cafe sân vườn, cafe phố. Các mẫu dù Đại Phát bán chạy nhất cho kinh doanh đồ uống.",
    topic: "Dù quán cafe",
    content: [
      { heading: "Các mẫu dù cafe được yêu thích nhất tại Đại Phát", paragraphs: ["Với không gian sân vườn rộng, dù lệch tâm vuông 3x3m là lựa chọn số 1. Với vỉa hè hẹp, dù chính tâm tròn mang lại sự gọn gàng nhưng vẫn che nắng hiệu quả.", "Liên hệ Zalo Ô Dù Đại Phát 0349596898 để xem thêm video thực tế các mẫu dù này."] }
    ],
    relatedProductSlugs: ["du-lech-tam-2m5x2m5-tay-bay", "du-chinh-tam-tron-3m-quay-tay"]
  }
];

export const policyPages: PolicyPage[] = [
  {
    slug: "van-chuyen",
    title: "Chính sách vận chuyển Ô Dù Đại Phát",
    seoTitle: "Chính sách vận chuyển | Ô Dù Đại Phát",
    seoDescription: "Thông tin vận chuyển toàn quốc các sản phẩm ô dù che nắng từ xưởng Ô Dù Đại Phát.",
    intro: "Ô Dù Đại Phát cam kết đóng gói cẩn thận và vận chuyển nhanh chóng tới tay khách hàng trên toàn quốc.",
    sections: [
      {
        heading: "Phạm vi giao hàng",
        paragraphs: ["Ô Dù Đại Phát vận chuyển tất cả các tỉnh thành từ Bắc vào Nam thông qua xe tải chuyên dụng hoặc chành xe uy tín."],
        bullets: ["Giao nội thành Hà Nội", "Giao TP.HCM và các tỉnh miền Nam", "Giao khu vực miền Trung và Tây Nguyên"]
      }
    ]
  },
  {
    slug: "bao-hanh",
    title: "Chính sách bảo hành Đại Phát",
    seoTitle: "Chính sách bảo hành | Ô Dù Đại Phát",
    seoDescription: "Cam kết chất lượng và chế độ bảo hành sản phẩm ô dù ngoài trời tại Ô Dù Đại Phát.",
    intro: "Sự hài lòng của khách hàng là ưu tiên hàng đầu. Ô Dù Đại Phát bảo hành khung và hỗ trợ kỹ thuật trọn đời.",
    sections: [
      {
        heading: "Thời gian bảo hành",
        paragraphs: ["Tất cả các dòng dù lệch tâm cao cấp được Ô Dù Đại Phát bảo hành khung từ 12-24 tháng tùy dòng sản phẩm."]
      }
    ]
  }
];

export function getCategory(slug: string) {
  return productCategories.find((item) => item.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((item) => item.categorySlug === slug);
}

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((item) => item.slug === slug);
}

export function getArea(slug: string) {
  return areas.find((item) => item.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((item) => item.slug === slug);
}

export function getPolicyPage(slug: string) {
  return policyPages.find((item) => item.slug === slug);
}

export function getRelatedProducts(slugs: string[]) {
  return products.filter((item) => slugs.includes(item.slug));
}

export function getRelatedProjects(slugs: string[]) {
  return projects.filter((item) => slugs.includes(item.slug));
}
