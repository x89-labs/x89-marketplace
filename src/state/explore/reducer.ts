import { createReducer, createSlice } from '@reduxjs/toolkit'
import { getItems, listItems } from './actions'
import { listItem } from 'models/explore'
import { useMintState } from 'state/mint/hooks'

export interface ExploreState {
  listItem: listItem[]
}

export const initialState: ExploreState = {
  listItem: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listItems.fulfilled, (state, action) => {
      if (action.payload) {
        state.listItem = action.payload.items
      }
    })
  },
})
export default usersSlice.reducer
