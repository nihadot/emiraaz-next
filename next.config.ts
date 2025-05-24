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
};



export default nextConfig;
