/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add support for .tex file uploads
  webpack: (config) => {
    config.module.rules.push({
      test: /\.tex$/,
      type: 'asset/resource',
    });
    return config;
  },
  // Add any other Next.js configuration options here
};

module.exports = nextConfig;
