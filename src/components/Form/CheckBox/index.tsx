import React, {FC} from 'react'
import {Pressable, Text} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faSquare} from '@fortawesome/free-regular-svg-icons/faSquare'
import {faSquareCheck} from '@fortawesome/free-regular-svg-icons/faSquareCheck'

interface Props {
  value: boolean
  label: string
  onValueChange: any
}

export const CheckBoxField: FC<Props> = ({value, label, onValueChange}) => {
  return (
    <Pressable
      onPress={() => onValueChange(!value)}
      className="flex flex-row items-center justify-center gap-1">
      <FontAwesomeIcon icon={value ? faSquareCheck : faSquare} color="#4b5563" size={20} />
      <Text className="text-base">{label}</Text>
    </Pressable>
  )
}
