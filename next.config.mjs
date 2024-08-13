/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                hostname: 'images.unsplash.com'

            },
            {
                hostname:'backend-edusn.s3.ap-south-1.amazonaws.com'
            }
        ]
    }
}
;

export default nextConfig;
