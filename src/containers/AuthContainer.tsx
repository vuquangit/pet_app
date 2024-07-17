import React, {FC} from 'react'

import {useAppSelector} from 'src/store/hook'
import Spinner from 'src/components/Spinner'

type PropsType = {
  children: React.ReactNode
}

export const AuthContainer: FC<PropsType> = ({children}) => {
  const isLaunching = useAppSelector(state => state.launching.isLaunching)

  return (
    <>
      <Spinner
        visible={isLaunching}
        textContent={'Loading...'}
        textStyle="text-white text-[24px]"
      />
      {children}
    </>
  )
}
