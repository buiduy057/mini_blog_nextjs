/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // bật Strict Mode của React
  compiler: {
    styledComponents: true, // nếu dùng styled-components
  },
  // các option khác nếu cần
};

module.exports = nextConfig;
