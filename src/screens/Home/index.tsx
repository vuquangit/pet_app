import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Home1} from './Home1'
import {Home2} from './Home2'
import {Home3} from './Home3'

// Stack
const HomeStack = createNativeStackNavigator()

export const HomeScreen: FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="home1" component={Home1} />
      <HomeStack.Screen name="home2" component={Home2} />
      <HomeStack.Screen
        name="home3"
        component={Home3}
        options={{
          presentation: 'modal',
          headerTitle: 'Tweet Details',
          headerShown: true,
        }}
      />
    </HomeStack.Navigator>
  )
}
