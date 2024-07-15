import React, {FC, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse'
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear'
import {faUser} from '@fortawesome/free-regular-svg-icons'

import {AuthRoutes} from './Stacks/AuthStack'
import {HomeNativeStack} from 'src/screens/Home'
import {ProfileScreen} from 'src/screens/Profile'
import {SettingsScreen} from 'src/screens/Settings'

import {useAuth} from 'src/hooks/useAuth'
import {useAppSelector, useAppDispatch} from 'src/store/hook'
import {selectCurrentUser, setCredentials} from 'src/store/auth'
import {useLazyGetProfileQuery} from 'src/services/auth'
import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'

const Tab = createBottomTabNavigator()

export const Navigation: FC = () => {
  const {isLoggedIn} = useAuth()
  const user = useAppSelector(selectCurrentUser)
  const [getProfile] = useLazyGetProfileQuery()
  const dispatchRtk = useAppDispatch()

  // get profile
  useEffect(() => {
    ;(async () => {
      const {value: accessToken} = await deviceStorage.getItem(storageKeys.access_token)

      if (accessToken && !user?.email) {
        // get profile to store
        const profileResponse = await getProfile().unwrap()
        const profile = profileResponse?.result?.data as any
        dispatchRtk(setCredentials(profile))
      }
    })()
  }, [dispatchRtk, getProfile, user])

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'home'}
        screenOptions={() => ({
          tabBarActiveTintColor: '#1DA1F2',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        {isLoggedIn ? (
          <>
            <Tab.Screen
              name="home"
              component={HomeNativeStack}
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
            component={AuthRoutes}
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
