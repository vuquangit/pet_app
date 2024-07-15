import {deviceStorage} from '../store/storage';
import storageKeys from '../constants/storage-keys';

import {IAuthMe} from '../interfaces/auth';
import {useLazyGetProfileQuery} from '../services/auth';
import {setCredentials} from '../store/auth';
import {useAppDispatch} from '../store/hook';

const useProfile = () => {
  const [getProfile] = useLazyGetProfileQuery();
  const dispatch = useAppDispatch();

  const fetchProfile = async () => {
    const tokens = deviceStorage.getItem(storageKeys.access_token);
    if (!tokens) {
      return;
    }

    try {
      const profileResponse = await getProfile().unwrap();
      const profile = profileResponse.result?.data as IAuthMe;
      dispatch(setCredentials(profile));
    } catch (error) {
      console.log('fetch profile error', error);
    }
  };

  return {fetchProfile};
};

export default useProfile;
