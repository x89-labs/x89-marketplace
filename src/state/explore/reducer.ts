import { createReducer } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'
import { getItems } from './actions'
import { listItem } from 'models/explore'

export interface ExploreState {
  listItem: listItem[]
}

export const initialState: ExploreState = {
  listItem: [],
}

const URL = `${Endpoint.GET_ITEM}`
export default createReducer<ExploreState>(initialState, (builder) =>
  builder.addCase(getItems, (state, action) => {
    ;(async () => {
      const res = await client.get(URL, {})
      if (res?.status === 200) {
        state.listItem = res.data.items
      }
    })()
  })
)
