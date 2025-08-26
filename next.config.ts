import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow cross-origin requests from the development environment
  // This is required for Firebase Studio to work correctly.
  experimental: {
    allowedDevOrigins: [
      "*.cluster-fsmcisrvfbb5cr5mvra3hr3qyg.cloudworkstations.dev",
      "*.cloudworkstations.dev",
    ],
  },
};

export default nextConfig;
