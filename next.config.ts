import type { NextConfig } from "next";

require('./app/memory-log');


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
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
    // ⚡ Optimize images for slow networks
    // formats: ['image/avif', 'image/webp'],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // minimumCacheTTL: 60,
    // dangerouslyAllowSVG: true,
    // contentDispositionType: 'attachment',
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ⚡ Disable source maps in production (reduces bundle size)
  productionBrowserSourceMaps: false,

  // ⚡ Enable React strict mode
  reactStrictMode: true,

  // ⚡ Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },

  // ⚡ Enable compression
  compress: true,

  // ⚡ Optimize for production
  poweredByHeader: false, // Remove X-Powered-By header

  // ⚡ Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['@/components', '@/utils'],

    // Optimize CSS
    optimizeCss: true,
  },

  // ⚡ Turbopack config for development
  ...(process.env.NODE_ENV !== "production" && {
    turbopack: {
      resolveAlias: {
        underscore: "lodash",
      },
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
    },
  }),

  // ⚡ Headers for better caching and compression
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //         {
  //           key: 'X-Content-Type-Options',
  //           value: 'nosniff',
  //         },
  //         {
  //           key: 'X-Frame-Options',
  //           value: 'DENY',
  //         },
  //         {
  //           key: 'X-XSS-Protection',
  //           value: '1; mode=block',
  //         },
  //       ],
  //     },
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, s-maxage=60, stale-while-revalidate=120',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default withBundleAnalyzer(nextConfig);
