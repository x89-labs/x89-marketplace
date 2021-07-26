import { createReducer, createSlice } from '@reduxjs/toolkit'
import { fieldChange, getItem, getListItems, searchItems } from './actions'
import { Item } from 'models/explore'
import { useMintState } from 'state/mint/hooks'

export interface ExploreState {
  listItem: Item[]
  item?: Item
  limit: number
  href: string
}

export const initialState: ExploreState = {
  listItem: [],
  limit: 8,
  href: '',
}

const exploreSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListItems.fulfilled, (state, action) => {
        if (action.payload) {
          state.listItem = action.payload.items
        }
      })
      .addCase(getItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.item = action.payload
        }
      })
      .addCase(fieldChange, (state, { payload: { fieldName, fieldValue } }) => {
        return {
          ...state,
          [fieldName]: fieldValue,
        }
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        if (action.payload) {
          state.listItem = action.payload.items
        }
      })
  },
})
export default exploreSlice.reducer
