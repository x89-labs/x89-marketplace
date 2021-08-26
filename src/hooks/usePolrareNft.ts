import { useCallback, useMemo } from 'react'
import { useActiveWeb3React } from './web3'
import { usePolrareContract } from './useContract'
import { useMintState } from 'state/mint/hooks'
export function usePolrareNft(): { mint: () => void } {
  const { account, library } = useActiveWeb3React()
  const pContract = usePolrareContract()
  const ipfsHash = useMintState().ipfsHash
  const mint = useCallback(() => {
    ;(async () => {
      if (account && ipfsHash) {
        await pContract?.mintNFT(account!, ipfsHash!)
      }
    })()
  }, [ipfsHash, library])
  return { mint }
}
