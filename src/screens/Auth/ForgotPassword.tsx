import React, {FC} from 'react'
import {Text, View} from 'react-native'
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'

import {useForgotPassword} from 'src/hooks/useForgotPassword'
import {ScreenLayout} from 'src/layouts/ScreenLayout'
import {InputField, ButtonField} from 'src/components/Form'
import {Link} from 'src/components/Link'
import {PATTERN_EMAIL} from 'src/constants/patterns'

type FormValues = {
  email: string
}

export const ForgotPasswordScreen: FC = () => {
  const {isLoading, onSubmit} = useForgotPassword()

  const {...methods} = useForm({
    defaultValues: {email: ''},
  })

  const handleSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('handleSubmit', data)
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

          <InputField
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
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
            title="Submit"
            variant="primary"
            className="mb-4"
            disabled={isLoading}
            onPress={methods.handleSubmit(onSubmit, onError)}
          />

          <View className="flex flex-row items-center justify-center">
            <Link to={{screen: 'SignIn'}}>Back to Sign in</Link>
          </View>
        </View>
      </FormProvider>
    </ScreenLayout>
  )
}
