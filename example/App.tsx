import React from 'react'
import {
  createStackNavigator,
  createAppContainer,
  NavigationScreenProps,
} from 'react-navigation'
import { Alert } from 'react-native'

import { IntroPager, IntroInfo } from '@digidem/wcmc-mapeo-mobile-intro'

import { HeaderTitle } from 'react-navigation-stack'
import { StatusBar } from 'react-native'
import { useNavigationParam } from 'react-navigation-hooks'

const InfoHeaderTitle = () => {
  const title = useNavigationParam('introInfoTitle')
  return <HeaderTitle>{title}</HeaderTitle>
}

const Info = ({ navigation }: NavigationScreenProps) => {
  const text = navigation.getParam('introInfoText')

  return (
    <>
      <StatusBar hidden={false} />
      <IntroInfo markdownText={text} />
    </>
  )
}

Info.navigationOptions = {
  headerTitle: InfoHeaderTitle,
}

const Intro = ({ navigation }: NavigationScreenProps) => {
  const handleShowInfo = React.useCallback(
    ({ title, text }) => {
      navigation.navigate('Info', {
        introInfoTitle: title,
        introInfoText: text,
      })
    },
    [navigation]
  )
  const handlePressComplete = React.useCallback(() => {
    Alert.alert(
      'Navigate to app',
      'In the full app this would now navigate to the main map screen of the app',
      [{ text: 'OK', onPress: () => {} }]
    )
  }, [])
  return (
    <>
      <StatusBar hidden />
      <IntroPager
        onShowInfo={handleShowInfo}
        onPressComplete={handlePressComplete}
      />
    </>
  )
}

Intro.navigationOptions = {
  header: null,
}

const IntroStack = createStackNavigator(
  {
    Intro,
    Info,
  },
  { mode: 'modal' }
)

export default createAppContainer(IntroStack)
