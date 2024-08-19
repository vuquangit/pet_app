import { createApi } from '@reduxjs/toolkit/query/react'

import { IBaseResponse } from 'src/interfaces/base'
import { customBaseQuery } from 'src/services/base'
import { IDinosaur, IDinosaurCreate } from 'src/interfaces/dinosaur'

export const dinosaurApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'dinosaurApi',
  tagTypes: ['DinosaurApi'],

  endpoints: builder => ({
    getDinosaurList: builder.query<IBaseResponse<IDinosaur[]>, any>({
      query: params => ({
        url: '/dinosaur',
        method: 'GET',
        params: params,
      }),
    }),

    createDinosaur: builder.mutation<IBaseResponse<IDinosaur>, IDinosaurCreate>({
      query: body => ({
        url: '/dinosaur',
        method: 'POST',
        body: body,
      }),
    }),

    getDinosaur: builder.query<IBaseResponse<any>, void>({
      query: id => ({
        url: '/dinosaur/' + id,
        method: 'GET',
      }),
    }),
  }),
})

export const { useLazyGetDinosaurListQuery, useCreateDinosaurMutation, useGetDinosaurQuery } =
  dinosaurApi
