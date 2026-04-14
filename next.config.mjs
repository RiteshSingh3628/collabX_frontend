/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
  },
  allowedDevOrigins: ["nocuously-unsavage-billye.ngrok-free.dev"],
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com",'scontent.cdninstagram.com'],
  },
};

export default nextConfig;
