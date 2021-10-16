const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  webpack: (config, options) => {
    if (options.dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [...config.watchOptions.ignored, "**/src/db/data/**"],
      }
    }

    return config
  },
}
