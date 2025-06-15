import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nandayure.com';
  
  // Rutas estáticas principales
  const mainRoutes = [
    '',
    '/auth/login',
    '/dashboard',
    '/profile',
    '/system-configuration',
    '/helps',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...mainRoutes];
} 