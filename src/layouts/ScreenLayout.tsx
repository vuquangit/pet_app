import React, {FC} from 'react'
import {RefreshControlProps, KeyboardAvoidingView} from 'react-native'
import {SafeAreaView} from './SafeAreaView'
import {ScrollView} from './ScrollView'
import {Edges} from 'react-native-safe-area-context'

type PropsType = {
  children: React.ReactNode
  bgColor?: string
  isSafeAreaView?: boolean
  isScrollView?: boolean
  onRefresh?: React.ReactElement<RefreshControlProps>
  edges?: Edges
}

export const ScreenLayout: FC<PropsType> = ({
  children,
  isSafeAreaView = true,
  isScrollView = true,
  onRefresh,
  edges = ['right', 'top', 'left', 'bottom'],
  // ...props
}) => {
  return (
    <KeyboardAvoidingView>
      <SafeAreaView isSafeAreaView={isSafeAreaView} edges={edges}>
        <ScrollView isScrollView={isScrollView} refreshControl={onRefresh}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
