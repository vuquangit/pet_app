// import type {PreloadedState} from '@reduxjs/toolkit';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import authReducer from './auth';

import {authApi} from '../services/auth';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,

  auth: authReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(authApi.middleware),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
