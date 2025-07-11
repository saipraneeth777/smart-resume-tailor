import { MetadataRoute } from 'next';

// Mock data for blog posts
const blogPosts = [
  { slug: '10-resume-mistakes', date: '2023-11-15' },
  { slug: 'how-to-tailor-resume', date: '2023-11-05' },
  { slug: 'ultimate-ats-guide', date: '2023-10-28' },
  { slug: 'top-resume-formats-2023', date: '2023-10-15' },
  { slug: 'how-to-write-cover-letter', date: '2023-10-05' },
  { slug: 'future-ai-job-search', date: '2023-09-25' },
];

// Mock data for blog tags
const blogTags = [
  'resume',
  'job-search',
  'career-advice',
  'interview-tips',
  'cover-letters',
  'career-trends',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resumetailorai.com';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tailor`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Blog posts
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog tags
  const blogTagPages = blogTags.map((tag) => ({
    url: `${baseUrl}/blog/tag/${tag}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  // Combine all pages
  return [...staticPages, ...blogPostPages, ...blogTagPages];
}
