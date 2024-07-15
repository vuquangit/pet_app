import React from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'
import {ScreenLayout} from 'src/layouts/ScreenLayout'

export const Setting1 = () => {
  return (
    <ScreenLayout isSafeAreaView={false} isScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Setting 1</Text>

        {Array(100)
          .fill(undefined)
          .map((_, index) => (
            <Text key={index}>Setting line {index + 1}</Text>
          ))}
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
})
