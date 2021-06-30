/* eslint @typescript-eslint/no-var-requires: "off" */
import { useActiveWeb3React } from 'hooks/web3'
import Web3 from 'web3'

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/5e4235dd371d43f0bbc8d252f58ac94c'))
const contract = require('../abis/MNFT.json')
const contractAddress = '0x81c587EB0fE773404c42c1d2666b5f557C470eED'
const PUBLIC_KEY = '0xcDbC8039FAE744D86C88E54c87d2A5869f46BCC2'
const PRIVATE_KEY = '7accdfb5b27c03ecd35f4b0c058be67e18a22e52e40cc7272c870eb7707d0b19'
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const useGetContractInfo = class {
  getABI = async () => {
    console.log(nftContract.methods)
  }
}
const Contract = new useGetContractInfo()
export { Contract }

export async function mintNFT(tokenURI?: string) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce
  console.log(nonce)
  console.log(tokenURI)

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    gas: 50000,
    nonce: nonce,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }
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
