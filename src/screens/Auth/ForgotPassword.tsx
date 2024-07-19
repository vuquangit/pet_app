import React, {FC} from 'react'
import {Text, View, Keyboard} from 'react-native'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse'

import {useForgotPassword} from 'src/hooks/useForgotPassword'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField} from 'src/components/Form'
import {Link} from 'src/components/Link'
import {PATTERN_EMAIL} from 'src/constants/patterns'

type FormValues = {
  email: string
}

export const ForgotPasswordScreen: FC = () => {
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
              <Text className="text-base leading-5 text-green-600">
                Reset password has been sent to: {methods.getValues('email')}
              </Text>
              <Text className="text-base leading-5 text-green-600">
                Please access the URL in the body of the email to compete te password change.
              </Text>
              <Text className="text-base leading-5 text-green-600">
                If you do not receive the email after 30 minutes, please check the email address you
                entered, as it may be incorrect or in your spam folder.
              </Text>
            </View>
          )}

          <Link to={{screen: 'SignIn'}}>
            <View className="flex flex-row items-center gap-1.5">
              <FontAwesomeIcon icon={faHouse} color="#4b5563" size={20} />
              <Text className="text-base font-medium text-blue-600">Return to Sign In</Text>
            </View>
          </Link>
        </View>
      </FormProvider>
    </ScreenLayout>
  )
}
