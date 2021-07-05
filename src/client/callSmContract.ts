/* eslint @typescript-eslint/no-var-requires: "off" */
import { ethers } from 'ethers'
import Web3 from 'web3'

const contract = require('../abis/XNFT.json')
const contractAddress = '0x398bcBcd555326A875C6e6A52907807303E6Af15'
const PUBLIC_KEY = '0xAB1F741Bf4eF582873dC8A50C0560F4f0dC183eF'
const PRIVATE_KEY = '0x65b18c8e4bd3d4c6e877a19d95f57ce03e321c4be4507038233e6f3e879b9883'
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
const NODE_URL = 'https://ropsten.infura.io/v3/5e4235dd371d43f0bbc8d252f58ac94c'

export async function mintNFT(tokenURI?: string) {
  console.log(NODE_URL)

  if (NODE_URL) {
    const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL))
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest') //get latest nonce

    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      gasLimit: 500000,
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
}
