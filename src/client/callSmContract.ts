/* eslint @typescript-eslint/no-var-requires: "off" */
import { useActiveWeb3React } from 'hooks/web3'
import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/5e4235dd371d43f0bbc8d252f58ac94c'))
const contract = require('../abis/MNFT.json')
const contractAddress = '0x81c587EB0fE773404c42c1d2666b5f557C470eED'
const PUBLIC_KEY = '0xAB1F741Bf4eF582873dC8A50C0560F4f0dC183eF'
const PRIVATE_KEY = '65b18c8e4bd3d4c6e877a19d95f57ce03e321c4be4507038233e6f3e879b9883'
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const useGetContractInfo = class {
  getABI = async () => {
    console.log(nftContract.methods)
  }
}
const Contract = new useGetContractInfo()
export { Contract }

export async function mintNFT(tokenURI?: string) {
  // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce
  // console.log(nonce)
  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    gas: 50000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  console.log(nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI())

  const signPromise = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  console.log(signPromise)

  signPromise.rawTransaction &&
    web3.eth.sendSignedTransaction(signPromise.rawTransaction, function (err, hash) {
      if (!err) {
        console.log(
          'The hash of your transaction is: ',
          hash,
          "\nCheck Alchemy's Mempool to view the status of your transaction!"
        )
      } else {
        console.log('Something went wrong when submitting your transaction:', err)
      }
    })
}
