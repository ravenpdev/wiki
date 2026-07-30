import type { NextConfig } from "next";
// import { dirname } from "node:path";

const url = `${process.env.BLOB_BASE_URL}/**`;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["disloyal-corridor-mousiness.ngrok-free.dev"],
  images: {
    remotePatterns: [new URL(url)],
  },
  // turbopack: {
  //   root: dirname(__filename),
  // },
};

export default nextConfig;
