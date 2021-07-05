import { createAction, getDefaultMiddleware } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export const getItems = createAction<{ value?: any }>('explore/getItems')
const URL = `${Endpoint.GET_ITEM}`
export const getItem = createAction('explore/getItems', function (text) {
  ;(async () => {
    const res = await client.get(URL, {})
    console.log(res)
  })()
  return {
    payload: {
      text,
    },
  }
})
