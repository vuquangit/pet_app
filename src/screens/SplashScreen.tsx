import {FC, useEffect} from 'react'
import RNSplashScreen from 'react-native-splash-screen'

export const SplashScreen: FC = (): null => {
  useEffect(() => {
    RNSplashScreen.hide()
  }, [])
  return null
}
