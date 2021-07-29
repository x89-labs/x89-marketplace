import { useCallback, useMemo } from 'react'
import { useActiveWeb3React } from './web3'
import { usePolrareContract } from './useContract'
import { POLRARE_ADDRESS } from 'constants/addresses'
import { useMintState } from 'state/mint/hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { SupportedChainId } from 'constants/chains'

export default function usePolrareNft(): {
  addFee: () => void
} {
  const { account, library } = useActiveWeb3React()
  const pContract = usePolrareContract()
  const ipfsHash = useMintState().ipfsHash
  const hash = Buffer.from(`${ipfsHash}`).toString('hex')
  const data = `0x${hash}`;

  const addFee = useCallback(() => {
    if (account && library && ipfsHash) {
      library
        .getSigner()
        .sendTransaction({
          from: account,
          to: POLRARE_ADDRESS[SupportedChainId.ROPSTEN],
          data: data,
          gasLimit: 6000000,
        })
        .then((response) => {
          console.log(response)
        })
    }
  }, [library])

  return { addFee }
}
