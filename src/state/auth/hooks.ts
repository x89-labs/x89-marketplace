import { AppState } from '../index'

import { useAppSelector } from 'state/hooks'

export function useUserState(): AppState['auth'] {
  return useAppSelector((state) => state.auth)
}
