import { useCallback, useMemo } from 'react'
import { useActiveWeb3React } from './web3'
import { useXNFTContract } from './useContract'
import { POLRARE_ADDRESS } from 'constants/addresses'
import { useMintState } from 'state/mint/hooks'

export default function usePolrareNft(): {
  addFee: () => void
} {
  const { account, library } = useActiveWeb3React()
  const XNFT = useXNFTContract()
  const ipfsHash = useMintState().ipfsHash
  const hash = Buffer.from(`${ipfsHash}`).toString('hex')
  const data = `0x${hash}`
  const addFee = useCallback(() => {
    if (account && library && ipfsHash) {
      library
        .getSigner()
        .sendTransaction({
          from: account,
          to: POLRARE_ADDRESS[1],
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
