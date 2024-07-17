/** @type {import('next').NextConfig} */
const nextConfig = {};

const env = process.env.NODE_ENV;

if (env === 'production') {
  nextConfig['basePath'] = '/reboot-homepage';
  nextConfig['assetPrefix'] = '/reboot-homepage';
  nextConfig['images'] = {
    path: 'https://reboot-badminton.github.io/reboot-homepage',
  };
}

export default nextConfig;
