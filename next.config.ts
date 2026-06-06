import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 本地 dev 时把 /backend-api 代理到管理系统后端，避免跨域
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    const backend =
      process.env.NEWS_BACKEND_URL?.replace(/\/$/, "") ||
      "http://localhost:3000/api";
    return [
      {
        source: "/backend-api/:path*",
        destination: `${backend}/:path*`,
      },
    ];
  },
};

export default nextConfig;
