/* eslint @typescript-eslint/no-var-requires: "off" */
import Web3 from 'web3'

const web3: Web3 = new Web3('ws://localhost:8546')
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
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  console.log(signPromise)
  signPromise
    .then((signedTx) => {
      signedTx.rawTransaction &&
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
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
    })
    .catch((err) => {
      console.log(' Promise failed:', err)
    })
}
