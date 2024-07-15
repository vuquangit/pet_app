import React from 'react'
import {Button, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {useSignOut} from 'src/hooks/useSignOut'
import {ScreenLayout} from 'src/layouts/ScreenLayout'

export const Setting = () => {
  const navigation = useNavigation()
  const {isLoading, isSuccess, signOut} = useSignOut()

  const handleSigOut = async () => {
    try {
      await signOut()
      navigation.navigate('AuthStack', {screen: 'SignIn'})
    } catch {}
  }

  return (
    <ScreenLayout isSafeAreaView={false} isScrollView>
      <View>
        {/* <Button title="Go to Setting 1" onPress={() => navigation.navigate('setting1')} /> */}
        <Button title="Logout" onPress={handleSigOut} disabled={isLoading || isSuccess} />
      </View>
    </ScreenLayout>
  )
}
