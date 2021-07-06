import { createReducer, createSlice } from '@reduxjs/toolkit'
import { BodyItem } from 'models/bodyItem'
import { Categories } from 'models/categories'
import { deleteFile, Field, fieldChange, fileChange, getCategories, getIpfsHash, postItem } from './actions'
export interface MintState {
  readonly independentField: Field
  readonly typedValue: string
  readonly otherTypedValue: string // for the case when there's no liquidity
  readonly file?: any
  readonly ipfsHash?: string
  readonly categories?: Categories[]
  readonly categorie?: string
  readonly name?: string
  readonly initValues: BodyItem
}

export const initialState: MintState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
  initValues: {
    categoryId: '',
    name: 'A TREE',
    description: 'aaaa',
    price: 12,
    contractAddress: '12324',
    assetId: '1233',
    symbol: 'ETH',
    image: '',
    totalQuantity: 1,
    createdBy: 'Duy Anh',
  },
}

const mintSlice = createSlice({
  name: 'mint',
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
      .addCase(fieldChange, (state, { payload: { fieldName, fieldValue } }) => {
        return {
          ...state,
          [fieldName]: fieldValue,
        }
      })
      .addCase(getIpfsHash, (state, { payload: { value } }) => {
        return {
          ...state,
          ipfsHash: value,
        }
      })
      .addCase(deleteFile, (state, action) => {
        return {
          ...state,
          file: undefined,
        }
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = action.payload
        }
      })
      .addCase(postItem.fulfilled, (state, action) => {
        // console.log('aaa')
      })
  },
})
export default mintSlice.reducer
