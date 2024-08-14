import { GoogleSignin } from '@react-native-google-signin/google-signin'
import Config from 'react-native-config'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { deviceStorage } from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import { useLoginMutation } from 'src/services/auth'
import { useAppDispatch } from 'src/store/hook'
import { setLaunching } from 'src/store/launching'
import { setTokens } from 'src/store/tokens'
import useProfile from './useProfile'
import { IAuthRequest, IAuthResponse } from 'src/interfaces'
import { useOauthGoogleAppMutation } from 'src/services/oauth'
import EXCEPTION_CODE from 'src/constants/errorCode'

export type RootStackParamList = {
  SignUp: { email: string; name: string } | undefined
}

export const useSignIn = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const [login, { isLoading, error }] = useLoginMutation()
  const [oauthGoogleApp, { isLoading: isGoogleLoading }] = useOauthGoogleAppMutation()
  const { fetchProfile } = useProfile()

  GoogleSignin.configure({
    webClientId: Config.GOOGLE_CLIENT_ID_WEB, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: Config.GOOGLE_CLIENT_ID_IOS, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  })

  const onSubmit = async ({ email, password }: IAuthRequest, isRemember: boolean) => {
    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({ isLaunching: true }))

      const loginResponse = await login({ email, password }).unwrap()
      const tokens = loginResponse.result?.data
      if (!tokens) {
        return
      }

      saveToken(tokens, isRemember)
    } catch {
      console.log('Login error')
    } finally {
      dispatch(setLaunching({ isLaunching: false }))
    }
  }

  const saveToken = async (tokens: IAuthResponse, isRemember: boolean) => {
    // save token local
    if (isRemember) {
      await Promise.all([
        deviceStorage.saveItem(storageKeys.access_token, tokens.accessToken),
        deviceStorage.saveItem(storageKeys.refresh_token, tokens.refreshToken),
      ])
    }

    // save tokens to store
    dispatch(setTokens({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }))

    // fetch profile
    await fetchProfile()

    // auto redirect to home
    console.log('redirect to home')
  }

  // Google sign in
  let userInfo: any = null
  const googleSignIn = async () => {
    try {
      dispatch(setLaunching({ isLaunching: true }))

      await GoogleSignin.hasPlayServices()
      userInfo = await GoogleSignin.signIn()
      if (!userInfo.idToken) {
        return
      }

      const googleTokens = await GoogleSignin.getTokens()
      const loginResponse = await oauthGoogleApp(googleTokens).unwrap()
      const tokens = loginResponse.result?.data
      if (!tokens) {
        return
      }

      saveToken(tokens, true)
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error: any) {
      console.log('GoogleSignIn error:', error)
      // @ts-ignore
      const code = error?.data?.error?.code

      if (code === EXCEPTION_CODE.USER.EMAIL_NOT_FOUND) {
        const email = userInfo?.user?.email || ''
        const name = userInfo?.user?.name || ''
        navigation.navigate('SignUp', { email, name })
      }
    } finally {
      dispatch(setLaunching({ isLaunching: false }))
      userInfo = null
    }
  }

  return {
    isLoading,
    error,
    onSubmit,
    saveToken,
    googleSignIn,
    isGoogleLoading,
  }
}
