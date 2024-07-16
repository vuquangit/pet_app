import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ILaunching {
  isLaunching: boolean
}

const initialState: ILaunching = {
  isLaunching: false,
}

export const launchingSlice = createSlice({
  name: 'launching',
  initialState,
  reducers: {
    setLaunching: (state, action: PayloadAction<ILaunching>) => ({
      ...state,
      ...action.payload,
    }),
    resetLaunching: () => initialState,
  },
})

export const {setLaunching, resetLaunching} = launchingSlice.actions
export default launchingSlice.reducer
