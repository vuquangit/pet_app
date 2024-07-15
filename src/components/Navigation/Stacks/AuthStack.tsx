import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createStackNavigator} from '@react-navigation/stack';

import {SignInScreen} from '../../../screens/Auth/SignIn';

const Stack = createNativeStackNavigator();

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        key={'SignIn'}
        options={{
          title: 'Sign in',
          // When logging out, a pop animation feels intuitive
          // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
        }}
      />
      {/* <Stack.Screen name={'Signup'} component={Signup} key={'Signup'} /> */}
    </Stack.Navigator>
  );
};
