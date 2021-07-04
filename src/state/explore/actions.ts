import { createAction, createAsyncThunk, getDefaultMiddleware } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export const getItems = createAction<{ value?: any }>('explore/getItems')
export const listItems = createAsyncThunk('explore/items', async (skip, take) => {
  const URL = `${Endpoint.GET_ITEM}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
