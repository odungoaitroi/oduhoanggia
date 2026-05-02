export const site = {
  name: 'Ô Dù Đại Phát',
  phone: process.env.NEXT_PUBLIC_PHONE || '0349596898',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://odudaiphat.com',
  secondaryUrl: process.env.NEXT_PUBLIC_SECONDARY_SITE_URL || 'https://odungoaitroi.com',
  description:
    'Ô Dù Đại Phát chuyên cung cấp ô dù ngoài trời, dù che nắng, dù sân vườn, dù cafe, dù lệch tâm, dù đúng tâm, nhà bạt, bàn ghế ngoài trời, xích đu chất lượng cao.'
};

export const canonical = (path = '/') => `${site.url}${path === '/' ? '' : path}`;
