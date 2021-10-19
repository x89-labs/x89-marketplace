import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export const fieldChange = createAction<{ fieldName: string; fieldValue: any }>('explore/fieldChange')

export const getListItems = createAsyncThunk('explore/items', async () => {
  const URL = `${Endpoint.ITEM}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
export const getItem = createAsyncThunk('explore/getItem', async (itemId: string) => {
  const URL = `${Endpoint.ITEM}/${itemId}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
export const searchItems = createAsyncThunk('explore/search', async (body: { name: string; sortBy: string }) => {
  const URL = `${Endpoint.ITEM}?${body.sortBy}=${body.name}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    console.log(response)
    return response.data
  } else {
    return []
  }
})
