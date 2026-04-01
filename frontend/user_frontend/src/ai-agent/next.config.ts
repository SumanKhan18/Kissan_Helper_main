import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
//   typescript: {
//     // ignoreBuildErrors: true,
//   },
// };

// export default nextConfig;

// next.config.ts
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "ALLOWALL", // or 'SAMEORIGIN'
        },
      ],
    },
  ],
};

export default nextConfig;
