import * as React from 'react'
import { View, StyleSheet } from 'react-native'

import Animated from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { LinearGradient } from 'expo-linear-gradient'
import { withTimingTransition, useValues } from 'react-native-redash'
import { Route } from 'react-native-tab-view'

const {
  interpolate,
  Extrapolate,
  useCode,
  block,
  greaterOrEq,
  set,
  sub,
} = Animated

const DOT_SIZE = 10
const DOT_SPACING = 10
const DOT_HIT_SLOP = {
  left: DOT_SPACING / 2,
  right: DOT_SPACING / 2,
  top: 20,
  bottom: 10,
}

const IntroDots = ({
  position,
  routes,
  jumpTo,
  onPressNext,
}: {
  position: Animated.Node<number>
  routes: Route[]
  jumpTo: (index: number) => void
  onPressNext: () => void
}) => {
  const [isLast, isNotLast] = useValues([0, 0], [])
  const translateX = interpolate(position, {
    inputRange: [0, routes.length - 1],
    outputRange: [0, (DOT_SPACING + DOT_SIZE) * (routes.length - 1)],
    extrapolate: Extrapolate.CLAMP,
  })
  const buttonScale = interpolate(position, {
    inputRange: [routes.length - 1, routes.length],
    outputRange: [1, 3],
    extrapolateLeft: Extrapolate.CLAMP,
  })

  useCode(
    () =>
      block([
        set(
          isLast,
          withTimingTransition(greaterOrEq(position, routes.length - 1.05), {
            duration: 150,
          })
        ),
        set(isNotLast, sub(1, isLast)),
      ]),
    []
  )

  return (
    <View style={styles.root}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={['#0000', '#0004']}
      />
      <View style={styles.spacer} />
      <View style={styles.dotContainer}>
        {routes.map((route, index) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => jumpTo(index)}
            hitSlop={DOT_HIT_SLOP}
            style={styles.dot}
            accessible={false}
          />
        ))}
        <Animated.View
          style={[styles.dotHighlight, { transform: [{ translateX }] }]}
        />
      </View>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          onPress={onPressNext}
          style={styles.buttonContainer}
          accessibilityLabel="Continue"
          accessibilityHint="Navigate to the next page"
        >
          <View style={styles.buttonContainer}>
            <Animated.View style={[styles.nextButton, { opacity: isLast }]}>
              <Octicons name="check" color="rgba(0,0,0,0.8)" size={26} />
            </Animated.View>
            <Animated.View style={[styles.nextButton, { opacity: isNotLast }]}>
              <MaterialIcons
                name="navigate-next"
                size={36}
                color="rgba(0,0,0,0.8)"
              />
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default React.memo(IntroDots)

const styles = StyleSheet.create({
  root: {
    paddingBottom: 15,
    paddingTop: 5,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spacer: {
    width: 48,
  },
  buttonContainer: {
    width: 48,
    height: 48,
  },
  nextButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(220,220,220,1)',
    borderWidth: 0,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotHighlight: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: 'white',
    position: 'absolute',
    left: DOT_SPACING,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 0,
    marginHorizontal: DOT_SPACING / 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotContainer: {
    flexDirection: 'row',
    minHeight: 'auto',
    paddingVertical: DOT_SPACING,
    paddingHorizontal: DOT_SPACING / 2,
    flex: 0,
    zIndex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
