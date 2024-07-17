import {useSignupMutation} from 'src/services/auth'
import {useAppDispatch} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'

export const useSignUp = () => {
  const dispatch = useAppDispatch()

  // redux store
  const [signup, {isLoading, error}] = useSignupMutation()

  const onSubmit = async (data: any) => {
    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({isLaunching: true}))

      const res = await signup(data).unwrap()
      console.log('Sign up success', res)
    } catch (error) {
      console.log('Sign up error', error)
    } finally {
      dispatch(setLaunching({isLaunching: false}))
    }
  }

  return {
    isLoading,
    error,
    onSubmit,
  }
}
