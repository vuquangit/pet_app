declare module 'react-native-config' {
  export interface NativeConfig {
    NODE_ENV?: string
    API_URL: string
    FAKE_EMAIL?: string
    FAKE_PASSWORD?: string
  }

  export const Config: NativeConfig
  export default Config
}
