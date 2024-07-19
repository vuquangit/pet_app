import React, {FC, useEffect, useState} from 'react'
import {Text, View, Keyboard} from 'react-native'
import Config from 'react-native-config'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle'
import {useRoute} from '@react-navigation/native'
import {get} from 'lodash'

import {useSignIn} from 'src/hooks/useSignIn'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField, CheckBoxField} from 'src/components/Form'
import {Divider} from 'src/components/Divider'
import {Link} from 'src/components/Link'
import {PATTERN_EMAIL} from 'src/constants/patterns'
import ERROR_MESSAGE from 'src/constants/error-message'

type FormValues = {
  email: string
  password: string
}

export const SignInScreen: FC = () => {
  const {isLoading, error, onSubmit} = useSignIn()
  const [isRemember, setIsRemember] = useState<boolean>(true)
  const route = useRoute()

  const {...methods} = useForm({
    defaultValues: {
      email: Config?.FAKE_EMAIL || '',
      password: Config?.FAKE_PASSWORD || '',
    },
  })

  const handleSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('handleSubmit', data)
    Keyboard.dismiss()
    onSubmit(data, isRemember)
  }

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log(errors)
  }

  const getFieldError = (field: keyof FormValues, errorCodeList: string[]): string => {
    const errorCode: string = get(error, 'data.error.code', '')
    const errorMessage: string =
      methods.formState.errors?.[field]?.message || errorCodeList.includes(errorCode)
        ? get(ERROR_MESSAGE, errorCode)
        : ''

    return errorMessage
  }

  useEffect(() => {
    const email = get(route, 'params.email', '')
    const password = get(route, 'params.password', '')

    if (email) {
      methods.setValue('email', email)
      methods.setValue('password', password)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params])

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView={false} edges={['right', 'left']}>
      <FormProvider {...methods}>
        <View className="flex flex-col items-center justify-center w-full h-full px-4 py-2">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-[50px] -mt-[100px]">
            Pet Island
          </Text>

          <ButtonField title="" variant="secondary" className="w-full mb-8">
            <View className="flex flex-row items-center justify-center">
              <FontAwesomeIcon icon={faGoogle} color="#4b5563" size={20} />
              <Text className="mx-2 text-sm text-green-600">Sign In With Google</Text>
            </View>
          </ButtonField>

          <Divider classNameWrapper="mb-8">OR</Divider>

          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
            classNameWrapper="mb-6"
            error={getFieldError('email', ['USER.EMAIL_NOT_FOUND'])}
            rules={{
              required: 'Email is required',
              pattern: {
                value: PATTERN_EMAIL,
                message: 'Invalid email address',
              },
            }}
            onSubmitEditing={() => methods.setFocus('password')}
          />

          <InputField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            classNameWrapper="mb-2"
            rules={{required: 'Password is required'}}
            error={getFieldError('password', ['USER.WRONG_PASSWORD'])}
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
            onPress={methods.handleSubmit(handleSubmit, onError)}
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
