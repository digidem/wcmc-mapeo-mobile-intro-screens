// @flow
import * as React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageSourcePropType,
} from 'react-native'
import {
  useValues,
  clamp,
  between,
  TimingConfig,
  SpringConfig,
} from 'react-native-redash'
// import LottieView from 'lottie-react-native'
import Animated, { Easing } from 'react-native-reanimated'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import getContrastRatio from 'get-contrast-ratio'
import UniversalImage from './UniversalImage'

interface ScreenBase {
  backgroundColor: string
  title: string
  description: string
  moreLink?: string
  moreText?: string
  moreTitle?: string
}

interface ScreenWithAnimation extends ScreenBase {
  animation: any
}

interface ScreenWithImage extends ScreenBase {
  image: ImageSourcePropType
}

export type ScreenType = ScreenBase | ScreenWithAnimation | ScreenWithImage

export type OnShowInfo = (opts: { title: string; text: string }) => void

// TypeScript woes - doesn't seem to understand this
const Touchable: any =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

const {
  interpolate,
  Extrapolate,
  useCode,
  cond,
  set,
  or,
  not,
  onChange,
  eq,
  neq,
  timing,
  block,
  startClock,
  spring,
  Clock,
  Value,
} = Animated

/**
 * This helper will transition a value *from* zero, but returns a value back to
 * zero without any transition. Based on:
 * https://github.com/wcandillon/react-native-redash/blob/1eb308e254e6ee0061887312f7f1b0669030bd83/src/Transitions.ts#L22-L55
 */
const withTimingTransitionRight = (
  value: Animated.Node<number>,
  timingConfig: TimingConfig = {}
) => {
  const clock = new Clock()
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.linear,
    ...timingConfig,
  }
  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
    ]),
    cond(
      eq(value, 0),
      [set(state.position, value)],
      timing(clock, state, config)
    ),
    state.position,
  ])
}

/**
 * This helper will spring transition a value *from* zero, but returns a value
 * back to zero without any transition. Based on:
 * https://github.com/wcandillon/react-native-redash/blob/1eb308e254e6ee0061887312f7f1b0669030bd83/src/Transitions.ts#L57-L90
 */
export const withSpringTransitionRight = (
  value: Animated.Node<number>,
  springConfig: SpringConfig = {}
) => {
  const clock = new Clock()
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }
  const config = {
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffness: 150,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 1,
    ...springConfig,
  }
  return block([
    startClock(clock),
    set(config.toValue, value),
    cond(
      eq(value, 0),
      [set(state.position, value)],
      spring(clock, state, config)
    ),
    state.position,
  ])
}

/**
 * Returns a boolean animated value which is true:
 *
 * - When the position approaches within 0.05 of index
 * - Until position moved beyond 0.95 of index
 *
 * Used for showing animations when a view comes into focus, and removing the
 * animation after it has moved out of focus.
 *
 * @param {Animated.Value} position Current position
 * @param {number} index Integer current index
 * @param {Object} options Options
 * @param {number} options.maxPosition Set this to the max index value to stop animation on overScroll
 * @param {number} options.buffer The buffer before animations are triggered between 0 - 1
 */
const useShowContent = (
  position: Animated.Node<number>,
  index: number,
  {
    maxPosition = index,
    buffer = 0.1,
  }: { maxPosition?: number; buffer?: number } = {}
) => {
  const [
    show,
    focussed,
    blurred,
    focussing,
    blurring,
    clampedPosition,
  ] = useValues([0, 0, 0, 0, 0, 0], [])

  useCode(
    () =>
      block([
        set(clampedPosition, clamp(position, 0, maxPosition)),
        set(focussed, between(clampedPosition, index - buffer, index + buffer)),
        set(
          blurred,
          not(between(clampedPosition, index - 1 + buffer, index + 1 - buffer))
        ),
        // The screen is blurring when it is moving between focussed state and
        // blurred state and focussing when moving from blurred to focussed
        onChange(
          focussed,
          cond(eq(focussed, 0), set(blurring, 1), set(focussing, 0))
        ),
        onChange(
          blurred,
          cond(eq(blurred, 0), set(focussing, 1), set(blurring, 0))
        ),
        set(show, or(focussed, blurring)),
      ]),
    [buffer]
  )

  return show
}

