import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'covers.openlibrary.org',
                pathname: '/b/**',
            },
        ],
    },
};

export default nextConfig;