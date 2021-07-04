import { createReducer, createSlice } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'
import { getItems, listItems } from './actions'
import { listItem } from 'models/explore'

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
        console.log(action.payload)
        state.listItem = action.payload
      }
    })
  },
})
export default usersSlice.reducer
