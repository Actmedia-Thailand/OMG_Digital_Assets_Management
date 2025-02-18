/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false, // ปิดการแจ้งเตือน Missing Suspense
  },
};

export default nextConfig;
