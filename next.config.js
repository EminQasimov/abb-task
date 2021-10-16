const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // if you had eslint or ts errors, uncomment this to get build
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
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
