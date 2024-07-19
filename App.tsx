import 'react-native-gesture-handler'
import React, {FC, useEffect} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Provider} from 'react-redux'
import {StatusBar} from 'react-native'
import RNSplashScreen from 'react-native-splash-screen'

import {store} from 'src/store'
import {Navigation} from 'src/Navigation'
import {VersionCheckContainer} from 'src/containers/VersionCheckContainer'
import {SpinnerContainer} from 'src/containers/SpinnerContainer'
import {enableDebugging} from 'src/helper/debuger'

const App: FC = () => {
  useEffect(() => {
    RNSplashScreen.hide()
    enableDebugging()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default App
