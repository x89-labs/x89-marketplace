import { createAction, getDefaultMiddleware } from '@reduxjs/toolkit'

export const getItems = createAction<{ value?: any }>('explore/getItems')
