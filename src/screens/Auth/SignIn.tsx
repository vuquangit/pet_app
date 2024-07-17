import React, {FC, useState} from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import Config from 'react-native-config'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle'

import {useSignIn} from 'src/hooks/useSignIn'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField, CheckBoxField} from 'src/components/Form'
import {Divider} from 'src/components/Divider'
import {Link} from 'src/components/Link'

type FormValues = {
  email: string
  password: string
}

export const SignInScreen: FC = () => {
  const {isLoading, onSubmit} = useSignIn()
  const [isRemember, setIsRemember] = useState<boolean>(false)

  const {...methods} = useForm({
    defaultValues: {email: Config?.FAKE_EMAIL || '', password: Config?.FAKE_PASSWORD || ''},
  })

  const handleSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('handleSubmit', data)
    onSubmit(data)
  }

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log(errors)
  }

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView={false} edges={['right', 'left']}>
      <FormProvider {...methods}>
        <View className="flex flex-col items-center justify-center w-full h-full px-4 py-2">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-[50px]">Pet Island</Text>

          <View className="w-full mb-8">
            <TouchableOpacity className="flex flex-row items-center justify-center w-full px-5 py-2.5 bg-white rounded-lg">
              <FontAwesomeIcon icon={faGoogle} color="#4b5563" size={20} />
              <Text className="mx-2 text-sm text-gray-800">Sign In With Google</Text>
            </TouchableOpacity>
          </View>

          <Divider classNameWrapper="mb-8">OR</Divider>

          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            classNameWrapper="mb-6"
            error={methods.formState.errors.email?.message}
            rules={{required: 'Email is required'}}
            onSubmitEditing={() => methods.setFocus('password')}
          />

          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            classNameWrapper="mb-2"
            rules={{required: 'Password is required'}}
            error={methods.formState.errors.password?.message}
            onSubmitEditing={methods.handleSubmit(handleSubmit, onError)}
          />

          <View className="flex flex-row items-center justify-between w-full mb-8">
            <CheckBoxField label="Remember me" value={isRemember} onValueChange={setIsRemember} />
            <Link to={{screen: 'ForgotPassword'}}>Forgot Password?</Link>
          </View>

          <ButtonField
            title="Sign in"
            variant="primary"
            className="mb-4"
            disabled={isLoading}
            onPress={methods.handleSubmit(onSubmit, onError)}
          />

          <View className="flex flex-row items-center justify-center">
            <Text className="mr-1 text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
            </Text>
            <Link to={{screen: 'SignUp'}}>Sign up</Link>
          </View>
        </View>
      </FormProvider>
    </ScreenLayout>
  )
}
