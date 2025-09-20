
// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['res.cloudinary.com', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
//   },
//   env: {
//     WHATSAPP_PHONE_NUMBER: process.env.WHATSAPP_PHONE_NUMBER,
//   }
// }

// module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;