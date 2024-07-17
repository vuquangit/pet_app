import {useForgotPasswordMutation} from 'src/services/auth'
import {useAppDispatch} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'

export const useForgotPassword = () => {
  const dispatch = useAppDispatch()

  // redux store
  const [forgotPassword, {isLoading, error}] = useForgotPasswordMutation()

  const onSubmit = async (data: any) => {
    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({isLaunching: true}))

      const res = await forgotPassword(data).unwrap()
      console.log('Forgot Password success', res)
    } catch (error) {
      console.log('Forgot Password error', error)
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
