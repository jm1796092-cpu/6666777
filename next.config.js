/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        https: false,
        http: false,
        stream: false,
        zlib: false,
        path: false,
        crypto: false,
        url: false,
      };
      
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:fs': false,
        'node:https': false,
        'node:http': false,
        'node:stream': false,
        'node:zlib': false,
        'node:path': false,
        'node:crypto': false,
        'node:url': false,
      };
      
      config.externals = config.externals || [];
      config.externals.push({
        'node:fs': 'commonjs node:fs',
        'node:https': 'commonjs node:https',
        'node:http': 'commonjs node:http',
        'node:stream': 'commonjs node:stream',
        'node:zlib': 'commonjs node:zlib',
        'node:path': 'commonjs node:path',
        'node:crypto': 'commonjs node:crypto',
        'node:url': 'commonjs node:url',
      });
    }
    
    return config;
  },
}

module.exports = nextConfig
