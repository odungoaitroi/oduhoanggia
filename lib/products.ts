export type CategorySlug =
  | 'du-lech-tam'
  | 'du-dung-tam'
  | 'du-cafe'
  | 'du-san-vuon'
  | 'du-quang-cao'
  | 'nha-bat'
  | 'ban-ghe-ngoai-troi'
  | 'xich-du'
  | 'combo-setup';

export type Category = {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  keywords: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: string;
  size: string;
  material: string;
  image: string;
  badge: string;
  shortDescription: string;
  description: string;
  applications: string[];
  keywords: string[];
};

export const categories: Category[] = [
  {
    slug: 'du-lech-tam',
    name: 'Dù lệch tâm',
    title: 'Dù lệch tâm ngoài trời cao cấp',
    description: 'Dù lệch tâm vuông, tròn, xoay 360 độ cho quán cafe, sân vườn, hồ bơi, resort và khu nghỉ dưỡng.',
    keywords: ['dù lệch tâm', 'ô dù lệch tâm', 'dù lệch tâm 3m', 'dù lệch tâm xoay 360']
  },
  {
    slug: 'du-dung-tam',
    name: 'Dù đúng tâm',
    title: 'Dù đúng tâm, dù chính tâm ngoài trời',
    description: 'Dù đúng tâm tròn, vuông, cán sắt, cán gỗ, giá tốt, dễ lắp đặt cho quán ăn, sân vườn và điểm bán hàng.',
    keywords: ['dù đúng tâm', 'dù chính tâm', 'ô dù chính tâm', 'dù che nắng chính tâm']
  },
  {
    slug: 'du-cafe',
    name: 'Dù cafe',
    title: 'Dù cafe ngoài trời cho quán cafe, nhà hàng',
    description: 'Dù cafe vuông, tròn, nhiều màu, che nắng tốt, phù hợp bàn ghế ngoài trời và không gian kinh doanh.',
    keywords: ['dù cafe', 'ô dù cafe', 'dù quán cafe', 'dù che nắng quán cafe']
  },
  {
    slug: 'du-san-vuon',
    name: 'Dù sân vườn',
    title: 'Dù sân vườn cao cấp cho biệt thự, resort',
    description: 'Dù sân vườn cao cấp, tán rộng, màu đẹp, phù hợp biệt thự, hồ bơi, homestay, resort và khu nghỉ dưỡng.',
    keywords: ['dù sân vườn', 'ô dù sân vườn', 'dù ngoài trời sân vườn']
  },
  {
    slug: 'du-quang-cao',
    name: 'Dù quảng cáo',
    title: 'Dù quảng cáo in logo thương hiệu',
    description: 'Nhận sản xuất dù quảng cáo, dù in logo, dù sự kiện cho điểm bán hàng, activation và chiến dịch marketing.',
    keywords: ['dù quảng cáo', 'ô dù quảng cáo', 'dù in logo', 'dù sự kiện']
  },
  {
    slug: 'nha-bat',
    name: 'Nhà bạt',
    title: 'Nhà bạt di động ngoài trời',
    description: 'Nhà bạt di động, nhà bạt sự kiện, nhà bạt che nắng mưa cho hội chợ, quán ăn, kho bãi và điểm bán hàng.',
    keywords: ['nhà bạt', 'nhà bạt di động', 'nhà bạt sự kiện']
  },
  {
    slug: 'ban-ghe-ngoai-troi',
    name: 'Bàn ghế ngoài trời',
    title: 'Bàn ghế sân vườn, bàn ghế ngoài trời',
    description: 'Bàn ghế ngoài trời, bàn ghế sân vườn, ghế băng, bộ bàn ghế cafe phù hợp đi kèm ô dù ngoài trời.',
    keywords: ['bàn ghế ngoài trời', 'bàn ghế sân vườn', 'bàn ghế cafe ngoài trời']
  },
  {
    slug: 'xich-du',
    name: 'Xích đu',
    title: 'Xích đu sân vườn ngoài trời',
    description: 'Xích đu sân vườn, xích đu ngoài trời cho biệt thự, homestay, resort, quán cafe và khu nghỉ dưỡng.',
    keywords: ['xích đu sân vườn', 'xích đu ngoài trời', 'xích đu cafe']
  },
  {
    slug: 'combo-setup',
    name: 'Combo setup',
    title: 'Combo setup quán cafe, sân vườn ngoài trời',
    description: 'Combo ô dù + bàn ghế + tư vấn bố trí không gian ngoài trời cho quán cafe, nhà hàng, resort và homestay.',
    keywords: ['combo setup quán cafe', 'combo ô dù bàn ghế', 'setup cafe ngoài trời']
  }
];

