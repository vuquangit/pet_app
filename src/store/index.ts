import { combineReducers, configureStore } from '@reduxjs/toolkit'

// Reducers
import authReducer from './auth'
import launchingReducer from './launching'
import tokensReducer from './tokens'

// Services
import { authApi } from 'src/services/auth'
import { oauthApi } from 'src/services/oauth'
import { dinosaurApi } from 'src/services/dinosaur'

// init store
const preloadedState = {}

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [oauthApi.reducerPath]: oauthApi.reducer,
  [dinosaurApi.reducerPath]: dinosaurApi.reducer,

  auth: authReducer,
  launching: launchingReducer,
  tokens: tokensReducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(oauthApi.middleware)
      .concat(dinosaurApi.middleware),
  preloadedState,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
