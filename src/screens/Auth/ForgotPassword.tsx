import React, {FC} from 'react'
import {Text, View, Keyboard} from 'react-native'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'

import {useForgotPassword} from 'src/hooks/useForgotPassword'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField} from 'src/components/Form'
import {PATTERN_EMAIL} from 'src/constants/patterns'

type FormValues = {
  email: string
}

type ForgotPasswordTypes = {
  navigation: any
}

export const ForgotPasswordScreen: FC<ForgotPasswordTypes> = ({navigation: {navigate}}) => {
  const {isLoading, isSuccess, onSubmit} = useForgotPassword()

  const {...methods} = useForm({
    defaultValues: {email: ''},
  })

  const handleSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    Keyboard.dismiss()
    onSubmit(data.email)
  }

  const onError: SubmitErrorHandler<FormValues> = errors => {
    return console.log(errors)
  }

  return (
    <ScreenLayout isSafeAreaView={true} isScrollView={false} edges={['right', 'left']}>
      <FormProvider {...methods}>
        <View className="flex flex-col items-center justify-start w-full h-full px-4 py-2">
          <Text className="text-3xl font-bold text-center text-gray-800 my-[50px]">Pet Island</Text>

          {!isSuccess ? (
            <>
              <Text className="leading-5">Please enter your registered email address.</Text>
              <Text className="mb-6 leading-5">
                We will send you a URL link to reset your password
              </Text>

              <InputField
                name="email"
                type="email"
                label="Email address"
                placeholder="Enter your email address"
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
                onSubmitEditing={methods.handleSubmit(handleSubmit, onError)}
              />

              <ButtonField
                title="Reset email sent to you"
                variant="primary"
                className="mb-4"
                disabled={isLoading || !methods.watch('email')}
                onPress={methods.handleSubmit(handleSubmit, onError)}
              />
            </>
          ) : (
            <View className="py-4">
              <Text className="text-base leading-6 text-gray-800">
                Reset password has been sent to:{' '}
                <Text className="font-bold">{methods.getValues('email')}</Text>
              </Text>
              <Text className="text-base leading-6 text-gray-800">
                Please access the URL in the body of the email to compete te password change.
              </Text>
              <Text className="text-base leading-6 text-gray-800">
                If you do not receive the email after 30 minutes, please check the email address you
                entered, as it may be incorrect or in your spam folder.
              </Text>
            </View>
          )}

          <ButtonField
            title="Sign In"
            variant="primary"
            className="mb-4"
            onPress={() => {
              navigate('SignIn')
            }}
          />
        </View>
      </FormProvider>
    </ScreenLayout>
  )
}
