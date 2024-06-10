const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { GenerateSW } = require('workbox-webpack-plugin');

/**
 * Production Webpack configuration.
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  /**
   * Mode configuration.
   * @type {string}
   */
  mode: 'production',

  /**
   * Plugins used in the build process.
   * @type {import('webpack').WebpackPluginInstance[]}
   */
  plugins: [
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.(js|css|html|json)$/],
      runtimeCaching: [
        {
          urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
            },
          },
        },
        {
          urlPattern: /http:\/\/localhost:3000\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 24 * 60 * 60, // Cache for one day
            },
          },
        },
      ],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB limit
    }),
  ],
});
