import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export enum Field {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}
export const resetMintState = createAction<void>('mint/resetMintState')
export const typeInput = createAction<{ field: Field; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')

export const fileChange = createAction<{ value: any }>('mint/fileChangeMint')
export const fieldChange = createAction<{ fieldName: string; fieldValue: any }>('mint/fieldChange')
export const getIpfsHash = createAction<{ value: string }>('mint/ipfsHash')
export const deleteFile = createAction<{ value: any }>('mint/deleteFileMint')

export const getCategories = createAsyncThunk('mint/getCategories', async () => {
  const URL = `${Endpoint.CATEGORIES}`
  const response = await client.get(URL, {})
  if (response && response.status == 200) {
    return response.data
  } else {
    return []
  }
})
export const postItem = createAsyncThunk('mint/postItem', async (body?: any) => {
  try {
    const URL = `${Endpoint.ITEM}`

    const response = await client.post(URL, body)
    console.log(response)

    if (response && response.status == 200) {
      return response.data
    } else {
      return []
    }
  } catch (e) {
    console.log(e)
  }
})
