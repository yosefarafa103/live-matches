import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.gemini.media",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // path: "https://media.gemini.media/img/yallakora*"
};

export default nextConfig;
