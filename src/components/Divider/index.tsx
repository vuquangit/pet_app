import React, {FC} from 'react'
import {Text, View} from 'react-native'
import classNames from 'classnames'

interface PropsType {
  children?: React.ReactNode
  classNameWrapper?: string
}

export const Divider: FC<PropsType> = ({children, classNameWrapper}) => {
  return (
    <View
      className={classNames('flex flex-row items-center justify-center w-full', classNameWrapper)}>
      <View className="flex-1 h-[1px] bg-gray-300" />
      <View>
        <Text className="px-3 text-base font-normal text-center text-gray-600 align-middle">
          {children}
        </Text>
      </View>
      <View className="flex-1 h-[1px] bg-gray-300" />
    </View>
  )
}
