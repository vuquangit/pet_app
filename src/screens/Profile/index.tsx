import React, {FC} from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'

import {useAppSelector} from 'src/store/hook'
import {selectCurrentUser} from 'src/store/auth'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import ROLE from 'src/constants/role'

export const ProfileScreen: FC = () => {
  const user = useAppSelector(selectCurrentUser)

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Name: {user.name}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>Role: {ROLE[user.role]}</Text>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
})
