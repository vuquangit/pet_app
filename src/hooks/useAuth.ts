import {IAuthMe} from 'src/interfaces'
import {useAppSelector} from '../store/hook'

export type UseAuthReturnType = {
  isLoggedIn: boolean
  authState: IAuthMe
}

export const useAuth = (): UseAuthReturnType => {
  const authState = useAppSelector(state => state.auth)
  const isLoggedIn = useAppSelector(state => !!state.auth.role)

  return {
    isLoggedIn: isLoggedIn,
    authState,
  }
}
