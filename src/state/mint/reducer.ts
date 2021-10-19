import { createSlice } from '@reduxjs/toolkit'
import { Categories } from 'models/categories'
import { Item, PutOnSaleType } from 'models/item'
import { deleteFile, Field, fieldChange, fileChange, getCategories, getMyItems, postItem, resetForm } from './actions'
export interface MintState {
  readonly independentField: Field
  readonly typedValue: string
  readonly showBtnAdvanced: boolean
  readonly otherTypedValue: string // for the case when there's no liquidity
  readonly file?: any
  readonly fileType?: any
  readonly categories?: Categories[]
  readonly categorie?: Categories
  readonly symbol?: string
  readonly initValues: Item
  readonly listMyItem?: Item[]
  readonly isCompleted: boolean
  readonly ipfsHash?: string
}

export const initialState: MintState = {
  independentField: Field.CURRENCY_A,
  typedValue: '',
  otherTypedValue: '',
  showBtnAdvanced: true,
  initValues: {
    id: '',
    name: '',
    contractAddress: '',
    descriptions: '',
    urlFile: '',
    price: 0,
    symbol: '',
    royalties: 0,
    numberOfCopies: 1,
    putOnSaleType: PutOnSaleType.FixedPrice,
    startingDate: new Date(),
    expirationDate: new Date(),
    categoryId: '',
    collectionId: '',
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
      .addCase(deleteFile, (state) => {
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
      .addCase(postItem.fulfilled, (state) => {
        return {
          ...state,
          isCompleted: true,
        }
      })
      .addCase(resetForm, (state) => {
        return {
          ...state,
          file: undefined,
        }
      })
  },
})
export default mintSlice.reducer
