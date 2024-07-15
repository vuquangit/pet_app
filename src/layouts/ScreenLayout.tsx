import React, {FC} from 'react'
import {RefreshControlProps} from 'react-native'
import {SafeAreaView} from './SafeAreaView'
import {ScrollView} from './ScrollView'

type PropsType = {
  children: React.ReactNode
  bgColor?: string
  isSafeAreaView?: boolean
  isScrollView?: boolean
  onRefresh?: React.ReactElement<RefreshControlProps>
}

export const ScreenLayout: FC<PropsType> = ({
  children,
  isSafeAreaView = true,
  isScrollView = true,
  onRefresh,
  // ...props
}) => {
  return (
    <SafeAreaView isSafeAreaView={isSafeAreaView}>
      <ScrollView isScrollView={isScrollView} refreshControl={onRefresh} className="">
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
