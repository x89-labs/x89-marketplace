import { createReducer } from '@reduxjs/toolkit'
import { deleteFile, Field, fileChange, resetMintState, typeInput } from './actions'

export interface MintState {
  readonly independentField: Field
  readonly typedValue: string
  readonly otherTypedValue: string // for the case when there's no liquidity
  readonly startPriceTypedValue: string // for the case when there's no liquidity
  readonly leftRangeTypedValue: string
  readonly rightRangeTypedValue: string
  file?: File
  files?: File[]
}

export const initialState: MintState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
  startPriceTypedValue: '',
  leftRangeTypedValue: '',
  rightRangeTypedValue: '',
}

export default createReducer<MintState>(initialState, (builder) =>
  builder
    .addCase(resetMintState, () => initialState)
    .addCase(fileChange, (state, action) => {
      if (action) {
        state.file = action.payload.value
        // state.files = action.payload.value
      }
    })
    .addCase(deleteFile, (state, action) => {
      state.file = undefined
    })
    .addCase(typeInput, (state, { payload: { field, typedValue, noLiquidity } }) => {
      if (noLiquidity) {
        // they're typing into the field they've last typed in
        if (field === state.independentField) {
          return {
            ...state,
            independentField: field,
            typedValue,
          }
        }
        // they're typing into a new field, store the other value
        else {
          return {
            ...state,
            independentField: field,
            typedValue,
            otherTypedValue: state.typedValue,
          }
        }
      } else {
        return {
          ...state,
          independentField: field,
          typedValue,
          otherTypedValue: '',
        }
      }
    })
)
