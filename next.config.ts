import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async rewrites() {
    return [{ source: '/dang-ky-30-plus', destination: '/30plus-travel-preview.html' }];
  },
};
export default config;
