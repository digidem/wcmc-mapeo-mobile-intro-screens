/**
 * React Native is bundled with Metro. Metro cannot read node_modules from a
 * parent folder, and it can't read symbolic links. We need to mirror any
 * installed dependencies from the parent folder to this example folder, and we
 * tell metro how to resolve deps from the parent folder with `extraNodeModules`
 *
 * We add the parent folder (`root`) to watchFolders so that the example app
 * updates whenever we change the code in the parent.
 *
 * For background on this (complicated!) method see:
 * https://callstack.com/blog/adding-an-example-app-to-your-react-native-library/
 */

const path = require('path')
const fs = require('fs')
const blacklist = require('metro-config/src/defaults/blacklist')
const escape = require('escape-string-regexp')

const root = path.resolve(__dirname, '..')
const pak = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))

const modules = [
  '@babel/runtime',
  '@expo/vector-icons',
  ...Object.keys({
    ...pak.dependencies,
    ...pak.peerDependencies,
  }),
]

module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],

  resolver: {
    blacklistRE: blacklist([
      new RegExp(`^${escape(path.join(root, 'node_modules'))}\\/.*$`),
    ]),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name)
      return acc
    }, {}),
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
}
