import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'
import thunkMiddleware from 'redux-thunk'
import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import explore from './explore/reducer'
import stats from './stats/reducer'
import multicall from './multicall/reducer'
import auth from './auth/reducer'
const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    mint,
    lists,
    explore,
    stats,
    multicall,
    auth,
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    thunkMiddleware,
    save({ states: PERSISTED_KEYS, debounce: 1000 }),
  ],
  preloadedState: load({ states: PERSISTED_KEYS }),
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
