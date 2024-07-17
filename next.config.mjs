/** @type {import('next').NextConfig} */
const nextConfig = {};

const env = process.env.NODE_ENV;

if (env === 'production') {
  nextConfig['basePath'] = '/reboot-homepage';
}

export default nextConfig;