export const products: Product[] = [
  {
    slug: 'du-lech-tam-tron-3m-xoay-360',
    name: 'Dù Lệch Tâm Tròn 3m Xoay 360',
    category: 'du-lech-tam',
    price: 'Liên hệ',
    size: 'Đường kính 3m',
    material: 'Khung sắt sơn tĩnh điện, vải polyester/PU chống thấm',
    image: '/images/du-lech-tam-tron-3m.webp',
    badge: 'Bán chạy',
    shortDescription: 'Dù lệch tâm cao cấp cho sân vườn, hồ bơi, resort và quán cafe ngoài trời.',
    description: 'Mẫu dù lệch tâm tròn 3m xoay 360 phù hợp cho không gian cần che nắng rộng nhưng vẫn đảm bảo thẩm mỹ và sự thông thoáng bên dưới tán dù.',
    applications: ['Quán cafe', 'Resort', 'Hồ bơi', 'Sân vườn', 'Nhà hàng'],
    keywords: ['dù lệch tâm 3m', 'dù lệch tâm xoay 360', 'ô dù ngoài trời cao cấp']
  },
  {
    slug: 'du-lech-tam-vuong-2m5',
    name: 'Dù Lệch Tâm Vuông 2.5m',
    category: 'du-lech-tam',
    price: 'Liên hệ',
    size: '2.5m x 2.5m',
    material: 'Khung kim loại dày, tán vuông, chân đế chắc chắn',
    image: '/images/du-lech-tam-vuong-2m5.webp',
    badge: 'Cafe',
    shortDescription: 'Tán vuông dễ bố trí theo dãy bàn, phù hợp quán cafe và nhà hàng ngoài trời.',
    description: 'Dù lệch tâm vuông 2.5m giúp tối ưu diện tích che nắng và dễ phối cùng bàn ghế ngoài trời theo layout quán.',
    applications: ['Cafe sân vườn', 'Nhà hàng', 'Khu vực ghế ngồi ngoài trời'],
    keywords: ['dù lệch tâm vuông', 'dù cafe vuông', 'ô dù lệch tâm vuông']
  },
  {
    slug: 'du-dung-tam-sat-3m',
    name: 'Dù Đúng Tâm Sắt 3m',
    category: 'du-dung-tam',
    price: 'Liên hệ',
    size: 'Đường kính 3m',
    material: 'Trụ giữa sắt sơn tĩnh điện, tán tròn che nắng rộng',
    image: '/images/du-dung-tam-3m.webp',
    badge: 'Giá tốt',
    shortDescription: 'Dòng dù phổ thông, giá tốt, dễ lắp đặt cho quán ăn và điểm bán hàng.',
    description: 'Dù đúng tâm sắt 3m là lựa chọn tiết kiệm, bền, dễ sử dụng cho các khu vực cần che nắng linh hoạt.',
    applications: ['Quán ăn', 'Sân vườn', 'Điểm bán hàng', 'Sự kiện nhỏ'],
    keywords: ['dù đúng tâm 3m', 'dù chính tâm', 'ô dù chính tâm giá tốt']
  },
  {
    slug: 'du-dung-tam-can-go-3m',
    name: 'Dù Đúng Tâm Cán Gỗ 3m',
    category: 'du-dung-tam',
    price: 'Liên hệ',
    size: 'Đường kính 3m',
    material: 'Cán gỗ, vải màu kem, phong cách sang trọng',
    image: '/images/du-dung-tam-can-go-3m.webp',
    badge: 'Cao cấp',
    shortDescription: 'Dù cán gỗ phù hợp không gian cafe, resort, homestay phong cách tự nhiên.',
    description: 'Dù đúng tâm cán gỗ tạo cảm giác ấm, sang và phù hợp các không gian ưu tiên trải nghiệm thị giác.',
    applications: ['Homestay', 'Cafe sân vườn', 'Resort', 'Biệt thự'],
    keywords: ['dù cán gỗ', 'dù đúng tâm cán gỗ', 'dù sân vườn cán gỗ']
  },
  {
    slug: 'du-cafe-vuong-2m5',
    name: 'Dù Cafe Vuông 2.5m',
    category: 'du-cafe',
    price: 'Liên hệ',
    size: '2.5m x 2.5m',
    material: 'Khung kim loại, vải dày che nắng tốt',
    image: '/images/du-cafe-vuong-2m5.webp',
    badge: 'Quán cafe',
    shortDescription: 'Dù cafe vuông cho bàn ghế ngoài trời, quán cafe, nhà hàng và quán ăn.',
    description: 'Mẫu dù cafe vuông giúp tạo khu vực ngồi dễ chịu, tăng số bàn phục vụ và nâng trải nghiệm khách hàng.',
    applications: ['Cafe', 'Nhà hàng', 'Quán ăn', 'Sân thượng'],
    keywords: ['dù cafe', 'dù quán cafe', 'ô dù cafe vuông']
  },
  {
    slug: 'du-san-vuon-cao-cap',
    name: 'Dù Sân Vườn Cao Cấp',
    category: 'du-san-vuon',
    price: 'Liên hệ',
    size: 'Nhiều kích thước',
    material: 'Khung dày, vải chống tia UV, màu sắc đa dạng',
    image: '/images/du-san-vuon-cao-cap.webp',
    badge: 'Sân vườn',
    shortDescription: 'Dù sân vườn tạo điểm nhấn sang trọng cho biệt thự, hồ bơi và khu nghỉ dưỡng.',
    description: 'Dù sân vườn cao cấp phù hợp cho không gian ngoài trời cần tính thẩm mỹ, độ bền và khả năng che nắng tốt.',
    applications: ['Sân vườn', 'Biệt thự', 'Hồ bơi', 'Resort'],
    keywords: ['dù sân vườn', 'ô dù sân vườn', 'dù ngoài trời cao cấp']
  },
  {
    slug: 'du-quang-cao-in-logo',
    name: 'Dù Quảng Cáo In Logo',
    category: 'du-quang-cao',
    price: 'Liên hệ',
    size: 'Theo yêu cầu',
    material: 'Vải in logo, khung chắc, dễ nhận diện thương hiệu',
    image: '/images/du-quang-cao-in-logo.webp',
    badge: 'In logo',
    shortDescription: 'Nhận in logo lên dù quảng cáo cho sự kiện, điểm bán hàng và thương hiệu.',
    description: 'Dù quảng cáo in logo giúp tăng nhận diện thương hiệu và tạo điểm che nắng nổi bật tại điểm bán.',
    applications: ['Điểm bán hàng', 'Sự kiện', 'Activation', 'Khai trương'],
    keywords: ['dù quảng cáo', 'dù in logo', 'ô dù quảng cáo']
  },
  {
    slug: 'nha-bat-di-dong-ngoai-troi',
    name: 'Nhà Bạt Di Động Ngoài Trời',
    category: 'nha-bat',
    price: 'Liên hệ',
    size: '3x3m, 3x6m, theo yêu cầu',
    material: 'Khung thép, bạt che nắng mưa, dễ tháo lắp',
    image: '/images/nha-bat-di-dong.webp',
    badge: 'Sự kiện',
    shortDescription: 'Nhà bạt di động cho sự kiện, hội chợ, quán ăn và điểm bán hàng ngoài trời.',
    description: 'Nhà bạt di động là giải pháp che nắng mưa tạm thời, dễ lắp đặt và phù hợp nhiều mục đích kinh doanh.',
    applications: ['Sự kiện', 'Hội chợ', 'Quán ăn', 'Kho bãi'],
    keywords: ['nhà bạt di động', 'nhà bạt sự kiện', 'nhà bạt ngoài trời']
  },
  {
    slug: 'ban-ghe-ngoai-troi-nhom-duc',
    name: 'Bàn Ghế Ngoài Trời Nhôm Đúc',
    category: 'ban-ghe-ngoai-troi',
    price: 'Liên hệ',
    size: 'Bộ 4-6 ghế',
    material: 'Nhôm đúc, sơn ngoài trời, mặt bàn cao cấp',
    image: '/images/ban-ghe-ngoai-troi.webp',
    badge: 'Upsell',
    shortDescription: 'Bàn ghế ngoài trời phù hợp đi kèm ô dù cho cafe, sân vườn và resort.',
    description: 'Bàn ghế ngoài trời nhôm đúc có độ bền cao, tạo sự đồng bộ cho không gian kinh doanh ngoài trời.',
    applications: ['Cafe', 'Sân vườn', 'Resort', 'Biệt thự'],
    keywords: ['bàn ghế ngoài trời', 'bàn ghế sân vườn', 'bàn ghế cafe ngoài trời']
  },
  {
    slug: 'xich-du-san-vuon-ngoai-troi',
    name: 'Xích Đu Sân Vườn Ngoài Trời',
    category: 'xich-du',
    price: 'Liên hệ',
    size: '2-3 chỗ ngồi',
    material: 'Khung sắt/nhôm, đệm ngoài trời, mái che',
    image: '/images/xich-du-san-vuon.webp',
    badge: 'Trang trí',
    shortDescription: 'Xích đu sân vườn cho homestay, resort, cafe và khu nghỉ dưỡng.',
    description: 'Xích đu sân vườn là sản phẩm bổ trợ giúp tăng trải nghiệm và tạo điểm chụp ảnh cho khách hàng.',
    applications: ['Homestay', 'Resort', 'Cafe', 'Sân vườn'],
    keywords: ['xích đu sân vườn', 'xích đu ngoài trời', 'xích đu cafe']
  },
  {
    slug: 'combo-setup-quan-cafe-ngoai-troi',
    name: 'Combo Setup Quán Cafe Ngoài Trời',
    category: 'combo-setup',
    price: 'Liên hệ',
    size: 'Theo mặt bằng',
    material: 'Dù cafe + bàn ghế + tư vấn bố trí không gian',
    image: '/images/combo-setup-quan-cafe.webp',
    badge: 'Combo',
    shortDescription: 'Combo trọn bộ giúp chủ quán setup khu vực cafe ngoài trời nhanh và đẹp.',
    description: 'Combo setup quán cafe ngoài trời giúp khách hàng mua theo giải pháp, gồm ô dù, bàn ghế và tư vấn bố trí theo mặt bằng.',
    applications: ['Cafe mới mở', 'Nhà hàng', 'Homestay', 'Sân thượng'],
    keywords: ['combo setup quán cafe', 'combo ô dù bàn ghế', 'setup cafe ngoài trời']
  }
];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const productsByCategory = (slug: string) => products.filter((product) => product.category === slug);
