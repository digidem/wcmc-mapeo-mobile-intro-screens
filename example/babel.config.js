module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@digidem/wcmc-mapeo-mobile-intro': '../src/index',
          'react-native-vector-icons': '@expo/vector-icons',
        },
      },
    ],
  ],
}
