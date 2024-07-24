import React, {FC} from 'react'
import {Text, View, Keyboard} from 'react-native'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {get} from 'lodash'

import {useSignUp} from 'src/hooks/useSignUp'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField} from 'src/components/Form'
import {Link} from 'src/components/Link'
import {PATTERN_EMAIL} from 'src/constants/patterns'
import ERROR_MESSAGE from 'src/constants/error-message'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

type SignUpTypes = {
  navigation: any
}

export const SignUpScreen: FC<SignUpTypes> = ({navigation: {navigate}}) => {
  const {isLoading, isSuccess, error, onSubmit} = useSignUp()
  const {...methods} = useForm({
    defaultValues: {email: '', name: '', password: '', confirmPassword: ''},
  })

  const handleSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    Keyboard.dismiss()
    onSubmit(data)
  }

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log(errors)
  }

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView={true} edges={['right', 'left']}>
      <FormProvider {...methods}>
        <View className="flex flex-col items-center justify-start w-full h-full px-4 py-2">
          <Text className="text-3xl font-bold text-center text-gray-800 mb-[50px] mt-[50px]">
            Pet Island
          </Text>

          {!isSuccess ? (
            <>
              <InputField
                name="email"
                type="email"
                label="Email"
                placeholder="Your email"
                classNameWrapper="mb-6"
                autoCapitalize="none"
                error={
                  methods.formState.errors.email?.message ||
                  get(ERROR_MESSAGE, get(error, 'data.error.code', ''))
                }
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: PATTERN_EMAIL,
                    message: 'Invalid email address',
                  },
                }}
                onSubmitEditing={() => methods.setFocus('name')}
              />

              <InputField
                name="name"
                type="name"
                label="Name"
                placeholder="Your name"
                classNameWrapper="mb-6"
                error={methods.formState.errors.password?.message}
                onSubmitEditing={() => methods.setFocus('name')}
              />

              <InputField
                name="password"
                type="password"
                label="Password"
                placeholder="Password"
                classNameWrapper="mb-8"
                rules={{required: 'Password is required'}}
                error={methods.formState.errors.password?.message}
                onSubmitEditing={() => methods.setFocus('confirmPassword')}
              />

              <InputField
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Confirm password"
                classNameWrapper="mb-8"
                rules={{
                  required: 'Confirm password is required',
                  validate: (val: string) => {
                    if (methods.watch('password') !== val) {
                      return 'Your passwords do no match'
                    }
                  },
                }}
                error={methods.formState.errors.confirmPassword?.message}
                onSubmitEditing={methods.handleSubmit(handleSubmit, onError)}
              />

              <ButtonField
                title="Sign up"
                variant="primary"
                className="mb-4"
                disabled={isLoading}
                onPress={methods.handleSubmit(handleSubmit, onError)}
              />

              <View className="flex flex-row items-center justify-center">
                <Text className="mr-1 text-sm font-light text-gray-500 dark:text-gray-400">
                  Do you already have an account?
                </Text>
                <Link to={{screen: 'SignIn'}}>Sign in</Link>
              </View>
            </>
          ) : (
            <View className="flex justify-center py-4">
              <Text className="mb-4 text-base leading-5 text-center text-green-600">
                Sign up is successfully, please sign in.
              </Text>
              <ButtonField
                title="Sign In"
                variant="primary"
                className="mb-4"
                onPress={() => {
                  navigate('SignIn', {
                    email: methods.getValues('email'),
                    password: methods.getValues('password'),
                  })
                }}
              />
            </View>
          )}
        </View>
      </FormProvider>
    </ScreenLayout>
  )
}
