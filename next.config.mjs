/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=600, stale-while-revalidate=1200" },
        ],
      },
      {
        source: "/events.md",
        headers: [
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=600, stale-while-revalidate=1200" },
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
