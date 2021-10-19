import { createSlice } from '@reduxjs/toolkit'
import { login } from './actions'
import { User } from '../../models/user'
export interface UserState {
  user?: User
  login: boolean
  message?: string
}

export const initialState: UserState = {
  user: undefined,
  login: false,
  message: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          user: action.payload.data.user,
          login: action.payload.status === 201 ? true : false,
          message: action.payload.data.message,
        }
      }
      return {
        ...state,
      }
    })
  },
})
export default userSlice.reducer
