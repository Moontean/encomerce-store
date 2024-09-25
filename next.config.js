/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com'],
    },
  }
  module.exports = nextConfig
  // module.exports = {
  //   async rewrites() {
  //     return [
  //       {
  //         source: '/api/:id/checkout',
  //         destination: 'http://localhost:3000/api/:id/checkout',
  //       },
  //     ];
  //   },
  // };
  