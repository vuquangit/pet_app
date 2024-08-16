import 'react-native-gesture-handler'
import React, { FC, useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import RNSplashScreen from 'react-native-splash-screen'

import { store } from 'src/store'
import { Navigation } from 'src/Navigation'
import { VersionCheckContainer } from 'src/containers/VersionCheckContainer'
import { SpinnerContainer } from 'src/containers/SpinnerContainer'
import { enableDebugging } from 'src/helper/debugger'

const App: FC = () => {
  useEffect(() => {
    RNSplashScreen.hide()
    enableDebugging()
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <SpinnerContainer>
          <VersionCheckContainer>
            <Navigation />
          </VersionCheckContainer>
        </SpinnerContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

let AppEntryPoint = App

console.log('STORYBOOK_ENABLED::', process.env.STORYBOOK_ENABLED)
if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default
}

export default AppEntryPoint
