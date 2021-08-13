import * as React from 'react'
import { BackHandler, Dimensions, StyleSheet, Platform } from 'react-native'
import { TabView } from 'react-native-tab-view'
import IntroScreen, { OnShowInfo } from './IntroScreen'
import { useValues, interpolateColor } from 'react-native-redash'
import Animated from 'react-native-reanimated'
import IntroDots from './IntroDots'
import screens from './screenDefs'

const initialLayout = Dimensions.get('window')

const noop = () => null

const IntroPager = ({
  onPressComplete = noop,
  onShowInfo = noop,
}: {
  onPressComplete: () => void
  onShowInfo: OnShowInfo
}) => {
  const [index, setIndex] = React.useState(0)

  const routes = React.useMemo(() => {
    return screens.map((_, idx) => ({ key: idx + '', index: idx }))
  }, [])

  const [position] = useValues([0], [])

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setIndex(idx => Math.max(0, idx - 1))
        return true
      }
    )
    return () => subscription.remove()
  }, [])

  const backgroundColor =
    Platform.OS === 'web'
      ? '#ffffff'
      : interpolateColor(position, {
          inputRange: screens.map((_, i) => i),
          outputRange: screens.map(
            screen => screen.backgroundColor || '#ffffff'
          ),
        })

  const renderScene = React.useCallback(
    ({ route }) => (
      <IntroScreen
        key={route.key}
        screen={screens[route.index]}
        index={route.index}
        screenCount={routes.length}
        position={position}
        onShowInfo={onShowInfo}
      />
    ),
    [onShowInfo, position, routes.length]
  )

  const handlePressNext = React.useCallback(() => {
    setIndex(prevIndex => {
      if (prevIndex < routes.length - 1) return prevIndex + 1
      onPressComplete()
      return prevIndex
    })
  }, [onPressComplete, routes.length])

  return (
    // @ts-ignore
    // eslint-disable-next-line react-native/no-inline-styles
    <Animated.View style={{ backgroundColor, flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={noop}
        position={position}
        style={styles.overflowVisible}
        sceneContainerStyle={styles.overflowVisible}
      />
      <IntroDots
        position={position}
        jumpTo={setIndex}
        onPressNext={handlePressNext}
        routes={routes}
      />
    </Animated.View>
  )
}

export default React.memo(IntroPager)

const styles = StyleSheet.create({
  overflowVisible: {
    overflow: 'visible',
  },
})
