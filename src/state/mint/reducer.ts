import { createReducer } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'
import { Ipfs } from 'client/ipfs'
import { deleteFile, Field, fileChange, ipfsHash, postItem, resetMintState, typeInput } from './actions'
export interface MintState {
  readonly independentField: Field
  readonly typedValue: string
  readonly otherTypedValue: string // for the case when there's no liquidity
  readonly startPriceTypedValue: string // for the case when there's no liquidity
  readonly leftRangeTypedValue: string
  readonly rightRangeTypedValue: string
  readonly file?: any
  readonly ipfsHash?: any
}

export const initialState: MintState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
  startPriceTypedValue: '',
  leftRangeTypedValue: '',
  rightRangeTypedValue: '',
}

const URL = `${Endpoint.GET_ITEM}`
export default createReducer<MintState>(initialState, (builder) =>
  builder
    .addCase(resetMintState, () => initialState)
    .addCase(fileChange, (state, { payload: { value } }) => {
      return {
        ...state,
        file: value,
      }
    })
    .addCase(ipfsHash, (state, { payload: { value } }) => {
      return {
        ...state,
        ipfsHash: value,
      }
    })
    .addCase(deleteFile, (state, action) => {
      const res = client.get(URL, {})
      Promise.all([res]).then((response) => {
        console.log(response)
      })
      return {
        ...state,
        file: undefined,
      }
    })
    .addCase(postItem, (state, { payload: { value } }) => {
      const res = client.post(URL, { value })

      return {
        ...state,
      }
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
