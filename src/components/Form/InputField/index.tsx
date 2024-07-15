import React, {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {View, TextInput, Text, TouchableOpacity} from 'react-native'
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye'
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons/faEyeSlash'

interface Props {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  style?: any
  errorMessage?: string
  type?: string
}

export const InputField: React.FC<Props> = props => {
  const [isPasswordSecure, setIsPasswordSecure] = useState<boolean>(true)

  const handlePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure)
  }

  return (
    <View className="w-full">
      <View>
        <TextInput
          className="w-full h-10 px-4 py-2 bg-white border border-gray-300 rounded-md"
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeText}
        />
        {props.type === 'password' && (
          <TouchableOpacity className="absolute top-[25%] right-3" onPress={handlePasswordVisibility}>
            <FontAwesomeIcon icon={isPasswordSecure ? faEye : faEyeSlash} size={20} color="#aaaaaa" />
          </TouchableOpacity>
        )}
      </View>
      <Text>{props.errorMessage ?? ''}</Text>
    </View>
  )
}
