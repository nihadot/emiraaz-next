import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',

      },
    ],
   unoptimized: true,

  
  },

  // reactStrictMode: false, // optional if causing too many re-renders
  // turbo: true,
  // typescript: {
  //   ignoreBuildErrors: true, // in dev only!
  // },
};

// tsc --noEmit --watch



export default nextConfig;
