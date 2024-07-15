import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {SignInScreen} from 'src/screens/Auth/SignIn'

const AuthStack = createNativeStackNavigator()

export const AuthRoutes: FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        key={'SignIn'}
        options={{
          title: 'Sign in',
          // When logging out, a pop animation feels intuitive
          // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
        }}
      />
    </AuthStack.Navigator>
  )
}
