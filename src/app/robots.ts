import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/auth/',
        '/private/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: 'https://nandayure.com/sitemap.xml',
  };
} 