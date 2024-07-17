import nextConfig from '@/next.config.mjs';

export function src(path: string) {
  return (nextConfig.basePath ?? '') + path;
}
