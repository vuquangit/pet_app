import React, {FC} from 'react'
import {SplashScreen} from 'src/screens/SplashScreen'
import {useAppSelector} from 'src/store/hook'

type PropsType = {
  children: React.ReactNode
}

export const AuthContainer: FC<PropsType> = ({children}) => {
  const isLaunching = useAppSelector(state => state.launching.isLaunching)
  return isLaunching ? <SplashScreen /> : children
}
