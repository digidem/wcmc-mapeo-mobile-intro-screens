import React from 'react'
import {
  Image,
  StyleSheet,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native'
// import url from 'url'
// import { SvgUri, SvgXml } from 'react-native-svg'

/**
 * For a source that is either SVG or bitmap, render the best way. SVGs in
 * react-native are a real pain, and expo and bare react-native projects differ
 * in how they handle require'ing SVG files.
 */
const UniversalImage = ({
  source,
  style,
}: {
  source: ImageSourcePropType
  style?: ImageStyle
}) => {
  // if (typeof source === 'string' && /^<svg\s/.test(source)) {
  //   return (
  //     <SvgXml
  //       width="100%"
  //       height="100%"
  //       xml={source}
  //       style={[styles.fill, style]}
  //     />
  //   )
  // }

  // const { uri } = Image.resolveAssetSource(source)
  // const { pathname } = url.parse(uri)

  // if (pathname && /\.svg$/.test(pathname)) {
  //   return (
  //     <SvgUri
  //       width="100%"
  //       height="100%"
  //       uri={uri}
  //       style={[styles.fill, style]}
  //     />
  //   )
  // } else {
  return (
    <Image source={source} style={[styles.fill, style]} resizeMode="contain" />
  )
  // }
}

const styles = StyleSheet.create({
  fill: {
    width: '100%',
    height: '100%',
  },
})

export default UniversalImage
