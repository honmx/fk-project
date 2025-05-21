/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "footykids-files-storage.storage.yandexcloud.net"
      }
    ]
  }
};

module.exports = nextConfig;
