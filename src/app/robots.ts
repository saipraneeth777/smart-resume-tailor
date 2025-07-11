import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/', // Allow all pages to be crawled by default
      disallow: [
        '/api/', // Disallow API routes
        '/_next/', // Disallow Next.js internals
        '/auth/', // Disallow auth pages (handled by NextAuth.js)
        '/dashboard/private/', // Example of private dashboard routes
      ],
    },
    sitemap: 'https://resumetailorai.com/sitemap.xml',
    // Optional: Add host for canonical URLs
    host: 'https://resumetailorai.com',
  };
}
