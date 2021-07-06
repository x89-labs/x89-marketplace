import { createAction, createAsyncThunk, getDefaultMiddleware } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export const getListItems = createAsyncThunk('explore/items', async (skip, take) => {
  const URL = `${Endpoint.ITEM}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
export const getItem = createAsyncThunk('explore/getItem', async (itemId: string, { getState }) => {
  const URL = `${Endpoint.ITEM}/${itemId}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
