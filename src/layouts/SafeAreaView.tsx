import React, {FC, useEffect, useState} from 'react'
import {Edges, SafeAreaView as RNSafeAreaView} from 'react-native-safe-area-context'
import {useAuth} from 'src/hooks'

type PropsType = {
  children: React.ReactNode
  isSafeAreaView?: boolean
  edges?: Edges
}

export const SafeAreaView: FC<PropsType> = ({children, isSafeAreaView = true}) => {
  const {isLoggedIn} = useAuth()
  const [edges, setEdges] = useState<Edges | undefined>(['right', 'top', 'left', 'bottom'])

  useEffect(() => {
    if (isLoggedIn) {
      setEdges(['top', 'right', 'left'])
    }
  }, [isLoggedIn])

  return isSafeAreaView ? <RNSafeAreaView edges={edges}>{children}</RNSafeAreaView> : children
}
