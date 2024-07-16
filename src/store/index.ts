import {combineReducers, configureStore} from '@reduxjs/toolkit'

// Reducers
import authReducer from './auth'
import launchingReducer from './launching'

// Services
import {authApi} from 'src/services/auth'

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,

  auth: authReducer,
  launching: launchingReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
