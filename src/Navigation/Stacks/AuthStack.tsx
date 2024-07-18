import React, {FC} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {SignInScreen} from 'src/screens/Auth/SignIn'
import {SignUpScreen} from 'src/screens/Auth/SignUp'
import {ForgotPasswordScreen} from 'src/screens/Auth/ForgotPassword'

import {useAuth} from 'src/hooks/useAuth'

const Auth = createNativeStackNavigator()

export const AuthStack: FC = () => {
  const {isLoggedIn} = useAuth()

  return (
    <Auth.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}>
      <Auth.Screen
        name="SignIn"
        component={SignInScreen}
        key={'SignIn'}
        options={{
          title: 'Sign in',
          // When logging out, a pop animation feels intuitive
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Auth.Screen name="SignUp" component={SignUpScreen} key={'SignUp'} />
      <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} key={'ForgotPassword'} />
    </Auth.Navigator>
  )
}
