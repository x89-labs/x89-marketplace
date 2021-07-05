import { createAction, createAsyncThunk, getDefaultMiddleware } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export enum Field {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

export const typeInput = createAction<{ field: Field; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')
export const fileChange = createAction<{ value: any }>('mint/fileChangeMint')
export const ipfsHash = createAction<{ value: any }>('mint/ipfsHash')
export const deleteFile = createAction<{ value: any }>('mint/deleteFileMint')
export const postItem = createAction<{ value?: any }>('mint/postItem')
export const resetMintState = createAction<void>('mint/resetMintState')
export const getCategories = createAsyncThunk('mint/getCategories', async (skip, take) => {
  const URL = `${Endpoint.CATEGORIES}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
