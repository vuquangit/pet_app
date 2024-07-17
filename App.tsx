import 'react-native-gesture-handler'
import React, {FC, useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Provider} from 'react-redux'
import {StatusBar} from 'react-native'
import RNSplashScreen from 'react-native-splash-screen'

import {setupStore} from 'src/store'
import {Navigation} from 'src/Navigation'
import {VersionCheckContainer} from 'src/containers/VersionCheckContainer'
import {AuthContainer} from 'src/containers/AuthContainer'

const App: FC = () => {
  const store = setupStore()

  useEffect(() => {
    RNSplashScreen.hide()
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <AuthContainer>
          <VersionCheckContainer>
            <Navigation />
          </VersionCheckContainer>
        </AuthContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App
