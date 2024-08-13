import {createApi} from '@reduxjs/toolkit/query/react'

import {IBaseResponse} from 'src/interfaces/base'
import {customBaseQuery} from 'src/services/base'
import {IOauthRequest} from 'src/interfaces/oauth'
import {IAuthResponse} from 'src/interfaces'
export const oauthApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'oauthApi',
  tagTypes: ['Oauth'],

  endpoints: builder => ({
    oauthGoogleApp: builder.mutation<IBaseResponse<IAuthResponse>, IOauthRequest>({
      query: body => ({
        url: '/oauth/google/app',
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const {useOauthGoogleAppMutation} = oauthApi
