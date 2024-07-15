import React, {FC} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {useAppSelector} from '../../store/hook';
import {selectCurrentUser} from '../../store/auth';
import {ScreenLayout} from '../../layouts/ScreenLayout';

export const ProfileScreen: FC = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Address: {user.address}</Text>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
});
