import { createReducer, createSlice } from '@reduxjs/toolkit'
import { BodyItem } from 'models/bodyItem'
import { Categories } from 'models/categories'
import { Item } from 'models/explore'
import { deleteFile, Field, fieldChange, fileChange, getCategories, getMyItems, postItem } from './actions'
export interface MintState {
  readonly independentField: Field
  readonly typedValue: string
  readonly otherTypedValue: string // for the case when there's no liquidity
  readonly file?: any
  readonly fileType?: any
  readonly categories?: Categories[]
  readonly categorie?: Categories
  readonly symbol?: string
  readonly initValues: BodyItem
  readonly listMyItem?: Item[]
  readonly isCompleted: boolean
  readonly ipfsHash?: string
}

export const initialState: MintState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
  initValues: {
    categoryId: '',
    name: '',
    description: '',
    price: 0,
    contractAddress: '',
    assetId: '1233',
    symbol: 'ETH',
    image: '',
    totalQuantity: 1,
    createdBy: '',
    type: '',
    categoryName: '',
  },
  isCompleted: false,
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
      .addCase(getMyItems.fulfilled, (state, action) => {
        state.isCompleted = true
        if (action.payload) {
          state.listMyItem = action.payload.items
        }
      })
      .addCase(postItem.fulfilled, (state, action) => {
        // console.log('aaa')
      })
  },
})
export default mintSlice.reducer
