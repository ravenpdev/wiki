import type { NextConfig } from "next";
// import { dirname } from "node:path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ["disloyal-corridor-mousiness.ngrok-free.dev"],
  // turbopack: {
  //   root: dirname(__filename),
  // },
};

export default nextConfig;
