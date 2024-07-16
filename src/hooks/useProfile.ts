import {cloneDeep} from 'lodash'

import {IAuthMe} from 'src/interfaces/auth'
import {useLazyGetProfileQuery} from 'src/services/auth'
import {setCredentials} from 'src/store/auth'
import {useAppDispatch, useAppSelector} from 'src/store/hook'
import {setLaunching} from 'src/store/launching'

const useProfile = () => {
  const [getProfile] = useLazyGetProfileQuery()
  const dispatch = useAppDispatch()
  const isLaunching = useAppSelector(state => state.launching.isLaunching)

  const fetchProfile = async () => {
    const isShowSplash = cloneDeep(!isLaunching)

    try {
      if (isShowSplash) {
        dispatch(setLaunching({isLaunching: true}))
      }

      const profileResponse = await getProfile().unwrap()
      const profile = profileResponse.result?.data as IAuthMe
      dispatch(setCredentials(profile))
    } catch (error) {
      console.log('fetch profile error', error)
    } finally {
      if (isShowSplash) {
        dispatch(setLaunching({isLaunching: false}))
      }
    }
  }

  return {fetchProfile}
}

export default useProfile
