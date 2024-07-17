import React, {FC} from 'react'
import {Text} from 'react-native'
import {Link as RNLink} from '@react-navigation/native'
// import type {To} from '@react-navigation/native/lib/typescript/src/useLinkTo'

interface PropsType extends React.ComponentProps<typeof RNLink> {
  children: React.ReactNode
  to: any // To<ReactNavigation.RootParamList> // TODO: fix this
}

export const Link: FC<PropsType> = ({children, to, ...restProps}) => {
  return (
    <RNLink to={to} {...restProps}>
      <Text className="font-medium !text-blue-600 hover:underline dark:text-blue-500">
        {children}
      </Text>
    </RNLink>
  )
}
