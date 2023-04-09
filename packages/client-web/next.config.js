/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "image.tmdb.org"
    ],
  },
  output: 'standalone',
  pageExtensions: [
    'page.tsx'
  ]
}

module.exports = nextConfig
