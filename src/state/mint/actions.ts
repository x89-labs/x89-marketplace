import { createAction, getDefaultMiddleware } from '@reduxjs/toolkit'

export enum Field {
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})

export const typeInput = createAction<{ field: Field; typedValue: string; noLiquidity: boolean }>('mint/typeInputMint')
export const fileChange = createAction<{ value: File }>('mint/fileChangeMint')
export const deleteFile = createAction<{ value: File }>('mint/deleteFileMint')
export const resetMintState = createAction<void>('mint/resetMintState')
