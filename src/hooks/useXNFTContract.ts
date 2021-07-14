import { useCallback, useMemo } from 'react'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from './web3'
import { useXNFTContract } from './useContract'
import { useETHBalances } from 'state/wallet/hooks'
import { NetworkContextName } from 'constants/misc'
import { useWeb3React } from '@web3-react/core'
import { XNFT_ADDRESS } from 'constants/addresses'
import { useMintState } from 'state/mint/hooks'

export default function useIsXNFTContract(): {
  addFee: () => void
} {
  const { account, library } = useActiveWeb3React()
  const XNFT = useXNFTContract()
  const ipfsHash = useMintState().ipfsHash
  const inputs = useMemo(() => [account ?? undefined], [account])
  const call = useSingleCallResult(XNFT, 'balanceOf', inputs, NEVER_RELOAD)
  const addFee = useCallback(() => {
    if (account && library) {
      library.getSigner().sendTransaction({
        from: account,
        to: XNFT_ADDRESS[1],
        data: undefined,
        gasLimit: 50000,
      })
    }
  }, [library])

  return { addFee }
}
