import { createReducer, createSlice } from '@reduxjs/toolkit'
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

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
  },
})
export default usersSlice.reducer
