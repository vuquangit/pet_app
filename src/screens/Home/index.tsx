import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Dinosaur from './Dinosaur'
import HomeList from './HomeList'

// Stack
const HomeStack = createNativeStackNavigator()

export const HomeScreen: FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="home-list" component={HomeList} />
      <HomeStack.Screen name="dinosaur" component={Dinosaur} />
    </HomeStack.Navigator>
  )
}
