import React, {FC} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSliders} from '@fortawesome/free-solid-svg-icons/faSliders';
import {faWrench} from '@fortawesome/free-solid-svg-icons/faWrench';

import {Setting} from './Setting';
import {Setting1} from './Setting1';

const Settings = createMaterialTopTabNavigator();

export const SettingsScreen: FC = () => {
  return (
    <Settings.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color}) => {
          let iconName = faSliders;

          if (route.name === 'setting') {
            iconName = faSliders;
          } else {
            iconName = faWrench;
          }

          return <FontAwesomeIcon icon={iconName} size={16} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Settings.Screen name="setting" component={Setting} />
      <Settings.Screen name="setting1" component={Setting1} />
    </Settings.Navigator>
  );
};
