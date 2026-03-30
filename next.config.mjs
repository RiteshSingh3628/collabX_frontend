/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
  },
  allowedDevOrigins: ["nocuously-unsavage-billye.ngrok-free.dev"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
