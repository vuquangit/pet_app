import {get} from 'lodash'
import {useState} from 'react'
import Snackbar from 'react-native-snackbar'

import {useSignupMutation} from 'src/services/auth'
import {useAppDispatch} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'

export const useSignUp = () => {
  const dispatch = useAppDispatch()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  // redux store
  const [signup, {isLoading, error}] = useSignupMutation()

  const onSubmit = async (data: any) => {
    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({isLaunching: true}))

      const res = await signup(data).unwrap()
      console.log('Sign up success', res)
      const _isSuccess: boolean = !!get(res, 'result.data.email', false)
      setIsSuccess(_isSuccess)

      Snackbar.show({
        text: 'Registered successfully',
        duration: Snackbar.LENGTH_LONG,
        numberOfLines: 4,
        backgroundColor: '#21ad21',
        action: {
          text: 'Dismiss',
          onPress: () => {
            Snackbar.dismiss()
          },
        },
      })
    } catch (error) {
      console.log('Sign up error', error)
    } finally {
      dispatch(setLaunching({isLaunching: false}))
    }
  }

  return {
    isLoading,
    isSuccess,
    error,
    onSubmit,
  }
}
