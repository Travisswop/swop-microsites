/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'ipfs.io',
      'i.imghippo.com',
      '104.248.234.73',
      'nft-cdn.alchemy.com',
      'cloudinary.com',
      'nftstorage.link',
      'cdn.coinranking.com',
      'dev.apiswop.co',
      'app.apiswop.co',
      'dingo-divine-unlikely.ngrok-free.app',
    ],
  },
};

module.exports = nextConfig;
