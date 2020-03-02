import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import Markdown from './Markdown'

const InfoScreen = ({ markdownText }: { markdownText: string }) => {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.inner}
      bounces
    >
      {Markdown(markdownText)}
    </ScrollView>
  )
}

export default InfoScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inner: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
})
