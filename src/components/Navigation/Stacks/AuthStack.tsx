import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {SignInScreen} from 'src/screens/Auth/SignIn'

const Auth = createNativeStackNavigator()

export const AuthStack: FC = () => {
  return (
    <Auth.Navigator initialRouteName="SignIn">
      <Auth.Screen
        name="SignIn"
        component={SignInScreen}
        key={'SignIn'}
        options={{
          title: 'Sign in',
          // When logging out, a pop animation feels intuitive
          // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
        }}
      />
    </Auth.Navigator>
  )
}
