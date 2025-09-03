/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [ // <-- Array começa
      {
        protocol: 'https' ,
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ], 
  }, 
};

module.exports = nextConfig;