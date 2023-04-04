/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  nextAuth: {
    configFile: 'next-auth.config.js',
  },
}

module.exports = nextConfig
