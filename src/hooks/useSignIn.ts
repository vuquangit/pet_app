import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import {useLoginMutation} from 'src/services/auth'
import {useAppDispatch} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'
import {setTokens} from 'src/store/tokens'
import useProfile from './useProfile'
import {IAuthRequest, IAuthResponse} from 'src/interfaces'

export const useSignIn = () => {
  const dispatch = useAppDispatch()

  // redux store
  const [login, {isLoading, error}] = useLoginMutation()
  const {fetchProfile} = useProfile()

  const onSubmit = async ({email, password}: IAuthRequest, isRemember: boolean) => {
    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({isLaunching: true}))

      const loginResponse = await login({email, password}).unwrap()
      const tokens = loginResponse.result?.data
      if (!tokens) {
        return
      }

      saveToken(tokens, isRemember)
    } catch {
      console.log('Login error')
    } finally {
      dispatch(setLaunching({isLaunching: false}))
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
    dispatch(setTokens({accessToken: tokens.accessToken, refreshToken: tokens.refreshToken}))

    // fetch profile
    await fetchProfile()

    // auto redirect to home
    console.log('redirect to home')
  }

  return {
    isLoading,
    error,
    onSubmit,
    saveToken,
  }
}
