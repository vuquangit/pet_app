import React, {FC} from 'react'
import {ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps} from 'react-native'

export type ScrollViewProps = {
  children: React.ReactNode
  isScrollView: boolean
} & RNScrollViewProps

export const ScrollView: FC<ScrollViewProps> = ({isScrollView, ...props}) => {
  return isScrollView ? (
    <RNScrollView scrollEventThrottle={props.scrollEventThrottle ?? 500} className="h-full" {...props} />
  ) : (
    props.children
  )
}
