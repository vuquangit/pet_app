import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ITokens {
  accessToken: string | null
  refreshToken: string | null
}

const initialState: ITokens = {
  accessToken: null,
  refreshToken: null,
}

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<ITokens>) => ({
      ...state,
      ...action.payload,
    }),
    resetTokens: () => initialState,
  },
})

export const {setTokens, resetTokens} = tokensSlice.actions
export default tokensSlice.reducer
