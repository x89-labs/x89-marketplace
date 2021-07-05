import { createReducer, createSlice } from '@reduxjs/toolkit'
import { getItem, getListItems } from './actions'
import { Item } from 'models/explore'
import { useMintState } from 'state/mint/hooks'

export interface ExploreState {
  listItem: Item[]
  item?: Item
}

export const initialState: ExploreState = {
  listItem: [],
}

const exploreSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListItems.fulfilled, (state, action) => {
      if (action.payload) {
        state.listItem = action.payload.items
      }
    })
    builder.addCase(getItem.fulfilled, (state, action) => {
      if (action.payload) {
        state.item = action.payload
      }
    })
  },
})
export default exploreSlice.reducer
