import {useEffect} from 'react';
import {deviceStorage} from '../store/storage';
import {EAuthAction} from '../enums/auth.enum';
import storageKeys from '../constants/storage-keys';
import {useAppDispatch, useAppSelector} from '../store/hook';

export type UseAuthReturnType = {
  isLoggedIn: boolean;
  isLaunching: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

export const useAuth = (): UseAuthReturnType => {
  // const dispatch = useAppDispatch();
  const authState = useAppSelector(state => !!state.auth);
  const isLoggedIn = useAppSelector(state => !!state.auth.role);
  // const isLaunching = useAppSelector(state => state.auth.isLaunching);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     return;
  //   }

  //   (async () => {
  //     const [{value: accessToken}, {value: refreshToken}] = await Promise.all([
  //       deviceStorage.getItem(storageKeys.access_token),
  //       deviceStorage.getItem(storageKeys.refresh_token),
  //     ]);

  //     if (accessToken && refreshToken) {
  //       dispatch?.({
  //         type: EAuthAction.LOGIN_SUCCESS,
  //         payload: {
  //           accessToken,
  //           refreshToken,
  //         },
  //       });
  //     } else {
  //       dispatch?.({type: EAuthAction.LOGIN_FAILURE});
  //     }
  //   })();
  // }, [dispatch, isLoggedIn]);

  return {
    isLoggedIn: isLoggedIn,
    // isLaunching: authState.isLaunching,
    authState,
  };
};
