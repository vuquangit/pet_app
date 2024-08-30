import React, { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dinosaur from './Dinosaur'
import HomeList from './HomeList'
import TableDemo from './TableDemo'
import FlappyBird from './FlappyBird'

// Stack
const HomeStack = createNativeStackNavigator()

export const HomeScreen: FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}>
      <HomeStack.Screen
        name="home-list"
        component={HomeList}
        options={{
          title: 'Games',
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="dinosaur"
        component={Dinosaur}
        options={{
          title: 'Dinosaur game',
        }}
      />
      <HomeStack.Screen
        name="flappy-bird"
        component={FlappyBird}
        options={{
          title: 'Flappy Bird',
        }}
      />
      <HomeStack.Screen
        name="tableDemo"
        component={TableDemo}
        options={{
          title: 'Table Demo',
        }}
      />
    </HomeStack.Navigator>
  )
}
