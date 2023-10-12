const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const watchFolders = [
  //Relative path to packages directory
  path.resolve(`${__dirname}/../shared/images`),
  path.resolve(`${__dirname}/../shared/names`),
  path.resolve(`${__dirname}/../shared/types/announcement`),
  path.resolve(`${__dirname}/../shared/types/date`),
  path.resolve(`${__dirname}/../shared/types/error`),
  path.resolve(`${__dirname}/../shared/types/firebase`),
  path.resolve(`${__dirname}/../shared/types/media`),
  path.resolve(`${__dirname}/../shared/types/student`),
  path.resolve(`${__dirname}/../../node_modules`), // References `package_name/node_modules`
  path.resolve(`${__dirname}/../../node_modules/react-native`),
  path.resolve(`${__dirname}/../../node_modules/nativewind/tailwind`), // References `css`
];

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
