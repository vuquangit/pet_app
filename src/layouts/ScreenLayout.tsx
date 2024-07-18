import React, {FC} from 'react'
import {
  RefreshControlProps,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {SafeAreaView} from './SafeAreaView'
import {ScrollView} from './ScrollView'
import {Edges} from 'react-native-safe-area-context'

type PropsType = {
  children: React.ReactNode
  bgColor?: string
  isSafeAreaView?: boolean
  isScrollView?: boolean
  isWithKeyboardAvoidingView?: boolean
  onRefresh?: React.ReactElement<RefreshControlProps>
  edges?: Edges
}

export const ScreenLayout: FC<PropsType> = ({
  children,
  isSafeAreaView = true,
  isScrollView = true,
  isWithKeyboardAvoidingView = true,
  onRefresh,
  edges = ['right', 'top', 'left', 'bottom'],
}) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView isSafeAreaView={isSafeAreaView} edges={edges}>
        <ScrollView isScrollView={isScrollView} refreshControl={onRefresh}>
          {isWithKeyboardAvoidingView ? (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              {children}
            </TouchableWithoutFeedback>
          ) : (
            children
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
