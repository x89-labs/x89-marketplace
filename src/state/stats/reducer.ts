import { createReducer, createSlice } from '@reduxjs/toolkit'
import { fieldChange } from './actions'
export interface StatsState {
  readonly typedValue: string
}
export const initialState: StatsState = {
  typedValue: '',
}

export default createReducer(initialState, (builder) =>
  builder.addCase(fieldChange, (state, action) => {
    console.log('')
  })
)
