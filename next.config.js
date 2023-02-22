/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["s4.anilist.co", "img1.ak.crunchyroll.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
