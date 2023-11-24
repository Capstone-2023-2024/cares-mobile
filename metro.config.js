const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

/** Relative path to packages directory*/
const watchFolders = [path.resolve(__dirname, '../libs/typescript/lib/src')];

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ['js', 'ts', 'tsx', 'svg', 'json', 'png', 'jpg'],
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
