import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
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

  reactStrictMode: process.env.NODE_ENV === "production", // enabled only in production

  swcMinify: process.env.NODE_ENV === "production",

  compiler: { removeConsole: process.env.NODE_ENV === "production" },

  ...(process.env.NODE_ENV !== "production" && {
    turbopack: {
      resolveAlias: {
        underscore: "lodash",
      },
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    experimental: {
      swcTraceProfiling: false,
    },
  }),

};




export default withBundleAnalyzer(nextConfig);
