/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'ipfs.io', '104.248.234.73'],
  },
};

module.exports = nextConfig;
