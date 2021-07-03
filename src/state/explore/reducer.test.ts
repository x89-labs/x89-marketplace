import { createStore, Store } from 'redux'
import reducer, { initialState, ExploreState } from './reducer'

describe('explore reducer', () => {
  let store: Store<ExploreState>

  beforeEach(() => {
    store = createStore(reducer, initialState)
  })
})
