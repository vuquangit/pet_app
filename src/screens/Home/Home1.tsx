import React, {FC} from 'react'
import {Button, Text, View} from 'react-native'
import {ScreenLayout} from 'src/layouts/ScreenLayout'

interface PropsType {
  navigation: any
}

export const Home1: FC<PropsType> = ({navigation}) => {
  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View className="flex-1 p-2">
        <Button title="Go to Home 2" onPress={() => navigation.navigate('home2')} />
        {Array(100)
          .fill(undefined)
          .map((_, index) => (
            <Text key={index}>Home line {index + 1}</Text>
          ))}
      </View>
    </ScreenLayout>
  )
}
