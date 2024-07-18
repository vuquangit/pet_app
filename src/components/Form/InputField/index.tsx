import {TextInput, View, Text, TextInputProps, TouchableOpacity} from 'react-native'
import React, {FC, useState} from 'react'
import classNames from 'classnames'
import {useController, UseControllerProps} from 'react-hook-form'
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

export interface BaseInputProps extends Omit<TextInputProps, 'defaultValue'>, UseControllerProps {
  name: string
  label?: string
  leftSideContent?: React.ReactNode
  defaultValue?: string
  rightSideContent?: React.ReactNode
  error?: string
  type?: string
  classNameWrapper?: string
}

export const InputField: FC<BaseInputProps> = ({
  leftSideContent,
  rightSideContent,
  error,
  label,
  classNameWrapper,
  placeholder,
  ...props
}) => {
  const {name, rules, defaultValue} = props
  const {field} = useController({name, rules, defaultValue})
  const [focused, setFocused] = useState<boolean>(false)
  const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(props.type === 'password')

  const handlePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure)
  }

  const wrapStyles = classNames('flex-row border rounded-lg bg-white', {
    'border-green-600': focused && !error,
    'border-red-600': !!error,
    'border-gray-300': !focused && !error,
  })
  const labelStylesWrapper = classNames(
    'absolute z-10 px-1 bg-white top-1/4 left-3 transition-transform -translate-y-1/2',
    {
      'top-0 -translate-y-3': focused || field.value,
    },
  )
  const labelStyles = classNames('text-base', {
    'text-green-600 text-sm': focused && !error,
    'text-red-600 text-sm': !!error,
    'text-gray-500': !focused && !error,
    'text-gray-800 text-sm': !focused && !error && field.value,
  })
  const placeholderColor = '#aaaaaa'

  const handleFocus = () => {
    setFocused(true)
  }
  const handleBlur = () => {
    setFocused(false)
    field.onBlur()
  }

  const rightSideContentEye = (
    <TouchableOpacity className="absolute top-1/5 right-2" onPress={handlePasswordVisibility}>
      <FontAwesomeIcon icon={isPasswordSecure ? faEye : faEyeSlash} size={20} color="#aaaaaa" />
    </TouchableOpacity>
  )

  return (
    <View className={classNames('w-full relative', classNameWrapper)}>
      {focused && (
        <View className={labelStylesWrapper}>
          <Text className={labelStyles}>{label}</Text>
        </View>
      )}

      <View className={wrapStyles}>
        {leftSideContent ? <View className="pr-2.5 justify-center">{leftSideContent}</View> : null}

        <TextInput
          onChangeText={field.onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={field.value}
          className="flex-1 px-3 pt-2 pb-4 text-base text-gray-900"
          placeholder={focused ? placeholder : label}
          placeholderTextColor={placeholderColor}
          secureTextEntry={isPasswordSecure}
          {...props}
        />
        {rightSideContent ? <View className="justify-center pl-2">{rightSideContent}</View> : null}
        {props.type === 'password' && rightSideContentEye ? (
          <View className="justify-center pl-2">{rightSideContentEye}</View>
        ) : null}
      </View>

      {error ? <Text className="pt-1 text-base font-light text-red-600">{error}</Text> : null}
    </View>
  )
}
