import {useState} from 'react';
import {deviceStorage} from '../store/storage';
import storageKeys from '../constants/storage-keys';
import {useAppDispatch} from '../store/hook';
import {resetCredentials} from '../store/auth';

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const signOut = async () => {
    setIsLoading(true);

    await Promise.all([
      deviceStorage.deleteItem(storageKeys.access_token),
      deviceStorage.deleteItem(storageKeys.refresh_token),
    ]);
    dispatch(resetCredentials());

    setIsLoading(false);
    setIsSuccess(true);
  };

  return {
    isLoading,
    isSuccess,
    signOut,
  };
};
