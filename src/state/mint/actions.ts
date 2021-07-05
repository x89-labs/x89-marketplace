import { createAction, createAsyncThunk, getDefaultMiddleware } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'
import { useMintState } from './hooks'

export enum Field {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}
export const resetMintState = createAction<void>('mint/resetMintState')
export const typeInput = createAction<{ field: Field; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')

export const fileChange = createAction<{ value: any }>('mint/fileChangeMint')
export const fieldChange = createAction<{ fieldName: string; fieldValue: any }>('mint/fieldChange')
export const ipfsHash = createAction<{ value: string }>('mint/ipfsHash')
export const deleteFile = createAction<{ value: any }>('mint/deleteFileMint')

export const getCategories = createAsyncThunk('mint/getCategories', async (skip, take) => {
  const URL = `${Endpoint.CATEGORIES}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
export const postItem = createAsyncThunk('mint/postItem', async () => {
  const URL = `${Endpoint.ITEM}`
  const body = {
    categorie: useMintState().categorie,
    image: useMintState().ipfsHash,
  }
  const response = await client.post(URL, body)
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
