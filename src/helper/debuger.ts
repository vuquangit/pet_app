// react-native-debugger
import {DevSettings, NativeModules} from 'react-native'

const addDebugMenuItems = async () => {
  const message = {
    stop: '(*) Stop Debugging',
    debug: '(*) Debug JS Remotely',
  }

  DevSettings.addMenuItem(message.debug, () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(true)
  })
  DevSettings.addMenuItem(message.stop, () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(false)
  })
}

export const enableDebugging = async () => {
  setTimeout(addDebugMenuItems, 100)
}
