import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faGear} from '@fortawesome/free-solid-svg-icons/faGear';
import {faUser} from '@fortawesome/free-regular-svg-icons';

import {AuthStack} from './Stacks/AuthStack';
// import {MainStack} from './Stacks/MainStack';
import {useAuth} from '../../hooks/useAuth';

import {useAppSelector, useAppDispatch} from '../../store/hook';
import {selectCurrentUser, setCredentials} from '../../store/auth';
import {useLazyGetProfileQuery} from '../../services/auth';
import {deviceStorage} from '../../store/storage';
import storageKeys from '../../constants/storage-keys';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeNativeStack} from '../../screens/Home';
import {ProfileScreen} from '../../screens/Profile';
import {SettingsScreen} from '../../screens/Settings';

const Tab = createBottomTabNavigator();

export const Navigation: FC = () => {
  const {isLoggedIn} = useAuth();
  const user = useAppSelector(selectCurrentUser);
  const [getProfile] = useLazyGetProfileQuery();
  const dispatchRtk = useAppDispatch();

  // get profile
  useEffect(() => {
    (async () => {
      const {value: accessToken} = await deviceStorage.getItem(
        storageKeys.access_token,
      );

      if (accessToken && !user?.email) {
        // get profile to store
        const profileResponse = await getProfile().unwrap();
        const profile = profileResponse?.result?.data as any;
        dispatchRtk(setCredentials(profile));
      }
    })();
  }, [dispatchRtk, getProfile, user]);

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
              component={HomeNativeStack}
              options={{
                tabBarLabel: 'Home',
                tabBarAccessibilityLabel: 'Home',
                tabBarIcon: ({color}) => (
                  <FontAwesomeIcon icon={faHouse} color={color} size={20} />
                ),
              }}
            />
            <Tab.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarAccessibilityLabel: 'Profile',
                tabBarIcon: ({color}) => (
                  <FontAwesomeIcon icon={faUser} color={color} size={20} />
                ),
              }}
            />
            <Tab.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: 'Settings',
                tabBarAccessibilityLabel: 'Settings',
                tabBarIcon: ({color}) => (
                  <FontAwesomeIcon icon={faGear} color={color} size={20} />
                ),
              }}
            />
          </>
        ) : (
          <Tab.Screen
            name={'AuthStack'}
            component={AuthStack}
            key={'AuthStack'}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
