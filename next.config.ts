import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reqres.in",
        port: "",
        pathname: "/img/**",
      },
    ],
  }
};

export default nextConfig;
