// import type { NextConfig } from "next";
// const nextConfig: NextConfig = {
//   /* config options here */
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental", // ppr: boolean | "incremental"
  },
};

export default nextConfig;
