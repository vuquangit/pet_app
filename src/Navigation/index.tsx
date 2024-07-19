import React, {FC, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse'
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear'
import {faUser} from '@fortawesome/free-regular-svg-icons'

import {AuthStack} from './Stacks/AuthStack'
import {HomeScreen} from 'src/screens/Home'
import {ProfileScreen} from 'src/screens/Profile'
import {SettingsScreen} from 'src/screens/Settings'

import {useAuth} from 'src/hooks/useAuth'
import useProfile from 'src/hooks/useProfile'
import {useAppSelector} from 'src/store/hook'
import {deviceStorage} from 'src/store/storage'
import {selectCurrentUser} from 'src/store/auth'
import storageKeys from 'src/constants/storage-keys'

const Tab = createBottomTabNavigator()

export const Navigation: FC = () => {
  const {isLoggedIn} = useAuth()
  const user = useAppSelector(selectCurrentUser)
  const tokens = useAppSelector(state => state.tokens)
  const {fetchProfile} = useProfile()

  // get profile
  useEffect(() => {
    ;(async () => {
      const {value: accessToken} = await deviceStorage.getItem(storageKeys.access_token)

      if ((accessToken || tokens.accessToken) && !user?.email) {
        await fetchProfile()
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'AuthStack'}
        screenOptions={() => ({
          tabBarActiveTintColor: '#1DA1F2',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        {isLoggedIn ? (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarAccessibilityLabel: 'Home',
                tabBarIcon: ({color}) => <FontAwesomeIcon icon={faHouse} color={color} size={20} />,
              }}
            />
            <Tab.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarAccessibilityLabel: 'Profile',
                tabBarIcon: ({color}) => <FontAwesomeIcon icon={faUser} color={color} size={20} />,
              }}
            />
            <Tab.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: 'Settings',
                tabBarAccessibilityLabel: 'Settings',
                tabBarIcon: ({color}) => <FontAwesomeIcon icon={faGear} color={color} size={20} />,
              }}
            />
          </>
        ) : (
          <Tab.Screen
            name={'AuthStack'}
            component={AuthStack}
            key={'AuthStack'}
            options={{
              title: '',
              tabBarLabel: 'Auth',
              tabBarAccessibilityLabel: '',
              tabBarStyle: {display: 'none'},
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  )
}
