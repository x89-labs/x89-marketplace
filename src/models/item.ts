export interface Item {
  id: string
  name: string
  descriptions?: string
  price: number
  contractAddress: string
  symbol: string
  categoryId: string
  collectionId?: string
  urlFile: string
  royalties: number
  numberOfCopies: number
  putOnSaleType: PutOnSaleType
  startingDate?: Date
  expirationDate?: Date
}
export enum PutOnSaleType {
  FixedPrice = 1,
  TimedAuction,
  UnlimitedAuction,
}
