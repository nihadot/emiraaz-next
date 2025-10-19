import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',

      },
      {
        protocol: 'https',
        hostname: 'property-seller-com.s3.me-central-1.amazonaws.com',
      }
    ],
   unoptimized: true,

  
  },
  productionBrowserSourceMaps: false, // ⛔ disables .map files in production

  // reactStrictMode: false, // optional if causing too many re-renders
  // turbo: true,
  // typescript: {
  //   ignoreBuildErrors: true, // in dev only!
  // },
};

// tsc --noEmit --watch



export default withBundleAnalyzer(nextConfig);
