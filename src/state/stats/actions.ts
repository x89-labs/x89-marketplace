import { createAction, createAsyncThunk, getDefaultMiddleware } from '@reduxjs/toolkit'
import { client, Endpoint } from 'api'

export const fieldChange = createAction<void>('stats/fieldChange')
