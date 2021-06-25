import Web3 from 'web3'
import { AbiItem } from 'web3-eth/node_modules/web3-utils'

export async function useGetContractInfo(contractABI: AbiItem, contractAddress: string) {
  const web3: Web3 = new Web3('ws://localhost:8546')
  const contract = new web3.eth.Contract(contractABI, contractAddress)
  // contract.methods.(ten method).call or send
}
