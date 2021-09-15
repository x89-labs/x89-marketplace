import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { clientStorage, sessionStorage } from 'constants/clientStorage'
import { client, Endpoint } from 'api'

export const login = createAsyncThunk('', async (body?: any) => {
  try {
    const URL = `${Endpoint.USERS}/auth`
    const response = await client.post(URL, body)
    if (response && response.status === 201) {
      clientStorage.set('market-service-n', response.data.accessToken)
      client.init(response.data.accessToken)
      return response
    } else {
      return response
    }
  } catch (e) {
    console.log(e)
  }
})
