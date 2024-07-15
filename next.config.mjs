/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
            },
            {
                protocol: 'https',
                hostname: 'fotoco-storage.s3.ap-southeast-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'photoco.server.dev.s3.ap-southeast-1.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
