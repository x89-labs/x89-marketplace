import { createAction, getDefaultMiddleware } from '@reduxjs/toolkit'

export enum Field {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

export const typeInput = createAction<{ field: Field; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')
export const fileChange = createAction<{ value: any }>('mint/fileChangeMint')
export const deleteFile = createAction<{ value: any }>('mint/deleteFileMint')
export const postItem = createAction<{ value?: any }>('mint/postItem')
export const resetMintState = createAction<void>('mint/resetMintState')
