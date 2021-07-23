import { Contract } from '@ethersproject/contracts'
import { abi as GOVERNANCE_ABI } from '@uniswap/governance/build/GovernorAlpha.json'
import { abi as UNI_ABI } from '@uniswap/governance/build/Uni.json'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { abi as V3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import { abi as V3PoolABI } from '@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json'
import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import MULTICALL_ABI from 'abis/multicall2.json'
import { Unisocks } from 'abis/types/Unisocks'
import UNISOCKS_ABI from 'abis/unisocks.json'
import WETH_ABI from 'abis/weth.json'
import EIP_2612 from 'abis/eip_2612.json'
import XNFT_ABI from 'abis/XNFT.json'

import {
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  QUOTER_ADDRESSES,
  V3_CORE_FACTORY_ADDRESSES,
  V3_MIGRATOR_ADDRESSES,
  ARGENT_WALLET_DETECTOR_ADDRESS,
  GOVERNANCE_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MULTICALL2_ADDRESSES,
  V2_ROUTER_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  SOCKS_CONTROLLER_ADDRESSES,
  XNFT_ADDRESS,
} from 'constants/addresses'

import { useMemo } from 'react'
import { getContract } from 'utils'
import { Erc20, ArgentWalletDetector, EnsPublicResolver, EnsRegistrar, Multicall2, Weth } from '../abis/types'
import { UNI, WETH9_EXTENDED } from '../constants/tokens'
import { useActiveWeb3React } from './web3'
import { XNFT, XNFTInterface } from 'abis/types/XNFT'
import { UniswapV3Factory } from 'types/v3/UniswapV3Factory'
import { UniswapV3Pool } from 'types/v3/UniswapV3Pool'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH9_EXTENDED[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticall2Contract() {
  return useContract<Multicall2>(MULTICALL2_ADDRESSES, MULTICALL_ABI, false) as Multicall2
}

export function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useGovernanceContract() {
  return useContract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, true)
}

export function useUniContract() {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? UNI[chainId]?.address : undefined, UNI_ABI, true)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean) {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useSocksController(): Unisocks | null {
  return useContract<Unisocks>(SOCKS_CONTROLLER_ADDRESSES, UNISOCKS_ABI, false)
}

export function useV3Factory() {
  return useContract<UniswapV3Factory>(V3_CORE_FACTORY_ADDRESSES, V3FactoryABI) as UniswapV3Factory | null
}

export function useV3Pool(address: string | undefined) {
  return useContract<UniswapV3Pool>(address, V3PoolABI)
}

export function useXNFTContract() {
  return useContract<XNFT>(XNFT_ADDRESS[1], XNFT_ABI.abi)
}
