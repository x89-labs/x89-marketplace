import { useCallback, useMemo } from 'react'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from './web3'
import { useXNFTContract } from './useContract'
import { XNFT_ADDRESS } from 'constants/addresses'
import { useMintState } from 'state/mint/hooks'
import { Contract } from 'ethers'
import XNFT_ABI from 'abis/XNFT.json'

export default function useIsXNFTContract(): {
  addFee: () => void
} {
  const { account, library } = useActiveWeb3React()
  const XNFT = new Contract(XNFT_ADDRESS[1], XNFT_ABI.abi)
  const ipfsHash = useMintState().ipfsHash
  const inputs = useMemo(() => [account ?? undefined], [account])
  const call = useSingleCallResult(XNFT, 'balanceOf', inputs, NEVER_RELOAD)
  const addFee = useCallback(() => {
    if (account && library) {
      library
        .getSigner()
        .sendTransaction({
          from: account,
          to: XNFT_ADDRESS[1],
          data: ipfsHash,
          gasLimit: 50000,
        })
        .then((response) => {
          console.log(response)
        })
    }
  }, [library])

  return { addFee }
}
