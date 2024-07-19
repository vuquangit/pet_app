import {useState} from 'react'
import {get} from 'lodash'

import {useForgotPasswordMutation} from 'src/services/auth'
import {useAppDispatch} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'

export const useForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  // redux store
  const [forgotPassword, {isLoading, error}] = useForgotPasswordMutation()

  const onSubmit = async (data: any) => {
    // Sign in and redirect to the proper destination if successful.
    try {
      dispatch(setLaunching({isLaunching: true}))

      const res = await forgotPassword(data).unwrap()
      console.log('Forgot Password success', res)
      const _isSuccess = get(res, 'result.data.success', false)
      setIsSuccess(_isSuccess)
    } catch (error) {
      setIsSuccess(false)
      console.log('Forgot Password error', error)
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
