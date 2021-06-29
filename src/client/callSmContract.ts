/* eslint @typescript-eslint/no-var-requires: "off" */
import Web3 from 'web3'

const web3: Web3 = new Web3('ws://localhost:8546')
const contract = require('../abis/MNFT.json')
const contractAddress = '0x81c587EB0fE773404c42c1d2666b5f557C470eED'
const PUBLIC_KEY = '0x0C7c950F4dFb218328fFAC4ba54C6BaF51be820e'
const PRIVATE_KEY = 'ff2c87739724adf7ea272262982588a6a217034bc09039ad09067c3aaee1636d'
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
