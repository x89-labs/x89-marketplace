import { createAsyncThunk, createReducer, createSlice } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'
import { getItems } from './actions'
import { listItem } from 'models/explore'
import { useMintState } from 'state/mint/hooks'

export interface ExploreState {
  listItem: listItem[]
}

export const initialState: ExploreState = {
  listItem: [],
}
export const getExploreItem = createAsyncThunk('explore/getItem', async () => {
  const res = await client.get(URL, {})
  console.log(res)

  if (res && res.status === 200) return res.data.items
})

const URL = `${Endpoint.GET_ITEM}`
export default createReducer<ExploreState>(initialState, (builder) =>
  builder.addCase(getItems, (state, action) => {
    ;(async () => {
      const res = await client.get(URL, {})
      if (res?.status === 200) {
        // state.listItem = res.data.items
      }
    })()
  })
)
