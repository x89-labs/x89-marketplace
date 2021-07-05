import { useMemo } from 'react'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from './web3'
import { useArgentWalletDetectorContract } from './useContract'

export default function useMintNf() {
  const { account, chainId, library } = useActiveWeb3React()
  console.log(account)
  console.log(chainId)
  console.log(library)

  const argentWalletDetector = useArgentWalletDetectorContract()
  const inputs = useMemo(() => [account ?? undefined], [account])
  const call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD)
  return call?.result?.[0] ?? false
}
