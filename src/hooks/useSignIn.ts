import {useNavigation} from '@react-navigation/native'

import {deviceStorage} from '../store/storage'
import storageKeys from '../constants/storage-keys'

import {useLoginMutation} from '../services/auth'
import useProfile from './useProfile'

export const useSignIn = () => {
  const navigation = useNavigation()
  // const {dispatch} = useContext(AuthContext);

  // redux store
  const [login, {isLoading, error}] = useLoginMutation()
  const {fetchProfile} = useProfile()

  const onSubmit = async ({email, password}: any) => {
    console.log('email, password', email, password)

    // Sign in and redirect to the proper destination if successful.
    try {
      const loginResponse = await login({email, password}).unwrap()
      const tokens = loginResponse.result?.data
      saveToken(tokens)
    } catch (error) {
      console.log('Invalid login attempt', error)
    }
  }

  const saveToken = async (tokens: any) => {
    // StorageService.set(storageKeys.AUTH_PROFILE, tokens);
    // save token local
    await Promise.all([
      deviceStorage.saveItem(storageKeys.access_token, tokens.accessToken),
      deviceStorage.saveItem(storageKeys.refresh_token, tokens.refreshToken),
    ])
    await fetchProfile()

    // redirect to home
    navigation.navigate('home')
  }

  return {
    isLoading,
    error,
    onSubmit,
    saveToken,
  }
}
