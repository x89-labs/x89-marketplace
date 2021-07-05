import { AppState } from '../index'
import { useAppSelector } from 'state/hooks'

export function useStatsState(): AppState['stats'] {
  return useAppSelector((state) => state.stats)
}
