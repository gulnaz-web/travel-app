import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: '@import \'@/app/styles/_variables.scss\';',
    includePaths: ['./'],
  },
}

export default nextConfig
