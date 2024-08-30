import React, { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable'

import { ButtonField } from 'src/components/Form'
import { ScreenLayout } from 'src/layouts/ScreenLayout'

interface PropsType {
  navigation: any
}

const HomeList: FC<PropsType> = ({ navigation }) => {
  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View className="flex-1 p-2">
        <Text className="mb-4 text-3xl font-bold">Games</Text>

        <View className="flex flex-row flex-wrap gap-4">
          <ButtonField
            className="w-[120px] h-[120px] p-1"
            onPress={() => navigation.navigate('dinosaur')}
            title="">
            <View className="flex items-center justify-end w-full h-full">
              <Image
                className="h-[68px] w-[60px] rounded-3xl"
                source={require('../../assets/images/dinosaur/dinosaur.png')}
              />
              <Text className="mt-3 font-bold text-center text-gray-800">Dinosaur</Text>
            </View>
          </ButtonField>

          <ButtonField
            className="w-[120px] h-[120px] p-1"
            onPress={() => navigation.navigate('flappy-bird')}
            title="">
            <View className="flex items-center justify-end w-full h-full">
              <Image
                className="h-[50px] w-[65px]"
                source={require('../../assets/images/flappy-bird/bird.png')}
              />
              <Text className="mt-3 font-bold text-center text-gray-800">Flappy bird</Text>
            </View>
          </ButtonField>

          <ButtonField
            className="w-[120px] h-[120px] p-1"
            onPress={() => navigation.navigate('tableDemo')}
            title="">
            <View className="flex items-center justify-end w-full h-full">
              <View className="flex items-center justify-center flex-1 w-full">
                <FontAwesomeIcon icon={faTable} size={60} color={'#27374D'} />
              </View>
              <Text className="mt-3 font-bold text-center text-gray-800">Table</Text>
            </View>
          </ButtonField>
        </View>
      </View>
    </ScreenLayout>
  )
}

export default HomeList
