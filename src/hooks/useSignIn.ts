import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import {useLoginMutation} from 'src/services/auth'
import {useAppDispatch} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'
import useProfile from './useProfile'

export const useSignIn = () => {
  const dispatch = useAppDispatch()

  // redux store
  const [login, {isLoading, error}] = useLoginMutation()
  const {fetchProfile} = useProfile()

  const onSubmit = async ({email, password}: any) => {
    console.log('email, password', email, password)

    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({isLaunching: true}))

      const loginResponse = await login({email, password}).unwrap()
      const tokens = loginResponse.result?.data
      saveToken(tokens)
    } catch {
      console.log('Login error')
    } finally {
      dispatch(setLaunching({isLaunching: false}))
    }
  }

  const saveToken = async (tokens: any) => {
    // save token local
    await Promise.all([
      deviceStorage.saveItem(storageKeys.access_token, tokens.accessToken),
      deviceStorage.saveItem(storageKeys.refresh_token, tokens.refreshToken),
    ])
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
