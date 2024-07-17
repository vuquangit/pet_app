import {useState} from 'react'
import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import {useAppDispatch} from 'src/store/hook'
import {resetCredentials} from 'src/store/auth'
import {setLaunching} from 'src/store/launching'

export const useSignOut = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const dispatch = useAppDispatch()

  const signOut = async () => {
    try {
      dispatch(setLaunching({isLaunching: true}))

      await Promise.all([
        deviceStorage.deleteItem(storageKeys.access_token),
        deviceStorage.deleteItem(storageKeys.refresh_token),
      ])
      dispatch(resetCredentials())

      setIsSuccess(true)
    } finally {
      dispatch(setLaunching({isLaunching: false}))
    }
  }

  return {
    isSuccess,
    signOut,
  }
}
