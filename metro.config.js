/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')

// storybook
// https://github.com/storybookjs/react-native?tab=readme-ov-file#getting-started
const path = require('path')
const { generate } = require('@storybook/react-native/scripts/generate')
generate({
  configPath: path.resolve(__dirname, './.ondevice'),
})

// svg
const defaultConfig = getDefaultConfig(__dirname)
const { assetExts, sourceExts } = defaultConfig.resolver

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
    unstable_allowRequireContext: true,
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'mjs'],
    resolveRequest: (context, moduleName, platform) => {
      const defaultResolveResult = context.resolveRequest(context, moduleName, platform)

      if (
        process.env.STORYBOOK_ENABLED !== 'true' &&
        defaultResolveResult?.filePath?.includes?.('.ondevice/')
      ) {
        return {
          type: 'empty',
        }
      }

      return defaultResolveResult
    },
  },
}

module.exports = mergeConfig(defaultConfig, config)
