import { AppState } from '../index'

import { useAppSelector } from 'state/hooks'

export function useExploreState(): AppState['explore'] {
  return useAppSelector((state) => state.explore)
}
