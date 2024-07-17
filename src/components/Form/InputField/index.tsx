import {
  TextInput,
  View,
  Text,
  TextInputProps,
  LayoutChangeEvent,
  TouchableOpacity,
} from 'react-native'
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
  ...props
}) => {
  const {name, rules, defaultValue} = props
  const {field} = useController({name, rules, defaultValue})

  const [focused, setFocused] = useState<boolean>(!!field.value)
  const [inputHeight, setInputHeight] = useState<number>(0)
  const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(props.type === 'password')

  const handlePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure)
  }

  const wrapStyles = classNames('flex-row border rounded-xl p-2.5 bg-white', {
    'border-green-600': focused && !error,
    'border-red-600': !!error,
    'border-gray-300': !focused && !error,
  })
  const labelStyles = classNames('text-sm', {
    'text-green-600': focused && !error,
    'text-red-600': !!error,
    'text-gray-300': !focused && !error,
  })
  const placeholderColor = classNames('gray-400')

  const handleFocus = () => {
    setFocused(true)
  }
  const handleBlur = () => {
    setFocused(false)
    field.onBlur()
  }

  const measureInput = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height
    if (inputHeight !== height) {
      setInputHeight(e.nativeEvent.layout.height)
    }
  }

  const translateValue = inputHeight / 2

  const rightSideContentEye = (
    <TouchableOpacity className="absolute top-1/5 right-1" onPress={handlePasswordVisibility}>
      <FontAwesomeIcon icon={isPasswordSecure ? faEye : faEyeSlash} size={20} color="#aaaaaa" />
    </TouchableOpacity>
  )

  return (
    <View className={classNames('w-full relative', classNameWrapper)}>
      {focused ? (
        <View
          className="absolute z-10 pl-1 pr-1 mt-1 ml-3 bg-white"
          style={[{transform: [{translateY: -translateValue}]}]}>
          <Text className={labelStyles}>{label}</Text>
        </View>
      ) : null}

      <View className={wrapStyles}>
        {leftSideContent ? <View className="pr-2.5 justify-center">{leftSideContent}</View> : null}

        <TextInput
          {...props}
          onLayout={measureInput}
          onChangeText={field.onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={field.value}
          className="flex-1 pb-2 pr-1 text-base text-gray-900"
          placeholderTextColor={placeholderColor}
          secureTextEntry={isPasswordSecure}
        />
        {rightSideContent ? <View className="justify-center pl-2">{rightSideContent}</View> : null}
        {props.type === 'password' && rightSideContentEye ? (
          <View className="justify-center pl-2">{rightSideContentEye}</View>
        ) : null}
      </View>

      {error ? (
        <Text className="self-center pt-2 text-base font-light text-red-600">{error}</Text>
      ) : null}
    </View>
  )
}
