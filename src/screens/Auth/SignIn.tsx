import React, {FC, useMemo, useState} from 'react'
import {Button, View} from 'react-native'
import Config from 'react-native-config'

import {useSignIn} from 'src/hooks/useSignIn'
import {isEmail, isValidPassword} from 'src/utils'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField} from 'src/components/Form/InputField'

export const SignInScreen: FC = () => {
  const {isLoading, onSubmit, error} = useSignIn()

  const [email, setEmail] = useState<string>(Config?.FAKE_EMAIL || '') // init test
  const [password, setPassword] = useState<string>(Config?.FAKE_PASSWORD || '') // init test

  const isValidInputs = useMemo<boolean>(() => isEmail(email) && isValidPassword(password), [email, password])

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView>
      <View className="flex items-center justify-center w-full h-full p-3">
        <InputField placeholder="Email" value={email} onChangeText={setEmail} errorMessage={error?.email} />

        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          errorMessage={error?.password}
          type="password"
        />

        <Button title="Sign in" disabled={!isValidInputs || isLoading} onPress={() => onSubmit({email, password})} />
      </View>
    </ScreenLayout>
  )
}
