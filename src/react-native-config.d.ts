declare module 'react-native-config' {
  export interface NativeConfig {
    NODE_ENV?: string
    API_URL: string
    FAKE_EMAIL?: string
    FAKE_PASSWORD?: string
    GOOGLE_CLIENT_ID_WEB: string
    GOOGLE_CLIENT_ID_IOS: string
    GOOGLE_REVERSED_CLIENT_ID_IOS: string
  }

  export const Config: NativeConfig
  export default Config
}

declare module '*.svg' {
  import React from 'react'
  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