// /**
//  * Play a Lottie animation whenever Animated.Value `show` is true, and reset the
//  * animation to the start when `show` is false
//  */
// const Animation = ({ show, source, style }) => {
//   const [animationProgress] = useValues([0], [])
//   useCode(
//     () => [
//       // We want "in" animations to happen just after the screen comes into
//       // focus, but we don't want to "out" animation to happen until the screen
//       // is blurred
//       set(
//         animationProgress,
//         withTimingTransitionRight(show, {
//           duration: (source.op / source.fr) * 1000
//         })
//       )
//     ],
//     [show, source]
//   )
//   return (
//     <LottieView source={source} progress={animationProgress} style={style} />
//   )
// }

/**
 * A View that will fade in and transition up when Animated.View `show` becomes
 * true, and move down without transition when it is false
 */
const FadeUpView = ({
  show,
  children,
  style,
  ...otherProps
}: {
  show: Animated.Node<number>
  children: React.ReactNode
  style: any
}) => {
  const [appearProgress, translateY, opacity] = useValues([0, 0, 0], [])

  useCode(
    () =>
      block([
        set(appearProgress, withTimingTransitionRight(show, { duration: 150 })),
        set(
          opacity,
          interpolate(appearProgress, {
            inputRange: [0.5, 1],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          })
        ),
        set(
          translateY,
          interpolate(appearProgress, {
            inputRange: [0, 1],
            outputRange: [75, 0],
          })
        ),
      ]),
    []
  )
  return (
    <Animated.View
      style={[style, { opacity, transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  )
}

const IntroScreen = ({
  position,
  screen,
  screenCount = 1,
  index = 0,
  onShowInfo = () => {},
}: {
  position: Animated.Node<number>
  screen: ScreenType
  screenCount: number
  index: number
  onShowInfo: OnShowInfo
}) => {
  const show = useShowContent(position, index, {
    maxPosition: screenCount,
  })

  const textColor =
    getContrastRatio(screen.backgroundColor, 'white') <= 3 ? 'black' : 'white'

  let asset = null
  if ((screen as ScreenWithAnimation).animation) {
    // asset = (
    //   <Animation show={show} source={screen.animation} style={styles.asset} />
    // )
  } else if ((screen as ScreenWithImage).image) {
    asset = <UniversalImage source={(screen as ScreenWithImage).image} />
  }

  const { moreLink, moreText } = screen

  return (
    <View style={styles.root}>
      <View style={styles.assetContainer}>{asset}</View>
      <FadeUpView show={show} style={styles.textContainer}>
        {screen.title ? (
          <Text style={[styles.title, { color: textColor }]}>
            {screen.title}
          </Text>
        ) : null}
        {screen.description ? (
          <Text
            style={[styles.description, { color: textColor }]}
            textBreakStrategy="balanced"
          >
            {screen.description}
          </Text>
        ) : null}
        {typeof moreLink === 'string' && typeof moreText === 'string' ? (
          <Touchable
            style={styles.button}
            onPress={() => {
              onShowInfo({
                title: screen.moreTitle || moreLink,
                text: moreText,
              })
            }}
          >
            <Text style={styles.buttonText} textBreakStrategy="balanced">
              {screen.moreLink}
            </Text>
          </Touchable>
        ) : (
          <View style={styles.spacer} />
        )}
      </FadeUpView>
    </View>
  )
}

export default React.memo(IntroScreen)

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 18 * 1.2,
  },
  assetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  asset: { width: '100%', height: '100%', flex: 1, backgroundColor: 'yellow' },
  textContainer: {
    paddingHorizontal: 16,
    flex: 0,
  },
  button: {
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    lineHeight: 20,
  },
  spacer: {
    height: 10,
  },
})
