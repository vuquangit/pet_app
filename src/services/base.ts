import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/query'
import Snackbar from 'react-native-snackbar'

import {camelizeKeys, decamelizeKeys} from 'humps'
import {get, isEmpty} from 'lodash'
import Config from 'react-native-config'

import ERROR_MESSAGE from 'src/constants/error-message'
import {IBaseResponse} from 'src/interfaces/base'
import {resetCredentials} from 'src/store/auth'
import {deviceStorage} from 'src/store/storage'
import storageKeys from 'src/constants/storage-keys'
import {store} from 'src/store'

const isDevelopment = Config.NODE_ENV === 'development'
const errorCodeSkipList: string[] = []

export const transformResponse = (response: IBaseResponse) => {
  const {success} = response
  if (success) {
    return camelizeKeys(response)
  }
  return Promise.reject()
}

export const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async headers => {
    // get access token from store
    const state = store.getState()
    const accessTokenStore = get(state, 'tokens.accessToken', '')

    // get access token from storage
    const {value: accessTokenLocal} = await deviceStorage.getItem(storageKeys.access_token)

    const accessToken = accessTokenLocal || accessTokenStore
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const body = args.body instanceof FormData ? args.body : decamelizeKeys(args.body)
  const params = decamelizeKeys(args.params)
  const argsCustom = {...args, body, params}
  const refreshToken = deviceStorage.getItem(storageKeys.refresh_token)

  let result: any = await baseQuery(argsCustom, api, extraOptions)

  // refresh token
  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data?.error?.code === 'ACCESS_TOKEN_EXPIRED'
  ) {
    let refreshResult: any = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
        body: {refresh_token: refreshToken},
      },
      api,
      extraOptions,
    )

    if (refreshResult.data) {
      const {accessToken = '', refreshToken: refreshTokenNew = ''} = camelizeKeys(refreshResult)

      deviceStorage.saveItem(storageKeys.access_token, accessToken)
      deviceStorage.saveItem(storageKeys.refresh_token, refreshTokenNew)

      result = await baseQuery(args, api, extraOptions)
    } else {
      handleNotification(api, result)
    }
  }

  // show notification and redirect
  if (result.error) {
    handleNotification(api, result)
  }

  if (result.data) {
    result.data = camelizeKeys(result.data)
  }

  return result
}

const handleNotification = (api: BaseQueryApi, result: any) => {
  const errorStatus = result.error.status
  const error = result?.error?.data?.error
  console.log('Error::', error)
  let message = ''
  let navigateTo = ''

  // clear profile and token
  if (errorStatus === 401) {
    api.dispatch(resetCredentials())
    deviceStorage.deleteItem(storageKeys.access_token)
    deviceStorage.deleteItem(storageKeys.refresh_token)
  }

  switch (errorStatus) {
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'Error 401'
      navigateTo = '/login'
      break
    case 403:
      navigateTo = '/403'
      break
    // case 404:
    //   navigateTo = '/404'
    //   break
    case 500:
      message = 'Server Error'
      break
    default:
      message = ''
      navigateTo = ''
  }

  if (!isEmpty(error)) {
    const errorCode: string = error?.code || ''

    // notification if errorCode is not in skip list
    if (!errorCodeSkipList.includes(errorCode)) {
      const messageVal =
        get(ERROR_MESSAGE, errorCode) || get(error, 'message[0]') || 'Something went wrong'

      Snackbar.show({
        text: messageVal,
        duration: Snackbar.LENGTH_LONG,
        numberOfLines: 4,
        backgroundColor: '#BE4646',
        action: {
          text: 'Dismiss',
          onPress: () => {
            Snackbar.dismiss()
          },
        },
      })
    }
  } else if (message) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      numberOfLines: 4,
      backgroundColor: '#BE4646',
      action: {
        text: 'Dismiss',
        onPress: () => {
          Snackbar.dismiss()
        },
      },
    })
  }

  if (navigateTo && !isDevelopment) {
    // TODO: redirect if error
    // history.push(navigateTo);
  }
}
