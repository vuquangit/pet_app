import React, {FC} from 'react';
// import {useAuth} from '../hooks';
// import {SplashScreen} from '../screens/SplashScreen';

type PropsType = {
  children: React.ReactNode;
};

export const AuthContainer: FC<PropsType> = ({children}) => {
  return children;
  // const {isLaunching} = useAuth();
  // return isLaunching ? <SplashScreen /> : <>{children}</>;
};
