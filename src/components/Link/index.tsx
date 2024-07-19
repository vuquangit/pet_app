import React, {FC} from 'react'
import {Text} from 'react-native'
import {Link as RNLink} from '@react-navigation/native'
import classNames from 'classnames'
// import type {To} from '@react-navigation/native/lib/typescript/src/useLinkTo'

interface PropsType extends React.ComponentProps<typeof RNLink> {
  children: React.ReactNode
  to: any // To<ReactNavigation.RootParamList> // TODO: fix this
  contentClassName?: string
}

export const Link: FC<PropsType> = ({children, to, contentClassName, ...restProps}) => {
  return (
    <RNLink to={to} {...restProps}>
      <Text
        className={classNames(
          'font-medium !text-blue-600 hover:underline dark:text-blue-500',
          contentClassName,
        )}>
        {children}
      </Text>
    </RNLink>
  )
}
