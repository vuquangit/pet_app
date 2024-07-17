import {fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/query'
import Snackbar from 'react-native-snackbar'

import {camelizeKeys, decamelizeKeys} from 'humps'
import {get, isEmpty} from 'lodash'
import Config from 'react-native-config'

import ERROR_MESSAGE from '../constants/error-message'
import {IBaseResponse} from '../interfaces/base'
import {resetCredentials} from '../store/auth'

import {deviceStorage} from '../store/storage'
import storageKeys from '../constants/storage-keys'

const isDevelopment = Config.NODE_ENV === 'development'

const errorCodeSkipList = [
  // 'unauthenticated', // TODO: check login message
  'account_locked', // blocked login
  'auth.reset_password_token.invalid', // invalid token for reset password
  'invalid_email_reset_token', // verify email change
]

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
    const {value: accessToken} = await deviceStorage.getItem(storageKeys.access_token)

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
