import { createReducer, createSlice } from '@reduxjs/toolkit'
import useMintNf from 'hooks/useMintNft'
import { fieldChange } from './actions'
export interface StatsState {
  readonly typedValue: string
}

export const initialState: StatsState = {
  typedValue: '',
}

export default createReducer(initialState, (builder) =>
  builder.addCase(fieldChange, (state, action) => {
    useMintNf()
  })
)
