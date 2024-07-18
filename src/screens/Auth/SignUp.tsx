import React, {FC} from 'react'
import {Text, View} from 'react-native'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'

import {useSignUp} from 'src/hooks/useSignUp'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField} from 'src/components/Form'
import {Link} from 'src/components/Link'
import {PATTERN_EMAIL} from 'src/constants/patterns'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
  name: string
}

export const SignUpScreen: FC = () => {
  const {isLoading, onSubmit} = useSignUp()

  const {...methods} = useForm({
    defaultValues: {email: '', name: '', password: '', confirmPassword: ''},
  })

  const handleSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('handleSubmit', data)
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

          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="Your email"
            classNameWrapper="mb-6"
            autoCapitalize="none"
            error={methods.formState.errors.email?.message}
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
            onPress={methods.handleSubmit(onSubmit, onError)}
          />

          <View className="flex flex-row items-center justify-center">
            <Text className="mr-1 text-sm font-light text-gray-500 dark:text-gray-400">
              Do you already have an account?
            </Text>
            <Link to={{screen: 'SignIn'}}>Sign in</Link>
          </View>
        </View>
      </FormProvider>
    </ScreenLayout>
  )
}
