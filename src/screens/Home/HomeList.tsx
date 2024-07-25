import React, {FC} from 'react'
import {Image, Text, View} from 'react-native'
import {ButtonField} from 'src/components/Form'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import TopScores from './Dinosaur/TopScores'

interface PropsType {
  navigation: any
}

const HomeList: FC<PropsType> = ({navigation}) => {
  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View className="flex-1 p-2">
        <Text className="mb-4 text-3xl font-bold">Games</Text>

        <ButtonField
          className="w-[120px] p-0"
          onPress={() => navigation.navigate('dinosaur')}
          title={''}>
          <View>
            <Image
              className="h-[100px] w-[100px] rounded-3xl"
              source={require('../../assets/images/dinosaur/dinosaur.png')}
            />
            <Text className="mt-3 font-bold text-center text-gray-800">Dinosaur</Text>
          </View>
        </ButtonField>

        <View>
          <TopScores />
        </View>
      </View>
    </ScreenLayout>
  )
}

export default HomeList
